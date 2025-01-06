import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/typography";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <H1>Hello</H1>
      <Link href="/food-items">
        <span>Food Items</span>
      </Link>
    </PageWrapper>
  );
}
