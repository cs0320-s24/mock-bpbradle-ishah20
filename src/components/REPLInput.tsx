import "../styles/main.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mock } from "node:test";
import { load } from "../REPLFunctions/load";
import { view } from "../REPLFunctions/view";
import { search } from "../REPLFunctions/search";

interface REPLInputProps {
  history: string[][][][];
  setHistory: Dispatch<SetStateAction<string[][][][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  updateREPL: (newState: string) => void;
}


export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<string>("Brief");
  const [currentCSV, setCurrentCSV] = useState<string>();

  // Parses input and calls function for inputted command or displays error
  function handleCommand(str: string | null): string[][][] {
    let command_string: string | undefined;

    // Parse input
    if (str == null) {
      return [[["ERROR: Null input to handleCommand()"]]];
    } else if (str.split(" ").length > 1) {
      command_string = str.split(" ")[0]; // if load() or search()
    } else {
      command_string = str; // if view()
    }

    let result_of_command: string[][][];

    // If: LOAD
    if (command_string.toLowerCase() === "load") {
      let filepath: string = str.split(" ")[1];
      let loadedCSV: string[][] = load([filepath]);
      if (loadedCSV[0][0] !== "ERROR given CSV does not exist") {
        setCurrentCSV(filepath);
        result_of_command = [[[str]], [["successfully loaded " + filepath]]];
      } else {
        result_of_command = [[[str]], loadedCSV];
      }
    }

    // If: VIEW
    else if (command_string.toLowerCase() === "view") {
      // no csv loaded
      if (currentCSV === undefined) {
        result_of_command = [
          [[str]],
          [["ERROR: calling view when no csv has been loaded"]],
        ];
        return result_of_command;
      }
      let csv: string[][] = view([currentCSV!]);
      result_of_command = [[[str]], csv]; // Add command to result
    }

    // If: SEARCH
    else if (command_string.toLowerCase() === "search") {
      // no csv loaded
      if (currentCSV === undefined) {
        result_of_command = [
          [[str]],
          [["ERROR: calling search when no csv has been loaded"]],
        ];
        return result_of_command;
      }
      // only runs search() if input gave the right amount of args
      else if (str.split(" ").length === 3) {
        let csv: string[][] = search([
          currentCSV!, // filename of loaded csv
          str.split(" ")[1], // Column to search
          str.split(" ")[2], // Value to search for
        ]);
        result_of_command = [[[str]], csv];
      }
      // If too many args
      else if (str.split(" ").length > 3) {
        result_of_command = [
          [[str]],
          [["ERROR: Provided too many terms in search"]],
        ];
      }
      // If too few args
      else {
        result_of_command = [
          [[str]],
          [["ERROR: Provided too few terms in search"]],
        ];
      }
    } 

    // If: ERROR
    else {
      result_of_command = [
        [[str]],
        [["ERROR: could not recognize your command"]],
      ];
    }
    return result_of_command; // index 0: <command text>, rest: <result of running the command>
  }

  // DONE WITH TA: build a handleSubmit function called in button onClick
  const handleSubmit = () => {
    setCount(count + 1);
    props.setHistory([...props.history, handleCommand(commandString)]); // Update history variable from top level
    setCommandString("");
  };

  // Switch mode to other mode on click of the mode button
  const handleModeswitch = () => {
    if (mode == "Verbose") {
      setMode("Brief");
      props.updateREPL("Brief");
    } else if (mode == "Brief") {
      setMode("Verbose");
      props.updateREPL("Verbose");
    }
  };

  return (
    <div className="repl-input">
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
