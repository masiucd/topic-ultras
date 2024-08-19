"use client";
import {Button, Card, Flex, Tabs, Tooltip} from "@radix-ui/themes";
import {useState} from "react";

import {P} from "@/components/typography";
import {Icons} from "@/components/ui/icons";
import {Input} from "@/components/ui/input";

import type {User as UserType} from "../../../dao";
import {updateUser} from "../../actions";

type User = NonNullable<UserType>;
export function SettingsTab({user}: {user: User}) {
  let [editType, setEditType] = useState<null | "EMAIL" | "PASSWORD">(null);
  return (
    <Tabs.Content value="settings">
      <P size="2">Edit your profile or update contact information.</P>
      <Card>
        <Flex direction="column" gap="5">
          <P size="2">Settings</P>
          <Input value={user.firstName} disabled />
          <Input value={user.lastName} disabled />
          <form action={updateUser}>
            <input type="hidden" name="userid" value={user.id} />
            <Email user={user} />
            <Password
              enabled={editType === "PASSWORD"}
              toggle={() => {
                if (editType === "PASSWORD") {
                  setEditType(null);
                } else {
                  setEditType("PASSWORD");
                }
              }}
            />
            <Button type="submit">Update</Button>
          </form>
        </Flex>
      </Card>
    </Tabs.Content>
  );
}

function Email({user}: {user: User}) {
  return (
    <Flex direction="column">
      <Input placeholder={user.email} name="email" />
    </Flex>
  );
}

function Password({enabled, toggle}: {enabled: boolean; toggle: () => void}) {
  return (
    <Flex direction="column" gap="2">
      <Flex direction="column" gap="3">
        <Input
          placeholder="password"
          disabled
          value="123456222sss##44221"
          type="password"
        />
        {enabled && (
          <Input placeholder="new password" type="password" name="password" />
        )}
      </Flex>

      <Flex>
        <Tooltip content="Edit password">
          <Button
            variant={enabled ? "soft" : "outline"}
            type="button"
            onClick={toggle}
          >
            <Icons.Edit />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
