import Link from "next/link";
import {redirect} from "next/navigation";

import {PageWrapper} from "@/_components/page-wrapper";
import {Icons} from "@/_components/ui/icons";
import {Input} from "@/_components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import {H1, P, Span} from "@/_components/ui/typography";
import {ICON_SIZE} from "@/lib/constants";
import {slugify} from "@/lib/strings";
import {getFoodData} from "@/persistence/food/dao";
import type {FoodResult} from "@/persistence/food/types";

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
      <div className="mt-6 flex flex-col gap-2 pl-2">
        <P>
          Welcome to the food tracker! Search for food to see its nutritional
          information.
        </P>

        <div className="w-full max-w-[400px]">
          <Input />
        </div>
      </div>

      <div className="my-5 flex max-w-[1060px] flex-col gap-5">
        <FoodTable foods={data} />
      </div>
    </PageWrapper>
  );
}

function FoodTable({foods}: {foods: FoodResult[]}) {
  return (
    <Table>
      <TableCaption>
        <P>Foods available in the database</P>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Apple size={ICON_SIZE} />
              <Span>Food</Span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Notebook size={ICON_SIZE} />
              <Span>Description</Span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Calorie size={ICON_SIZE} />
              <Span>Calories</Span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Carbs size={ICON_SIZE} />
              <Span>Carbs</Span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Fat size={ICON_SIZE} />
              <Span>Fat</Span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-1">
              <Icons.Protein size={ICON_SIZE} />
              <Span>Protein</Span>
            </div>
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foods.map((f) => (
          <TableRow key={f.foodId}>
            <TableCell>{f.foodName}</TableCell>
            <TableCell>{f.description}</TableCell>
            <TableCell>{f.calories}</TableCell>
            <TableCell>{f.carbs}</TableCell>
            <TableCell>{f.totalFat}</TableCell>
            <TableCell>{f.protein}</TableCell>
            <TableCell>{f.foodType}</TableCell>
            <TableCell>
              <Link href={`/foods/${slugify(f.foodId.toString())}`}>View</Link>
            </TableCell>
          </TableRow>
        ))}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{foods.length}</TableCell>
          </TableRow>
        </TableFooter>
      </TableBody>
    </Table>
  );
  // <Table.Root variant="surface">
  //   <Table.Header>
  //     <Table.Row>
  //       <Table.ColumnHeaderCell>Food</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell>Calories</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell>Carbohydrates</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell>Fat</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell>Protein</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
  //       <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
  //     </Table.Row>
  //   </Table.Header>
  //   <Table.Body>
  //     {foods.map((f) => (
  //       <Table.Row key={f.foodId}>
  //         <Table.Cell>{f.foodName}</Table.Cell>
  //         <Table.Cell maxWidth="300px">
  //           <Tooltip content={f.description}>
  //             <Label className="block" as="label" truncate wrap="pretty">
  //               {f.description}
  //             </Label>
  //           </Tooltip>
  //         </Table.Cell>
  //         <Table.Cell>
  //           <Flex align="center" gap="1">
  //             <Icons.Calorie size={16} />
  //             <Label as="span">{f.calories}</Label>
  //           </Flex>
  //         </Table.Cell>
  //         <Table.Cell>
  //           <Flex align="center" gap="1">
  //             <Icons.Carbs size={16} />
  //             <Label as="span">{f.carbs}</Label>
  //           </Flex>
  //         </Table.Cell>
  //         <Table.Cell>
  //           <Flex align="center" gap="1">
  //             <Icons.Fat size={16} />
  //             <Label as="span">{f.totalFat}</Label>
  //           </Flex>
  //         </Table.Cell>
  //         <Table.Cell>
  //           <Flex align="center" gap="1">
  //             <Icons.Protein size={16} />
  //             <Label as="span">{f.protein}</Label>
  //           </Flex>
  //         </Table.Cell>

  //         <Table.Cell>
  //           <Flex align="center" gap="1">
  //             <Link
  //               href={`/food-types-categories/${slugify(f.foodType ?? "Other")}  `}
  //             >
  //               <FoodTypeBadge
  //                 disableTooltip
  //                 foodType={f?.foodType ?? "Other"}
  //               />
  //             </Link>
  //           </Flex>
  //         </Table.Cell>

  //         <Table.Cell>
  //           <Flex align="center" gap="1">
  //             <Link href={`/foods/${slugify(f.foodId.toString())}`}>
  //               View
  //             </Link>
  //           </Flex>
  //         </Table.Cell>
  //       </Table.Row>
  //     ))}
  //   </Table.Body>
  // </Table.Root>
}
