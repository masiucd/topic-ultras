import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {List} from "@/components/ui/typography";
import type {UserById} from "@/db/dao/user";

type Props = {
  user: NonNullable<UserById>;
};

export function ProfileCard(props: Props) {
  let {user} = props;
  return (
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
  );
}
