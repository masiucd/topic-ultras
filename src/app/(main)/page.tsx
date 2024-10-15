import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import Link from "next/link";

export default function HomePage() {
	return (
		<PageWrapper>
			<H1>Home Page</H1>
			<Link href="/food-items">
				<span>Food Items</span>
			</Link>
		</PageWrapper>
	);
}
