import {Badge, Box, Card, Tabs, Text} from "@radix-ui/themes";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {H1, Span} from "@/components/typography";
import {DataList} from "@/components/ui/datalist";
import {getUserFromSession, type User} from "@/lib/auth";

import {SettingsTab} from "./_components/tabs/settings";

export default async function UserProfilePage() {
  let user = await getUserFromSession();

  if (user === null) {
    redirect("/login");
  }
  return (
    <PageWrapper>
      <H1>
        Welcome {user.firstName} {user.lastName}
      </H1>
      <UserTabs user={user} />
    </PageWrapper>
  );
}

function UserTabs({user}: {user: User}) {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Trigger value="favorites">Favorites</Tabs.Trigger>
        <Tabs.Trigger value="all">All</Tabs.Trigger>
      </Tabs.List>
      <Box pt="3">
        <AccountTab user={user} />
        <ContactTab />
        <SettingsTab user={user} />
        <FavoriteFoods />
        <AllTab />
      </Box>
    </Tabs.Root>
  );
}

function AccountTab({user}: {user: User}) {
  return (
    <Tabs.Content value="account">
      <Box maxWidth="350px">
        <Card>
          <DataList>
            <DataList.Item>
              <DataList.Label minWidth="128px">
                <Span weight="bold">Type</Span>
              </DataList.Label>
              <DataList.Value>
                <Badge color={user.admin ? "iris" : "crimson"}>
                  {user.admin ? "ADMIN" : "USER"}
                </Badge>
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
                <Span weight="bold">Age</Span>
              </DataList.Label>
              <DataList.Value>
                <Span>{user.age}</Span>
              </DataList.Value>
            </DataList.Item>
          </DataList>
        </Card>
      </Box>
    </Tabs.Content>
  );
}

function ContactTab() {
  return (
    <Tabs.Content value="contact">
      <Text size="2">Contact information</Text>
      <Card>
        <Text size="2">Documents</Text>
      </Card>
    </Tabs.Content>
  );
}

function FavoriteFoods() {
  return (
    <Tabs.Content value="favorites">
      <Text size="2">favorite foods</Text>
    </Tabs.Content>
  );
}

function AllTab() {
  return (
    <Tabs.Content value="all">
      <Text size="2">All tabs</Text>
    </Tabs.Content>
  );
}
