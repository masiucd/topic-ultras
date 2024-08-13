import {Suspense} from "react";

import PageWrapper from "@/components/page-wrapper";
import {H1, Lead} from "@/components/typography";
import {Skeleton} from "@/components/ui/skeleton";

import {FoodItems} from "./_components/food-items";
import type {SearchParams} from "./types";

export default async function FoodsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  let foodName = searchParams?.name || "";
  let page = Number(searchParams?.page) || 1;

  return (
    <PageWrapper>
      <aside className="mb-20">
        <H1>Foods</H1>
        <Lead>food items</Lead>
      </aside>
      <div className="flex w-full flex-col md:min-h-[600px]  md:max-w-6xl">
        <Suspense key={foodName + page} fallback={<Loader />}>
          <FoodItems foodName={foodName} page={page} />
        </Suspense>
      </div>
    </PageWrapper>
  );
}

function Loader() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-6 w-2/3  rounded-full" />
      <Skeleton className="h-6 w-2/4  rounded-full" />
      <Skeleton className="h-6 w-5/12  rounded-full" />
      <Skeleton className="h-6 w-9/12  rounded-full" />
      <Skeleton className="h-6 w-2/12  rounded-full" />
      <Skeleton className="h-6 w-8/12  rounded-full" />
      <Skeleton className="h-6 w-2/3  rounded-full" />
      <Skeleton className="h-6 w-2/4  rounded-full" />
      <Skeleton className="h-6 w-5/12  rounded-full" />
      <Skeleton className="h-6 w-9/12  rounded-full" />
      <Skeleton className="h-6 w-2/12  rounded-full" />
      <Skeleton className="h-6 w-8/12  rounded-full" />
    </div>
  );
}
