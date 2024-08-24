import {Badge, Box, Card} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import {Code, Span} from "@/components/typography";
import {DataList} from "@/components/ui/datalist";
import {isAuthorized} from "@/lib/auth";
import {sleep} from "@/lib/utils";

import {getUserByEmail} from "../dao";

async function getUser() {
  await sleep(2000);
  let payload = await isAuthorized();
  if (payload === null) {
    redirect("/signin");
  }
  let user = await getUserByEmail(payload.email);
  if (user === null) {
    redirect("/signin");
  }
  return user;
}

export default async function ProfileSlot() {
  let user = await getUser();

  return (
    <Box maxWidth="350px">
      <Card>
        <DataList>
          <DataList.Item>
            <DataList.Label minWidth="128px">
              <Span weight="bold">Type</Span>
            </DataList.Label>
            <DataList.Value>
              <Badge color={user.admin ? "iris" : "crimson"}>{user.admin ? "ADMIN" : "USER"}</Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">Email</Span>
            </DataList.Label>
            <DataList.Value>
              <Span>{user.email}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">First Name</Span>
            </DataList.Label>
            <DataList.Value>
              <Span className="capitalize">{user.firstName}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">Last Name</Span>
            </DataList.Label>
            <DataList.Value>
              <Span className="capitalize">{user.lastName}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">Password</Span>
            </DataList.Label>
            <DataList.Value>
              <Code>********</Code>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">Age</Span>
            </DataList.Label>
            <DataList.Value>
              <Code>{user.age}</Code>
            </DataList.Value>
          </DataList.Item>
        </DataList>
      </Card>
    </Box>
  );
}
