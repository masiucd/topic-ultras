import {env} from "$/env";
import {type Table, getTableName, sql} from "drizzle-orm";
import {type DB, db} from ".";
import * as schema from "./schema";
import * as seeds from "./seed/index";

// import * as seeds from "./seed/index";

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DB, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

async function reset(db: DB) {
  for (let table of [schema.foodCategories, schema.foodItems]) {
    await resetTable(db, table);
  }
}

async () => {
  try {
    await reset(db);
  } catch (error) {
    console.error(error);
  }
};

async function seedDatabase(db: DB) {
  await seeds.seedFoodCategories(db);
  await seeds.seedFoodItems(db);
}

async () => {
  try {
    await seedDatabase(db);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(1);
  }
};
