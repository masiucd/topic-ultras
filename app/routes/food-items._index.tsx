import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node"; // or cloudflare/deno
import {
  type Location,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import {useState} from "react";
import {foodItemsCookie, parseCookie} from "~/.server/cookies/food-items";
import {type FoodItemData, getFoodItemsData} from "~/.server/db/dao/food-items";
import {FoodItems} from "~/components/food-items/food-items-table";
import {SearchInput} from "~/components/food-items/search-input";
import {Icons} from "~/components/icons";
import PageWrapper from "~/components/page-wrapper";
import {Button} from "~/components/ui/button";
import {Checkbox} from "~/components/ui/checkbox";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {H1, Lead} from "~/components/ui/typography";

export async function action({request}: ActionFunctionArgs) {
  let formData = await request.formData();
  let rows = formData.get("rows");
  let categories = formData.getAll("category");
  let cookieHeader = request.headers.get("Cookie");
  let cookie = await parseCookie(cookieHeader);
  console.log({categories, cookie});

  if (rows) {
    cookie.rows = Number(rows);
  }
  if (categories.length > 0) {
    // do something with category
    // cookie.categories = categories;
  }

  return redirect("/food-items", {
    headers: {
      "Set-Cookie": await foodItemsCookie.serialize(cookie),
    },
  });
}

export async function loader({request}: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  let category = url.searchParams.get("category");
  let page = Number(url.searchParams.get("page")) || 1;
  let cookieHeader = request.headers.get("Cookie");
  let cookie = await parseCookie(cookieHeader);

  return {
    ...(await getFoodItemsData({
      name,
      page,
      rows: cookie.rows,
      categories: category !== null ? category.split("-").map(Number) : [],
    })),
    rows: cookie.rows,
  };
}

// TODO : copy url feature to share the search results
export default function FoodItemsRoute() {
  let data = useLoaderData<typeof loader>();
  let [searchParams] = useSearchParams();
  let location = useLocation();
  let name = searchParams.get("name");

  return (
    <PageWrapper>
      <H1>Food Items</H1>
      <Lead>
        Nutrition facts for the food you love. Search for food items by name.
      </Lead>
      <div className="mx-auto my-10 w-full max-w-[80rem]">
        <div className="mb-2 flex gap-2">
          <div>
            <SearchInput location={location} name={name} />
          </div>
          <CategoryFilter
            results={data.results}
            allFoodCategories={data.allFoodCategories}
            location={location}
          />
        </div>
        <div className="rounded-lg border-2">
          <FoodItems
            page={data.page}
            totalPages={data.totalPages}
            totalFoodItems={data.totalFoodItems}
            rows={data.rows}
            results={data.results}
            location={location}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

function CategoryFilter(props: {
  results: FoodItemData["results"];
  allFoodCategories: FoodItemData["allFoodCategories"];
  location: Location;
}) {
  // let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectedCategories, setSelectedCategories] = useState<number[]>(
    searchParams.get("category")?.split("-").map(Number) || []
  );

  const handleCategoryOnChange = (checked: boolean, categoryId: number) => {
    let updatedCategories = !checked
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);

    let params = new URLSearchParams(searchParams);
    params.set("category", updatedCategories.join("-"));
    setSearchParams(params);

    if (params.get("category") === "") {
      params.delete("category");
      setSearchParams(params);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline">
          <Icons.Category />
          Category
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {props.allFoodCategories.map((c) => (
          <div key={c.id} className="mb-1 flex items-center gap-2">
            <Checkbox
              id={c.name}
              name="category"
              value={c.id}
              checked={selectedCategories.includes(c.id)}
              onCheckedChange={(checked) =>
                handleCategoryOnChange(Boolean(checked), c.id)
              }
            />
            <label htmlFor={c.name}>{c.name}</label>
          </div>
        ))}
        {/* <Button type="submit">Apply</Button> */}
      </PopoverContent>
    </Popover>
  );
}
