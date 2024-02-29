import { Dispatch, SetStateAction, useState } from "react";
import { getMocks } from "../data/mock";

// Takes in filepath and outputs
export function load(args: Array<string>) {
  let filepath: string = args[0];
  let mockedCSVs: Record<string, string[][]> = getMocks();
  const csv = mockedCSVs[filepath];
  if (csv) {
    return csv;
  } else {
    return [["ERROR in loading CSV"]];
  }
}
