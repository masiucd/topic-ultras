import {type ClassValue, clsx} from "clsx";
import {download, generateCsv, mkConfig} from "export-to-csv";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AcceptedData = number | string | boolean | null | undefined;
export function exportToCsv<
  T extends {
    [k: string]: AcceptedData;
    [k: number]: AcceptedData;
  }
>(data: T[], file: string | null = null) {
  let csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename:
      file !== null && typeof file === "string"
        ? `${file}.csv`
        : "food-items.csv",
  });
  let csv = generateCsv(csvConfig)(data);
  return download(csvConfig)(csv);
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`
) {
  return count === 1 ? singular : plural;
}

export function capitilizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
