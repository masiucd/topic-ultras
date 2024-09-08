import {Button, Flex} from "@radix-ui/themes";
import type {ReactNode} from "react";

import PageWrapper from "@/components/page-wrapper";
import {H3} from "@/components/typography";

import {logout} from "../actions";
import {AsideLinks} from "./_components/aside-links";

export default async function DashboardLayout({
	children,
	contact,
	favorites,
	profile,
}: {
	children: ReactNode;
	contact: ReactNode;
	favorites: ReactNode;
	profile: ReactNode;
}) {
	return (
		<PageWrapper>
			{children}
			<Flex justify={{sm: "start", md: "between"}} direction={{sm: "column", md: "row"}}>
				<aside className="border-r-2 border-gray-950/30 pr-5">
					<H3 size="5" mb="3">
						Dashboard
					</H3>
					<Flex asChild gap="4" direction="column">
						<ul>
							<AsideLinks />
							<li className="max-w-fit">
								<form action={logout}>
									<Flex asChild px="1">
										<Button variant="outline">Logout</Button>
									</Flex>
								</form>
							</li>
						</ul>
					</Flex>
				</aside>
				<div className="flex flex-wrap gap-4 md:grid md:grid-flow-col md:grid-rows-3">
					<Flex className="md:row-span-3">{profile}</Flex>
					<Flex className="md:col-span-2">{contact}</Flex>
					<Flex className="md:col-span-2 md:row-span-2">{favorites}</Flex>
				</div>
			</Flex>
		</PageWrapper>
	);
}
