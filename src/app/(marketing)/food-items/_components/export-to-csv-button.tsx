"use client";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {selectedFoodItems} from "@/store/food-items";
import {download, generateCsv, mkConfig} from "export-to-csv";
import {useAtomValue} from "jotai";

export function ExportToCsvButton() {
  let items = useAtomValue(selectedFoodItems);
  return (
    <Button
      onClick={() => {
        download(CSV_CONFIG)(CSV);
      }}
    >
      <Icons.Download />
      Export
    </Button>
  );
}

const CSV_CONFIG = mkConfig({useKeysAsHeaders: true});

const MOCK_DATA = [
  {
    name: "Rouky",
    date: "2023-09-01",
    percentage: 0.4,
    quoted: '"Pickles"',
  },
  {
    name: "Keiko",
    date: "2023-09-01",
    percentage: 0.9,
    quoted: '"Cactus"',
  },
];

// Converts your Array<Object> to a CsvOutput string based on the configs
const CSV = generateCsv(CSV_CONFIG)(MOCK_DATA);
