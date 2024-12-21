import fs from "node:fs";
import path from "node:path";

export function clean() {
  // delete node_modules

  fs.rmdirSync(path.resolve(__dirname, "../node_modules"), {recursive: true});
}
