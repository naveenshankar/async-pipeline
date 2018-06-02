# async-pipeline
Run a bunch of async tasks with dependencies

/* UBER INTERVIEW #2
Given the following graph:

A --|
    |-- D --|
B --|       |-- E|
    |       |		 |
C --|-------|    |----|G
F --|-------|----|
Each node is a async job, illustrated by setTimeout.

A, B, and C can run at the same time.

D, needs to wait for A and B to be done.

E needs to wait for C and D to be done.

Implement a function (runTasks) to take care of this for us.
new Promise(function(resolve, reject) {})
*/
