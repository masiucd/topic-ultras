import type {PropsWithChildren} from "react";
import type {User} from "~/.server/biz/dashboard.settings";
import {Icons} from "~/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {TooltipComponent} from "~/components/ui/tooltip";
import {List, Span, Strong} from "~/components/ui/typography";

export function UserInfoCard({
  user,
  children,
}: PropsWithChildren<{user: User}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Edit your user information</CardDescription>
      </CardHeader>
      <CardContent>
        <List className="flex flex-col gap-3 pl-0">
          <li className="flex items-center gap-2">
            <TooltipComponent content="Name">
              <Strong>
                <Icons.User />
              </Strong>
            </TooltipComponent>
            <Span className="capitalize">
              {user.firstName} {user.lastName}
            </Span>
          </li>

          <li className="flex items-center gap-2">
            <TooltipComponent content="Age">
              <Strong>
                <Icons.Hash />
              </Strong>
            </TooltipComponent>
            <Span>{user.age}</Span>
          </li>

          <li className="flex items-center gap-2">
            <TooltipComponent content="Weight">
              <Strong>
                <Icons.Weight />
              </Strong>
            </TooltipComponent>
            <Span>{user.weight} KG</Span>
          </li>

          <li className="flex items-center gap-2">
            <TooltipComponent content="Height">
              <Strong>
                <Icons.Height />
              </Strong>
            </TooltipComponent>
            <Span>{user.height} cm</Span>
          </li>

          <li className="flex items-center gap-2">
            <TooltipComponent content="Gender">
              <Strong>F/M</Strong>
            </TooltipComponent>
            <Span>{user.gender === "male" ? "Male" : "Female"}</Span>
          </li>
        </List>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}
