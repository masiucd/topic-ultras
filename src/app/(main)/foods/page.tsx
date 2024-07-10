import {Flex, Table} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import {getFoodData} from "@/persistence/food/dao";
import {Icons} from "@/shared/components/icons";
import {PageWrapper} from "@/shared/components/page-wrapper";
import {Link} from "@/shared/components/ui/link";
import {Tooltip} from "@/shared/components/ui/tooltip";
import {H1, Label} from "@/shared/components/ui/typography";
import {slugify} from "@/shared/lib/strings";

import {FoodTypeBadge} from "./food-type-badge";

// Display table of food items with pagination and save the search state in the URL
export default async function FoodItemsPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  console.log("🚀 ~ searchParams:", searchParams);

  let foods = await getFoodData();

  if (!foods.success) {
    redirect("/404");
  }

  let {data} = foods;

  return (
    <PageWrapper>
      <H1>Food items</H1>
      {/* TODO ass search input */}
      <Flex direction="column" gap="5" maxWidth="900px" my="5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Food</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Calories</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Carbohydrates</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Fat</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Protein</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((f) => {
              return (
                <Table.Row key={f.foodId}>
                  <Table.Cell>{f.foodName}</Table.Cell>
                  <Table.Cell maxWidth="300px">
                    <Tooltip content={f.description}>
                      <Label
                        className="block"
                        as="label"
                        truncate
                        wrap="pretty"
                      >
                        {f.description}
                      </Label>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <Icons.Calorie size={16} />
                      <Label as="span">{f.calories}</Label>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <Icons.Carbs size={16} />
                      <Label as="span">{f.carbs}</Label>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <Icons.Fat size={16} />
                      <Label as="span">{f.totalFat}</Label>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <Icons.Protein size={16} />
                      <Label as="span">{f.protein}</Label>
                    </Flex>
                  </Table.Cell>

                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <Link
                        href={`/food-types/${slugify(f.foodType ?? "Other")}  `}
                      >
                        <FoodTypeBadge
                          disableTooltip
                          foodType={f?.foodType ?? "Other"}
                        />
                      </Link>
                    </Flex>
                  </Table.Cell>

                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <Link href={`/foods/${slugify(f.foodId.toString())}`}>
                        View
                      </Link>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Flex>
    </PageWrapper>
  );
}
