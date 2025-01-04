import {z} from "zod";
import {STATUS_CODE} from "~/lib/status-code";
import {parseOptionalInt} from "~/lib/utils";
import {getUserInfos, insertUserInfos, updateUserInfos} from "../db/dao/users";

export async function addOrUpdateUserInfos({
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

  let userInfos = await getUserInfos(Number.parseInt(data.userId, 10));
  if (!userInfos?.user) {
    let ok = await createUserInformation(data);
    if (!ok) {
      return new AddOrUpdateResult(
        ok,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Failed to insert user information"
      );
    }

    return new AddOrUpdateResult(
      ok,
      STATUS_CODE.CREATED,
      "User information inserted successfully"
    );
  }

  let ok = await updateUserInformation(data);
  if (!ok) {
    return new AddOrUpdateResult(
      ok,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Failed to update user information"
    );
  }

  return new AddOrUpdateResult(
    ok,
    STATUS_CODE.CREATED,
    "User information updated successfully"
  );
}

export async function retrieveUserInfos(userId: string) {
  return await getUserInfos(Number.parseInt(userId, 10));
}
export type User = NonNullable<
  Awaited<ReturnType<typeof retrieveUserInfos>>
>["user"];

async function createUserInformation(data: SettingsSchema) {
  return await insertUserInfos({
    userId: Number.parseInt(data.userId, 10),
    firstName: data.firstName,
    lastName: data.lastName,
    age: parseOptionalInt(data.age),
    weight: parseOptionalInt(data.weight),
    height: parseOptionalInt(data.height),
    gender: data.gender,
  });
}

async function updateUserInformation(data: SettingsSchema) {
  return updateUserInfos({
    userId: Number.parseInt(data.userId, 10),
    firstName: data.firstName,
    lastName: data.lastName,
    age: parseOptionalInt(data.age),
    weight: parseOptionalInt(data.weight),
    height: parseOptionalInt(data.height),
    gender: data.gender,
  });
}

class AddOrUpdateResult {
  ok: boolean;
  status: number;
  message: string;

  constructor(ok: boolean, status: number, message: string) {
    this.ok = ok;
    this.status = status;
    this.message = message;
  }
}

let SettingsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  gender: z.enum(["female", "male"]).optional(),
  userId: z.string(),
});

type SettingsSchema = z.infer<typeof SettingsSchema>;
