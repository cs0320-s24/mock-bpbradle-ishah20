import { Dispatch, SetStateAction, useState } from "react";
import { getMocks } from "../data/mock";

export function search(args: Array<string>) {
  let filepath: string = args[0];
  let mockedCSVs: Record<string, string[][]> = getMocks();
  let currentCSV: string[][] = mockedCSVs[filepath];

  if (currentCSV !== undefined) {
    // Extract column and value strings from inputs
    let column: string = "";
    let value: string = "";
    if (args.length === 3) {
      column = args[1];
      value = args[2];
    } else {
      return [["ERROR: Wrong Inputs"]];
    }

    /* ERROR OF NOTE: If CSV has no headers, we parse it's first row to find 
      column anyways, if your inputted column to search is a string in the first
      actual row of values in the CSV we will search the entire CSV in that column
      and not return an error which may be misleading */
    // column -> index of column
    let col: number;
    if (!isNaN(parseInt(column)) && parseInt(column).toString() === column) {
      col = parseInt(column);
    } else {
      col = currentCSV[0].indexOf(column);
      if (col === -1) {
        return [[
            "ERROR: Column Header not found in Loaded CSV, check the formatting of the words you are searching for...",
          ]];
      }
    }

    const csv_minus_header = currentCSV.slice(1);
    let rows_from_search: string[][] = []; // Q: Does this work and not cause an issue
    let found: boolean = false;
    for (let row of csv_minus_header) {
      if (row[col] === value) {
        found = true;
        rows_from_search.push(row);
      }
    }
    if (!found) {
      return [[]];
    }
    return rows_from_search;
  } else {
    return [["ERROR: Not Loaded Yet"]];
  }
}
