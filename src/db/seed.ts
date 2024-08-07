import {getTableName, sql, type Table} from "drizzle-orm";

import env from "@/env";

import {connection, type DB, db} from ".";
import * as schema from "./schema";
import * as seeds from "./seeds";

if (!env.DB_SEED) {
  throw new Error("Seed must be enabled to run this script");
}

(async () => {
  for (let table of [
    schema.foods,
    schema.foodNutrients,
    schema.foodTypes,
    schema.users,
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await truncate(db, table);
  }
})();

(async () => {
  await seeds.foodTypes(db);
  await seeds.foods(db);
  await seeds.users(db);
  await seeds.foodNutrients(db);
  await connection.end();
})();

// Clear tables without truncating / resetting ids
async function truncate(db: DB, table: Table) {
  await db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}
