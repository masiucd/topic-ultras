import {sql} from "drizzle-orm";
import {cookies} from "next/headers";
import {z} from "zod";

import {PageWrapper} from "@/_components/page-wrapper";
import {H1} from "@/_components/ui/typography";
import {db} from "@/_db/db";
import {users} from "@/_db/models/schema";

// TODO protected route
// if not logged in then redirect to login

let cookieUserValueSchema = z.object({
  id: z.number(),
  email: z.string(),
  admin: z.boolean(),
  token: z.string(),
});

// type CookieUserValueType = z.infer<typeof cookieUserValueSchema>;

export default async function ProfilePage() {
  let cookieStore = cookies();
  let result = cookieUserValueSchema.safeParse(
    JSON.parse(cookieStore.get("user")?.value ?? ""),
  );
  if (!result.success) {
    return null;
  }
  let {id, email, admin, token} = result.data;
  let user = await db
    .select()
    .from(users)
    .where(sql`users.id = ${id}`)
    .get();

  return (
    <PageWrapper>
      <H1>Welcome {user?.name ?? "User"}</H1>
    </PageWrapper>
  );
}
