import {sql} from "drizzle-orm";
import {cookies} from "next/headers";

import {PageWrapper} from "@/_components/page-wrapper";
import {H1} from "@/_components/ui/typography";
import {db} from "@/_db/db";
import {users} from "@/_db/models/schema";

// TODO protected route
// if not logged in then redirect to login

export default async function ProfilePage() {
  let cookieStore = cookies();
  let cookieValue = cookieStore.get("user")?.value;
  let user = await db
    .select()
    .from(users)
    .where(sql`users.id = ${JSON.parse(cookieValue).id}`)
    .get();

  return (
    <PageWrapper>
      <H1>Welcome {user?.name ?? "User"}</H1>
    </PageWrapper>
  );
}
