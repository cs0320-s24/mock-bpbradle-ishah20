import "../styles/main.css";

interface REPLHistoryProps {
  history: string[][][][]; // list of [[[cmd]], csv] where csv is a string[][]
  mode: string | undefined;
  // DONE: Fill with some shared state tracking all the pushed command
}

export function REPLHistory({ history, mode }: REPLHistoryProps) {
  console.log(history);
  return (
    <div className="repl-history">
      {history.map(([cmd, csv], i) => (
        <div key={i} style={{ marginBottom: "20px", marginTop: "20px" }}>
          {/* Add [cmd], elem[0] (aka ) as caption */}
          {mode !== "Brief" && (
            <p style={{ color: "#7FFFD4" }}>{cmd.join(" ")}</p>
          )}
          {csv.length === 1 && csv[0].length === 1 ? (
            // When csv is a single string, display it as a paragraph
            <p>{csv[0][0]}</p>
          ) : (
            // Otherwise, render it as a table
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table border={1}>
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
          )}
        </div>
      ))}
    </div>
  );
}
