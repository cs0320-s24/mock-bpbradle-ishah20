import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mock } from "node:test";
import { load } from "../REPLFunctions/load";
import { view } from "../REPLFunctions/view";
import { search } from "../REPLFunctions/search";

interface REPLInputProps {
  history: string[][][][];
  setHistory: Dispatch<SetStateAction<string[][][][]>>;
  mode: string | undefined;
  setMode: Dispatch<SetStateAction<string | undefined>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<string>("Brief");
  const [currentCSV, setCurrentCSV] = useState<string>();

  // Parses input and calls function for inputted command
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
    // LOAD
    if (command_string.toLowerCase() === "load") {
      let filepath: string = str.split(" ")[1];
      setCurrentCSV(filepath);
      result_of_command = [[[str]], [["<Loaded CSV> --> " + filepath]]];
    }
    // VIEW
    else if (command_string.toLowerCase() === "view") {
      if (currentCSV === undefined) {
        result_of_command = [[["ERROR: calling view when no csv is loaded"]]];
      }
      let csv: string[][] = view([currentCSV!]);
      result_of_command = [[[str]], csv]; // Add command to result
    }
    // SEARCH
    else if (command_string.toLowerCase() === "search") {
      if (currentCSV === undefined) {
        result_of_command = [[["ERROR: calling search when no csv is loaded"]]];
      }
      let csv: string[][] = search([
        currentCSV!, // filename of loaded csv
        str.split(" ")[1], // Column to search
        str.split(" ")[2], // Value to search for
      ]);
      result_of_command = [[[str]], csv];
    } else {
      result_of_command = [[[str]], [["ERROR: Incorrect Input"]]];
    }
    return result_of_command; // index 0: <command text>, rest: <result of running the command>
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
