import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/typography";
import {Flex} from "@radix-ui/themes";
import {CalculateForm} from "./_components/calculate-form";

/**
 * Calculator page
 * Where the user can calculate their daily intake of nutrients and calories based on their goals and activity level
 */
export default function CalculatorPage() {
	return (
		<PageWrapper>
			<H1 mb="5">CalculatorPage</H1>
			<Flex maxWidth="550px">
				<CalculateForm />
			</Flex>
			{/* TODO calculator for something else */}
		</PageWrapper>
	);
}
