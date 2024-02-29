import "../styles/main.css";

interface REPLHistoryProps {
  history: string[][][];
  mode: string;
  // DONE: Fill with some shared state tracking all the pushed commands
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((elem, i) => (
        <div key={i} style={{ marginBottom: "20px", marginTop: "20px" }}>
          {props.mode.toLowerCase() === "brief" && <p>{elem[0].join(" ")}</p>}
          <table border={1}>
            <tbody>
              {elem.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
