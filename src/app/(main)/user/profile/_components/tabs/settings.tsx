"use client";
import {Button, Card, Flex, Tabs, Tooltip} from "@radix-ui/themes";
import {useState} from "react";

import {P} from "@/components/typography";
import {Icons} from "@/components/ui/icons";
import {Input} from "@/components/ui/input";
import type {User} from "@/lib/auth";

import {updateUser} from "../../actions";

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
            <Email
              user={user}
              disabled={editType === "PASSWORD"}
              enabled={editType === "EMAIL"}
              toggle={() => {
                if (editType === "EMAIL") {
                  setEditType(null);
                } else {
                  setEditType("EMAIL");
                }
              }}
            />
            <Password
              enabled={editType === "PASSWORD"}
              toggle={() => {
                if (editType === "PASSWORD") {
                  setEditType(null);
                } else {
                  setEditType("PASSWORD");
                }
              }}
              disabled={editType === "EMAIL"}
            />

            <Button type="submit" disabled={editType === null}>
              Update
            </Button>
          </form>
        </Flex>
      </Card>
    </Tabs.Content>
  );
}

function Email({
  enabled,
  disabled,
  toggle,
  user,
}: {
  enabled: boolean;
  disabled: boolean;
  toggle: () => void;
  user: User;
}) {
  return (
    <Flex direction="column">
      <Input placeholder={user.email} disabled={!enabled} />
      <Flex>
        <Tooltip content="Edit email">
          <Button
            variant={enabled ? "soft" : "outline"}
            type="button"
            disabled={disabled}
            onClick={toggle}
          >
            <Icons.Edit />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

function Password({
  enabled,
  toggle,
  disabled,
}: {
  enabled: boolean;
  disabled: boolean;
  toggle: () => void;
}) {
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
          <Input
            placeholder="new password"
            type="password"
            disabled={disabled}
          />
        )}
      </Flex>

      <Flex>
        <Tooltip content="Edit password">
          <Button
            variant={enabled ? "soft" : "outline"}
            type="button"
            disabled={disabled}
            onClick={toggle}
          >
            <Icons.Edit />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
