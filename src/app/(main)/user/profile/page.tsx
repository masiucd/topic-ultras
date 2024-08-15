import {eq} from "drizzle-orm";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {H1, P} from "@/components/typography";
import {db} from "@/db";
import {users} from "@/db/schema";
import {decrypt} from "@/lib/crypto";

export async function getUserByEmail(email: string) {
  try {
    let user = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        age: users.age,
        admin: users.admin,
      })
      .from(users)
      .where(eq(users.email, email));
    if (user.length > 0) {
      return user[0];
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

async function isLoggedIn() {
  let cookieStorage = cookies();
  let session = cookieStorage.get("session");
  if (!session) {
    redirect("/login");
  }

  let payload = await decrypt(session.value);
  let user = await getUserByEmail(payload.email);
  return user;
}

export default async function UserProfilePage() {
  let user = await isLoggedIn();
  if (!user) {
    return null;
  }

  return (
    <PageWrapper>
      <H1>
        Welcome {user.firstName} {user.lastName}
      </H1>
      <P>Email: {user.email}</P>
      <P>Age: {user.age}</P>
      <P>Admin: {user.admin ? "Yes" : "No"}</P>
    </PageWrapper>
  );
}
