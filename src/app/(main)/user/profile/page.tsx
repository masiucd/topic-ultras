import {Badge, Box, Card, Flex, Tabs, Text} from "@radix-ui/themes";
import {eq} from "drizzle-orm";
import Link from "next/link";
import {redirect} from "next/navigation";

import PageWrapper from "@/components/page-wrapper";
import {H1, H3, Span} from "@/components/typography";
import {DataList} from "@/components/ui/datalist";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";
import {db} from "@/db";
import {favoriteFoods, foods, foodTypes, users} from "@/db/schema";
import {isAuthorized} from "@/lib/auth";

import {getUserByEmail, type User as UserType} from "../dao";
import {SettingsTab} from "./_components/tabs/settings";

async function getUser() {
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

export default async function UserProfilePage() {
  let user = await getUser();
  return (
    <PageWrapper>
      <H1>
        Welcome {user.firstName} {user.lastName}
      </H1>
      <UserTabs user={user} />
    </PageWrapper>
  );
}
type User = NonNullable<UserType>;
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
        <FavoriteFoods userId={user.id} />
        <AllTab />
      </Box>
    </Tabs.Root>
  );
}
// TODO parallel routes?
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

async function FavoriteFoods({userId}: {userId: number}) {
  let favorites = await db
    .select({
      foodId: foods.id,
      foodName: foods.name,
      foodDescription: foods.description,
      foodSlug: foods.slug,
      foodTypeId: foods.typeId,
      foodTypeName: foodTypes.name,
      foodTypeSlug: foodTypes.slug,
    })
    .from(favoriteFoods)
    .innerJoin(users, eq(favoriteFoods.userId, users.id))
    .innerJoin(foods, eq(favoriteFoods.foodId, foods.id))
    .innerJoin(foodTypes, eq(foods.typeId, foodTypes.id))
    .where(eq(users.id, userId));

  return (
    <Tabs.Content value="favorites">
      <H3 className="flex items-center gap-2" mb="3">
        Favorite foods <Icons.Star size={20} />
      </H3>
      <Flex asChild direction="column" gap="2">
        <ul>
          {favorites.map((f) => (
            <Flex key={f.foodId} asChild gap="2">
              <li>
                <Link href={`/foods/${f.foodSlug}`} className="transition-opacity hover:opacity-40">
                  <Span className="capitalize" weight="medium" color="gray">
                    {f.foodName}
                  </Span>
                </Link>
                <FoodTypeBadge name={f.foodTypeName} slug={f.foodTypeSlug} />
              </li>
            </Flex>
          ))}
        </ul>
      </Flex>
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
