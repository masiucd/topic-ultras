import {Table, Tooltip} from "@radix-ui/themes";
import Link from "next/link";
import type {PropsWithChildren} from "react";

import {P, Span, Strong} from "@/components/typography";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";

import {
  type FoodItem,
  getFoodItemsData,
  ITEMS_PER_PAGE,
} from "../_data/food-items";
import {Pagination} from "./pagination";
import {SearchFood} from "./search-food";

type Props = {
  foodName: string;
  page: number;
};

export async function FoodItems({foodName, page}: Props) {
  let {foodItems, totalFoods} = await getFoodItemsData(
    foodName,
    ITEMS_PER_PAGE,
    (page - 1) * ITEMS_PER_PAGE // skip items based on page number
  );

  let totalPages = Math.ceil(totalFoods / ITEMS_PER_PAGE);
  let currentPage = page > totalPages ? totalPages : page;
  return (
    <>
      <div className="mb-5">
        <SearchFood foodName={foodName} />
      </div>

      {/* <TableCaption>
          List of food items available in the database
        </TableCaption> */}
      {/* <Head />
        <Body foodItems={foodItems} />
        <Footer
          totalFoodItems={foodItems.length}
          totalFoods={totalFoods}
          currentPage={currentPage}
          totalPages={totalPages}
        >
          <Pagination page={page} totalPages={totalPages} />
        </Footer> */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <Tooltip content="Food name">
                <Icons.Food />
              </Tooltip>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Tooltip content="Food type">
                <Icons.Label />
              </Tooltip>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Tooltip content="Calories in food item">
                <Icons.Calories />
              </Tooltip>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Tooltip content="Carbs">
                <Icons.Carbs />
              </Tooltip>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Tooltip content="Protein">
                <Icons.Protein />
              </Tooltip>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Tooltip content="Total fat">
                <Icons.Fat />
              </Tooltip>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {foodItems.map((foodItem) => (
            <Table.Row key={foodItem.foodId}>
              <Table.RowHeaderCell>
                <Link
                  href={`/foods/${foodItem.slug}`}
                  className="hover:underline hover:opacity-60"
                >
                  <Strong className="capitalize">{foodItem.foodName} </Strong>
                </Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <FoodTypeBadge name={foodItem.foodType.name} />
              </Table.Cell>
              <Table.Cell>
                <P>{foodItem.data.calories}</P>
              </Table.Cell>
              <Table.Cell>
                <Strong>{foodItem.data.carbs}</Strong>
              </Table.Cell>
              <Table.Cell>
                <Strong>{foodItem.data.protein}</Strong>
              </Table.Cell>
              <Table.Cell>
                <Strong>{foodItem.data.fat}</Strong>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

// function Head() {
//   return (
//     <Header>
//       <RowHeader>
//         <RowHeader className="w-[200px]">
// <Tooltip content="Food name">
//   <Icons.Food />
// </Tooltip>
//         </RowHeader>
//         <ColumnHeader>
//           <Tooltip content="Food type">
//             <Icons.Label />
//           </Tooltip>
//         </ColumnHeader>
//         <ColumnHeader>
//           <Tooltip content="Calories in food item">
//             <Icons.Calories />
//           </Tooltip>
//         </ColumnHeader>
//         <ColumnHeader>
//           <Tooltip content="Carbs">
//             <Icons.Carbs />
//           </Tooltip>
//         </ColumnHeader>
//         <ColumnHeader>
//           <Tooltip content="Protein">
//             <Icons.Protein />
//           </Tooltip>
//         </ColumnHeader>
//         <ColumnHeader>
//           <Tooltip content="Total fat">
//             <Icons.Fat />
//           </Tooltip>
//         </ColumnHeader>
//       </RowHeader>
//     </Header>
//   );
// }

// function Body({foodItems}: {foodItems: FoodItem[]}) {
//   return (
//     <Body>
//       {foodItems.map((foodItem) => (
//         <Row key={foodItem.foodId}>
//           <TableCell>
//             <Link
//               href={`/foods/${foodItem.slug}`}
//               className="hover:underline hover:opacity-60"
//             >
//               <Strong className="capitalize">{foodItem.foodName} </Strong>
//             </Link>
//           </TableCell>
//           <TableCell>
//             <FoodTypeBadge name={foodItem.foodType.name} />
//           </TableCell>
//           <TableCell>
//             <P>{foodItem.data.calories}</P>
//           </TableCell>
//           <TableCell>
//             <Strong>{foodItem.data.carbs}</Strong>
//           </TableCell>
//           <TableCell>
//             <Strong>{foodItem.data.protein}</Strong>
//           </TableCell>
//           <TableCell>
//             <Strong>{foodItem.data.fat}</Strong>
//           </TableCell>
//         </Row>
//       ))}
//     </Body>
//   );
// }

// function Footer({
//   totalFoodItems,
//   totalFoods,
//   currentPage,
//   totalPages,
//   children,
// }: PropsWithChildren<{
//   totalFoodItems: number;
//   totalFoods: number;
//   currentPage: number;
//   totalPages: number;
// }>) {
//   return (
//     <TableFooter>
//       <TableRow>
//         <TableCell colSpan={5}>
//           <div className="flex flex-col">
//             <div className="flex gap-2">
//               <Span className="italic">Total</Span>
//               <Span className="italic">
//                 {totalFoodItems}/{totalFoods} items
//               </Span>
//             </div>
//             <Span>
//               Page {currentPage} of {totalPages}
//             </Span>
//           </div>
//         </TableCell>
//         {children}
//       </TableRow>
//     </TableFooter>
//   );
// }
