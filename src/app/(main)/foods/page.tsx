import {Flex, Table} from "@radix-ui/themes";

import {PageWrapper} from "@/shared/components/page-wrapper";
import {H1} from "@/shared/components/ui/typography";

// Display table of food items with pagination and save the search state in the URL
export default async function FoodItemsPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  console.log("🚀 ~ searchParams:", searchParams);
  // let result = await db.select().from(foods).all();
  // console.log("result", result);

  return (
    <PageWrapper>
      <H1>Food items</H1>

      <Flex direction="column" gap="5" maxWidth="600px">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Food</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Calories</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Carbohydrates</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Fat</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Protein</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Apple</Table.RowHeaderCell>
              <Table.Cell>Red apple</Table.Cell>
              <Table.Cell>95</Table.Cell>
              <Table.Cell>25g</Table.Cell>
              <Table.Cell>0.3g</Table.Cell>
              <Table.Cell>0.5g</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Flex>
    </PageWrapper>
  );
}
