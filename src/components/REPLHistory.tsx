import "../styles/main.css";

interface REPLHistoryProps {
  history: string[][][];
  mode: string;
  // DONE: Fill with some shared state tracking all the pushed commands
}

function modeModifier() {
  //TODO: Mode Modifier to make the response brief or verbose
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
