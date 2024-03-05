import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";

interface REPLHistoryProps {
  history: string[][][][]; // list of [[[cmd]], csv] where csv is a string[][]]
  mode: string | undefined;
  // DONE: Fill with some shared state tracking all the pushed command
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map(([cmd, csv], i) => (
        <div key={i} style={{ marginBottom: "20px", marginTop: "20px" }}>
          {/* Add [cmd], elem[0] (aka ) as caption */}
          {props.mode !== "Brief" && (
            <p style={{ color: "#7FFFD4" }}>{"Command: " + cmd.join(" ")}</p>
          )}
          {csv.length === 1 && csv[0].length === 1 ? (
            // When csv is a single string, display it as a paragraph
            <div>
              {props.mode !== "Brief" ? (
                <p style={{ display: "flex", justifyContent: "center" }}>
                  {"Output: " + csv[0][0]}
                </p>
              ) : (
                <p style={{ display: "flex", justifyContent: "center" }}>
                  {csv[0][0]}
                </p>
              )}
            </div>
          ) : (
            // Otherwise, render it as a table
            <div style={{ display: "block", textAlign: "center" }}>
              {props.mode !== "Brief" && (
                <div>
                  <p>{"Output: "}</p>
                </div>
              )}
              <div>
                <table border={1} style={{ margin: "auto" }}>
                  {" "}
                  {/* Center the table */}
                  <tbody>
                    {csv.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} style={{ padding: "0 10px" }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
