import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mock } from "node:test";

interface REPLInputProps {
  history: string[][][];
  setHistory: Dispatch<SetStateAction<string[][][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<string>("Brief");
  const [currentCSV, setCurrentCSV] = useState<string[][]>();

  const mockedCSVs: { [key: string]: string[][] } = {
    "data/census/dol_ri_earnings_disparity_no_header.csv": [
      ["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
      ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
      [
        "RI",
        "Native American/American Indian",
        "$471.07",
        "2315.505646",
        "$0.45",
        "0%",
      ],
      [
        "RI",
        "Asian-Pacific Islander",
        "$1,080.09",
        "18956.71657",
        "$1.02",
        "4%",
      ],
      ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
      ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"],
    ],
    "data/census/dol_ri_earnings_disparity.csv": [
      [
        "State",
        "Data Type",
        "Average Weekly Earnings",
        "Number of Workers",
        "Earnings Disparity",
        "Employed Percent",
      ],
      ["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
      ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
      [
        "RI",
        "Native American/American Indian",
        "$471.07",
        "2315.505646",
        "$0.45",
        "0%",
      ],
      [
        "RI",
        "Asian-Pacific Islander",
        "$1,080.09",
        "18956.71657",
        "$1.02",
        "4%",
      ],
      ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
      ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"],
    ],
  };

  // Takes in filepath and outputs
  function loadCSV(filepath: string): string {
    const csv = mockedCSVs[filepath];
    if (csv) {
      setCurrentCSV(csv);
      return "Loaded CSV at " + filepath;
    } else {
      return "ERROR in loading CSV";
    }
  }

  // Return the matrix of stirngs for the current stored CSV
  function viewCSV(): string[][] {
    if (currentCSV !== undefined) {
      return currentCSV;
    } else {
      return [["ERROR: Not Loaded Yet"]];
    }
  }

  function searchCSV(inputs: string[]): string[][] {
    if (currentCSV !== undefined) {
      // Extract column and value strings from inputs
      let column: string = "";
      let value: string = "";
      if (inputs.length == 2) {
        column = inputs[1];
        value = inputs[0];
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
          return [["ERROR: Column Header not found in Loaded CSV"]];
        }
      }

      currentCSV.shift(); // Q: Does this alter the loaded CSV ???
      let rows_from_search: string[][] = []; // Q: Does this work and not cause an issue
      let found: boolean = false;
      for (let row of currentCSV) {
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

  // Parses input and calls function for inputted command
  function handleCommand(str: string | string[] | null) {
    let command_string: string | undefined;

    // Parse input
    if (Array.isArray(str)) {
      command_string = str[0]; // if load() or search()
    } 
    else if (str == null) {
      return [["ERROR: Null input to handleCommand()"]]
    } 
    else {
      command_string = str // if view()
    }

    let result_of_command: string[][];
    if (command_string === "load") {
      result_of_command = [[loadCSV(str[1])]];
    } else if (command_string === "view") {
      result_of_command = viewCSV();
    } else if (command_string === "search") {
      result_of_command = searchCSV([str[1], str[2]]);
    } else {
      result_of_command = [["ERROR"]];
    }

    return result_of_command;
  }

  // DONE WITH TA: build a handleSubmit function called in button onClick
  // DONE: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  const handleSubmit = () => {
    setCount(count + 1);
    props.setHistory([...props.history, handleCommand(commandString)]); // Update history variable from top level
    setCommandString("");
  };

  const handleModeswitch = () => {
    if (mode == "Verbose") {
      setMode("Brief");
    }
    if (mode == "Brief") {
      setMode("Verbose");
    }
  };

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* Submit command */}
      <div className="repl-input-box-holder">
        <button className="repl-input-box" onClick={handleSubmit}>
          Submitted {count} times
        </button>
        <button className="repl-input-box" onClick={handleModeswitch}>
          {mode} mode
        </button>
      </div>
    </div>
  );
}
