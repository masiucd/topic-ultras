"use client";

import {Button, Flex, TextArea, Tooltip} from "@radix-ui/themes";

import {Label, Span} from "@/components/typography";
import {Icons} from "@/components/ui/icons";
import {Input} from "@/components/ui/input";
import {useToggle} from "@/hooks/toggle";

import type {User} from "../dao";

export function ProfileButton({user}: {user: NonNullable<User>}) {
  let [isOpen, {toggle}] = useToggle();
  return (
    <>
      {isOpen ? (
        <Flex direction="column" gap="1" asChild>
          <form action="">
            <Flex gap="2" direction="column">
              <Label size="1" weight="medium" htmlFor="first_name">
                First Name
              </Label>
              <Input type="text" name="first_name" placeholder={user.firstName} />
              <input type="hidden" name="default_first_name" value={user.firstName} />
            </Flex>
            <Flex gap="1" direction="column">
              <Label size="1" weight="medium" htmlFor="last_name">
                Last Name
              </Label>
              <Input type="text" name="last_name" placeholder={user.lastName} />
              <input type="hidden" name="default_last_name" value={user.lastName} />
            </Flex>

            <Flex gap="1" direction="column">
              <Label size="1" weight="medium" htmlFor="about">
                About
              </Label>
              <TextArea name="about" placeholder={user.information?.about ?? "Enter bio..."} />
              {user.information.about && (
                <input type="hidden" name="default_about" value={user.information.about} />
              )}
            </Flex>

            <Flex gap="1">
              <Button type="submit" variant="outline" color="green">
                Save
              </Button>
              <Button
                type="button"
                variant="soft"
                onClick={(e) => {
                  e.preventDefault();
                  toggle();
                }}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </Flex>
      ) : (
        <Tooltip content="Profile">
          <Button onClick={toggle} variant="ghost">
            <Span size="2">
              <Icons.Profile />
            </Span>
          </Button>
        </Tooltip>
      )}
    </>
  );
}
