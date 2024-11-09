import {updateProfile} from "@/app/actions";
import {SubmitButton} from "@/components/submit-button";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
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
        <UpdateProfileDialog />
      </CardFooter>
    </Card>
  );
}

function UpdateProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update user profile</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>
        <form action={updateProfile}>
          <fieldset>
            <legend>
              <h2 className="font-semibold text-lg">Profile information</h2>
            </legend>
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName">First Name</label>
              <Input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <Input type="text" id="lastName" name="lastName" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="age">Age</label>
              <Input
                type="number"
                id="age"
                name="age"
                required
                min={18}
                max={99}
              />
            </div>
          </fieldset>
          <SubmitButton variant="secondary">Update profile</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
