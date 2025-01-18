import {COLUMNS, type Column} from "@/lib/constants";
import {atom} from "jotai";

export let foodItemTableColumnsAtom = atom<Set<Column>>(new Set([...COLUMNS]));
