import {headers} from "next/headers";
import Link from "next/link";

import {H2, P} from "@/components/typography";

export default async function NotFound() {
  let headersList = headers();
  let domain = headersList.get("host");

  return (
    <div>
      <H2>Not Found: {domain}</H2>
      <P>Could not find requested resource</P>
      <P>
        View <Link href="/foods">all foods</Link>
      </P>
    </div>
  );
}
