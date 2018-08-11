/* UBER INTERVIEW #2
Given the following graph:

A --|
    |-- D --|
B --|       |-- E|
    |       |    |
C --|-------|    |----|G
F --|-------|----|
Each node is a async job, illustrated by setTimeout.

A, B, and C can run at the same time.

D, needs to wait for A and B to be done.

E needs to wait for C and D to be done.

Implement a function (runTasks) to take care of this for us.
new Promise(function(resolve, reject) {})
*/

var tasksInProgress = [];
var tasksCompleted = [];

var createTaskPromise = function(taskName,time,dependency){
		var task = function(){
        tasksCompleted.push(taskName);
        tasksInProgress.splice(tasksInProgress.indexOf(taskName),1);
        console.log('tasksCompleted',Object.assign({},tasksCompleted));
        console.log('tasksInProgress',Object.assign({},tasksInProgress));
    };
    return {
        name : taskName,
        dependency:dependency,
        execute:async function(){
              await Promise.all(this.dependency.map(function(val){
                  if(val.dependency.length > 1)
                      return val.execute();
                  else
                      return val.func();
              }));
              return this.func();
        },
    		func: function(){
              return new Promise(function(resolve,reject){
                tasksInProgress.push(taskName);
                console.log('tasksInProgress',Object.assign({},tasksInProgress));
                setTimeout(function(){
                  task();
                  resolve(taskName);
                },time);
              });
        }
    };
};

var taskA = createTaskPromise('TaskA',1000,[]);
var taskB = createTaskPromise('TaskB',2000,[]);
var taskC = createTaskPromise('TaskC',5000,[]);
var taskD = createTaskPromise('TaskD',1000,[taskA,taskB]);
var taskE = createTaskPromise('TaskE',4000,[taskD,taskC]);
var taskF = createTaskPromise('TaskF',4000,[]);
var taskG = createTaskPromise('TaskG',1000,[taskF,taskE]);

//SOLUTION #1
//console.log(Promise.all([Promise.all([taskA.func(),taskB.func()]).then(function(val){console.log(taskD.func());return val}),taskC.func()]).then(function(val){console.log(taskE.func());return val}));

//await Promise.all(																						,e)
//						await Promise.all(														,c)
//            									(                       ,d;)
//                               await Promise.all[a,b];

taskE.execute();
//taskG.execute();
