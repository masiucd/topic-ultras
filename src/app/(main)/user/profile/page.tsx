import {Box, Card, Tabs, Text} from "@radix-ui/themes";

import PageWrapper from "@/components/page-wrapper";
import {H1, P} from "@/components/typography";
import {getUserFromSession} from "@/lib/auth";

export default async function UserProfilePage() {
  let user = await getUserFromSession();
  if (!user) {
    return null;
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

type User = NonNullable<Awaited<ReturnType<typeof getUserFromSession>>>;
function UserTabs({user}: {user: User}) {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>

      <Box pt="3">
        <Tabs.Content value="account">
          <Text size="2">Make changes to your account.</Text>

          <Card>
            <P>Email: {user.email}</P>
            <P>Age: {user.age}</P>
            <P>Admin: {user.admin ? "Yes" : "No"}</P>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="contact">
          <Text size="2">Contact information</Text>
          <Card>
            <Text size="2">Documents</Text>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <Text size="2">Edit your profile or update contact information.</Text>
          <Card>
            <Text size="2">Settings</Text>
          </Card>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
