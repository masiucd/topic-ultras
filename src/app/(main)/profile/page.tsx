import PageWrapper from "@/components/page-wrapper";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {H1, List, P} from "@/components/ui/typography";
import {db} from "@/db";
import {userInfos, users} from "@/db/schema";
import {getSessionId} from "@/lib/auth";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
  let id = await getSessionId();
  if (id === null) {
    redirect("/log-in");
  }
  let user = await getUserById(id);
  if (!user) {
    // TODO
    return <h1>No user !!!!</h1>;
  }

  console.log("user", user);

  return (
    <PageWrapper>
      <H1>Profile</H1>
      <P>Profile page</P>

      <div className="flex bg-red-300">
        <Card className="">
          <CardHeader>
            <CardTitle>Welcome {user.username}</CardTitle>
            <CardDescription>User profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <List className="flex flex-col gap-1 text-sm">
              <li>
                <span className="font-semibold">First Name</span>{" "}
                <span>{user.firstName ? user.firstName : "N/A"}</span>
              </li>
              <li>
                <span className="font-semibold">Last Name</span>{" "}
                <span>{user.lastName ? user.lastName : "N/A"}</span>
              </li>
              <li>
                <span className="font-semibold">Age</span>{" "}
                <span>{user.userInfos?.age ? user.userInfos?.age : "N/A"}</span>
              </li>
            </List>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">Edit profile</Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}

async function getUserById(id: number) {
  try {
    let result = await db
      .select({
        id: users.id,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        userInfos: {
          age: userInfos.age,
          gender: userInfos.gender,
          height: userInfos.height,
          weight: userInfos.weight,
        },
      })
      .from(users)
      .leftJoin(userInfos, eq(users.id, userInfos.userId))
      .where(eq(users.id, id));
    if (result.length > 0) {
      return result[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
