import { Dispatch, SetStateAction, useState } from "react";
import { getMocks } from "../data/mock";

// Return the matrix of strings for the current stored CSV
export function view(args: Array<string>) {
  let filepath: string = args[0];
  let mockedCSVs: Record<string, string[][]> = getMocks();
  let currentCSV: string[][] = mockedCSVs[filepath];

  if (currentCSV !== undefined) {
    return currentCSV;
  } else {
    return [["ERROR: Not Loaded Yet"]];
  }
}
