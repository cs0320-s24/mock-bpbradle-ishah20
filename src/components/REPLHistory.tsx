import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
  // DONE: Fill with some shared state tracking all the pushed commands
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((elem, i) => ( // Display through mapping through history creating <p></p> objects
        <p key={i}>{elem}</p>
      ))}
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      commands.map()
    </div>
  );
}
