import PageWrapper from "@/components/page-wrapper";
import {H1, H2, Lead, List, Strong} from "@/components/typography";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <div className="mb-5 flex min-h-[30rem] flex-col justify-center gap-2 rounded-md border-2 border-foreground bg-cover bg-hero-pattern bg-top p-2">
        <H1>Nutri Check</H1>
        <Lead className="w-fit text-pretty rounded-md bg-foreground/50 p-2 text-background shadow">
          Nutri Check is a simple web application that allows you to search for
          food items and view their nutritional information.
        </Lead>
        <Button asChild className="w-[16rem]">
          <Link href="/food-items">
            <span>Food Items</span>
          </Link>
        </Button>
      </div>

      <section className="flex flex-col gap-5 pl-2 md:max-w-screen-2xl xl:pl-0">
        <H2>Features</H2>
        <List className="flex flex-wrap gap-8">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex h-42 w-fit items-center justify-center rounded-md border border-foreground bg-card-foreground/5 p-5 shadow"
            >
              <Strong>{feature}</Strong>
            </li>
          ))}
        </List>
      </section>
    </PageWrapper>
  );
}

let features = [
  "Search for food items",
  "Filter food items by category",
  "View nutritional information for food items",
  "Export food items to CSV",
  "Customize the columns that are displayed in the food items table",
  "View individual food items and their nutritional information (Coming Soon)",
  "Calculate the total nutritional information for a group of food (Coming Soon)",
] as const;
