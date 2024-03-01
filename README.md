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

The testing suite we implemented uses playwright to manually ensure that our website is working it as we expect it to. PlayWright testing allows us to execute browser automation tests and interacte with our webpage to ensure it functions as we intend. We have alot of very basic tests that ensure functionality of our website via interaction with buttons and commands, such as tests that ensure the load button exists, that you don't see anything until you login, that the count button increments. Additionally, we test to see what happens when we give incorrect inputs, and how they return errors in the REPL history, checking between brief and verbose mode. We also check simultaneous tab execution, and ensure that you have to login again if you reload the page. We then check to see if the load, view, and search commands work on multiple datasets on brief and verbose mode. The last thing we test is malformed CSV's, and how to load, view, and search them.

# How to

How to run the tests: Run npm test in terminal.
To build and run the program run in terminal : npm start
Then click on the local host link eventually displayed in the terminal.
You will then be brought to your browser and see a Login button which upon clicking displays a command entering textbox and two buttons. One button changes the mode of the history, which will be displayed above the textbook, and the other button to submit whatever command you type into the textbox.

Examples of commands to enter would be:

- Loading Mock csv #1 -> load data/census/dol_ri_earnings_disparity_no_header.csv
- Loading Mock csv #2 -> load data/census/dol_ri_earnings_disparity.csv
- Try loading a non-existent mock csv -> load data/census/dol_ri_earnings_dity_no_header.csv
- View after a load command -> view
- View before a load command -> view
- Search after loading Mock csv #1: search White Black
- Incorrect search after loading Mock csv #1: search white black
- Search after loading Mock csv #2: search State RI

# Collaboration

Much of the code was lifted from the mockgearup. Didn't reference or lift anyone elses code.
