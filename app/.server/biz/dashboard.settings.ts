import {z} from "zod";
import {STATUS_CODE} from "~/lib/status-code";
import {getUserInfos, insertUserInfos} from "../db/dao/users";

let SettingsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  gender: z.enum(["female", "male"]).optional(),
  userId: z.string(),
});

export async function addToUserInfos({
  userId,
  age,
  weight,
  height,
  firstName,
  lastName,
  gender,
}: {
  userId: string;
  age: FormDataEntryValue | null;
  weight: FormDataEntryValue | null;
  height: FormDataEntryValue | null;
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  gender: FormDataEntryValue | null;
}) {
  let data = SettingsSchema.parse({
    firstName,
    lastName,
    age,
    weight,
    height,
    gender,
    userId,
  });

  let ok = await insertUserInfos({
    userId: Number.parseInt(data.userId, 10),
    firstName: data.firstName,
    lastName: data.lastName,
    age: parseOptionalInt(data.age),
    weight: parseOptionalInt(data.weight),
    height: parseOptionalInt(data.height),
    gender: data.gender,
  });

  if (!ok) {
    return {
      ok,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "Failed to update user information",
    };
  }

  return {
    ok,
    status: STATUS_CODE.CREATED,
    message: "User information updated successfully",
  };
}

export async function retrieveUserInfos(userId: string) {
  return await getUserInfos(Number.parseInt(userId, 10));
}

function parseOptionalInt(x?: string): number | undefined {
  return x ? Number.parseInt(x, 10) : undefined;
}

export type User = NonNullable<
  Awaited<ReturnType<typeof retrieveUserInfos>>
>["user"];
