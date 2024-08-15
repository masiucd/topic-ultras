import {hashPassword} from "@/lib/password";

import type {DB} from "..";
import {users} from "../schema";
import usersData from "./data/users.json";

export async function seed(db: DB) {
  await db.transaction(async (tx) => {
    for (let u of usersData) {
      await tx
        .insert(users)
        .values({
          firstName: u.firstName,
          lastName: u.lastName,
          age: u.age,
          email: u.email,
          password: await hashPassword("123456"),
        })
        .execute();
    }
  });
}
