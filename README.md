# Project Details

Project Name: Mock
Team Members & Contributions: Ibrahim Shah & Benjamin Bradley ->
Together we did the load, view, and search via pair programming in person (Monday & Wednesday). Additionally, we fleshed out the readme together on Thursday. Benjamin completed Mode button Monday night and did small adjustments to the REPL interface, and most of the comments. Ibrahim completed most of the testing suite.

# Design Choices

Relationship between Classes & Interfaces:
The core of our class structure is reminicsent of the mock handout with a REPL containing instances of the REPL history and REPL input classes. REPL input calls the load, view, and search methods which all implement the REPL function interface. REPL Input and REPLHistory share a history variable of the type that contains string[][][][] and the reason why is that it is a list of items where each item is a list containing the text of the command, and a CSV where a CSV is a string[][]. In addition to updating the history which REPL History then displays all of the contents of, REPLInput can also change a string variable called mode shared between REPL input and REPLHistory which will tell REPL History how to print out the history. Whether to print just the result of the command, or the command alongside the result.

# Errors/Bugs

One possible error depending on the users expected functionality is that when you load a CSV that doesn't have a header and search using a column identifier the column identifier will still be used to search through the first row of the CSV. This means that you can still get a search result if either the string you included as a column identifier also happens to be in the first row, which is not a header, or if you entered an index for the column identifier it will still search everytime.

# Tests

# How to

How to run the tests: Run npm test in terminal.
To build and run the program run in terminal : npm start
Then click on the local host link eventually displayed in the terminal.
You will then be brought to your browser and see a Login button which upon clicking displays a command entering textbox and two buttons. One button changes the mode of the history, which will be displayed above the textbook, and the other button to submit whatever command you type into the textbox.

Example commands to enter would be:

# Collaboration

Much of the code was lifted from the mockgearup. Didn't reference or lift anyone elses code.
