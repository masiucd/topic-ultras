import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Link} from "@/_components/ui/link";
import {H1, List} from "@/_components/ui/typography";
import {getFoodTypes} from "@/persistence/food/dao";

export default async function FoodTypesPage() {
  let foodTypesResult = await getFoodTypes();
  if (!foodTypesResult.success) {
    redirect("/404");
  }
  let {data: foodTypes} = foodTypesResult;
  return (
    <PageWrapper>
      <div className="my-5 flex flex-col gap-5">
        <H1>Food Categories</H1>
      </div>
      <List>
        {foodTypes.map(({name, id}) => (
          <li key={id}>
            <Link
              className="relative after:absolute after:bottom-0 after:left-0 after:h-2 after:w-0 after:rotate-1 after:bg-gray-500/50  after:transition-all hover:no-underline hover:after:w-full dark:after:bg-gray-100/20 "
              href={`/food-categories/${name}`}
            >
              <span className="relative">{name}</span>
            </Link>
          </li>
        ))}
      </List>
    </PageWrapper>
  );
}
