import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import {unSlugify} from "@/lib/utils";
import type {Metadata} from "next";

type Props = {
  params: {
    fooditem: string;
  };
  // searchParams: {[key: string]: string | string[] | undefined};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  return {
    title: params.fooditem,
    description: `Nutritional values of ${params.fooditem}`,
  };
}

export default async function FoodItemPage(props: Props) {
  return (
    <PageWrapper>
      <H1>Food item {unSlugify(props.params.fooditem)}</H1>
    </PageWrapper>
  );
}
