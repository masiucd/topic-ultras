import {eq} from "drizzle-orm";
import {db} from "..";
import {userInfos, users} from "../schema";
import type {Gender} from "../schema/user-infos";

/**
 * Retrieves a user by their email address from the database.
 *
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or null if not found or an error occurs.
 * @throws Will log an error to the console if the database query fails.
 */
export async function getUserByEmail(email: string) {
  try {
    let r = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));

    if (r.length > 0) {
      return r[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Inserts a new user into the database with the provided email and password.
 *
 * @param email - The email address of the user to be inserted.
 * @param password - The password of the user to be inserted.
 * @returns A promise that resolves when the user is successfully inserted.
 * @throws Will log an error to the console if the insertion fails.
 */
export async function insertUser(email: string, password: string) {
  try {
    await db.insert(users).values({
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves a user by their ID from the database.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<{ id: number, email: string, password: string } | null>}
 * A promise that resolves to the user object if found, or null if not found or an error occurs.
 */
export async function getUserById(id: number) {
  try {
    let r = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
      })

      .from(users)
      .leftJoin(userInfos, eq(users.id, userInfos.id))
      .where(eq(users.id, id));

    if (r.length > 0) {
      return r[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export type UserById = Awaited<ReturnType<typeof getUserById>>;

/**
 * Updates the password of a user in the database.
 *
 * @param hashedPassword - The new hashed password to be set for the user.
 * @param email - The email of the user whose password is to be updated.
 * @returns A promise that resolves to `true` if the password was successfully updated, or `false` if an error occurred.
 */
export async function updateUserPassword(
  hashedPassword: string,
  email: string
) {
  try {
    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.email, email));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function insertUserInfos({
  userId,
  age,
  weight,
  height,
  firstName,
  lastName,
  gender,
}: {
  userId: number;
  age?: number;
  weight?: number;
  height?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
}) {
  try {
    let result = await db
      .insert(userInfos)
      .values({
        id: userId,
        age: age,
        weight: weight,
        height: height,
        firstName,
        lastName,
        gender,
      })
      .returning({id: userInfos.id});

    return result.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function getUserInfos(userId: number) {
  try {
    let rows = await db
      .select({
        userId: users.id,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        age: userInfos.age,
        weight: userInfos.weight,
        height: userInfos.height,
        gender: userInfos.gender,
      })
      .from(users)
      .leftJoin(userInfos, eq(users.id, userInfos.id))
      .where(eq(users.id, userId));

    return {user: rows[0]};
  } catch (error) {
    console.error(error);
    return null;
  }
}
