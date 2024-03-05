import { Dispatch, SetStateAction, useState } from "react";
import { getMocks } from "../data/mock";

// Takes in filepath and outputs
export function load(args: Array<string>) {
  let filepath: string = args[0];
  let mockedCSVs: Record<string, any> = getMocks();
  const csv = mockedCSVs[filepath];

  if (!csv) {
    return [["ERROR given CSV does not exist"]]; // CSV wasn't retrievable
  }

  // Ensure csv is an array of arrays
  if (!Array.isArray(csv) || !csv.every((row) => Array.isArray(row))) {
    return [["ERROR malformed CSV given"]]; // Not a proper CSV format
  }

  let prev_len: number = csv[0].length;
  for (let row of csv) {
    if (row.length !== prev_len) {
      return [["ERROR malformed CSV given"]];
    }
    prev_len = row.length;
  }

  return csv;
}
