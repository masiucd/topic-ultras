import Database from "better-sqlite3";
import {drizzle} from "drizzle-orm/better-sqlite3";

let db = Object.freeze(drizzle(new Database("sqlite.db")));

export {db};
