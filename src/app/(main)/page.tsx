import PageWrapper from "@/components/page-wrapper";
import {H1, Lead, Span} from "@/components/typography";
import {Highlight} from "@/components/ui/highlight";
import {appData} from "@/lib/config";

function Title() {
	let [nutri, check] = appData.title.split(" ");
	return (
		<aside>
			<H1>{appData.title}</H1>
			<Lead className="flex gap-1">
				Welcome to{" "}
				<Span className="after:-rotate-3 relative rounded-sm after:absolute after:top-3 after:left-0 after:h-2 after:w-full after:bg-gray-800/20 after:transition-transform after:content-['']">
					{nutri}
				</Span>{" "}
				<Highlight>{check}</Highlight>
			</Lead>
		</aside>
	);
}

export default async function Home() {
	return (
		<PageWrapper>
			<Title />
		</PageWrapper>
	);
}
