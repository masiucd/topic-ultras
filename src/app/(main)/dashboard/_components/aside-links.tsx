import {Tooltip} from "@radix-ui/themes";
import Link from "next/link";
import {redirect} from "next/navigation";

import {Span} from "@/components/typography";
import {Icons} from "@/components/ui/icons";
import {isAuthorized} from "@/lib/auth";

import {getUserByEmail} from "../dao";
import {ProfileButton} from "./profile-button";

export async function AsideLinks() {
	let payload = await isAuthorized();
	if (!payload) {
		redirect("/signin");
	}
	let user = await getUserByEmail(payload.email);
	if (!user) {
		redirect("/signin");
	}
	return (
		<>
			<li className="max-w-fit">
				<ProfileButton user={user} />
			</li>
			{/* edit email and password */}
			<li className="max-w-fit">
				<Link href="/">
					<Tooltip content="Settings">
						<Span size="2">
							<Icons.Settings />
						</Span>
					</Tooltip>
				</Link>
			</li>
			{/* theme or something else */}
			<li className="max-w-fit">
				<Link href="/">
					<Tooltip content="Preferences">
						<Span size="2">
							<Icons.Settings2 />
						</Span>
					</Tooltip>
				</Link>
			</li>
		</>
	);
}
