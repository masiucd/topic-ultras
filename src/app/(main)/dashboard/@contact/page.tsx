import {Box, Card} from "@radix-ui/themes";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

import {Code, H4, Span} from "@/components/typography";
import {DataList} from "@/components/ui/datalist";
import {db} from "@/db";
import {userInfos} from "@/db/schema";
import {isAuthorized} from "@/lib/auth";

async function getUserInfo(userId: number) {
  try {
    let data = await db
      .select({
        about: userInfos.about,
        location: userInfos.location,
        phone: userInfos.phone,
        city: userInfos.city,
        country: userInfos.country,
      })
      .from(userInfos)
      .where(eq(userInfos.userId, userId));
    return data[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}

export default async function ContactSlot() {
  let payload = await isAuthorized();
  if (payload === null) {
    redirect("/signin");
  }
  let contactData = await getUserInfo(payload.id);
  if (contactData === null) {
    throw new Error("User not found");
  }

  return (
    <Box maxWidth="500px">
      <Card>
        <H4 size="3" className="flex items-center gap-2" mb="3">
          Contact information
        </H4>
        <DataList>
          <DataList.Item>
            <DataList.Label minWidth="128px">
              <Span weight="bold">About</Span>
            </DataList.Label>
            <DataList.Value>{contactData.about}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">location</Span>
            </DataList.Label>
            <DataList.Value>
              <Span>{contactData.location}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">phone</Span>
            </DataList.Label>
            <DataList.Value>
              <Code className="capitalize">{contactData.phone}</Code>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">City</Span>
            </DataList.Label>
            <DataList.Value>
              <Span className="capitalize">{contactData.city}</Span>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              <Span weight="bold">Country</Span>
            </DataList.Label>
            <DataList.Value>
              <Code>{contactData.country}</Code>
            </DataList.Value>
          </DataList.Item>
        </DataList>
      </Card>
    </Box>
  );
}
