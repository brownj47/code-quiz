
//create timer counter
var secondsLeft = 75; 

//get html element 
var timerEl = document.querySelector("#timer")  

//grab h4 element
var qEl =  document.querySelector("#question") 

//grab all button elements 
var btns = document.querySelectorAll(".mult-choice-opt")

//grab button elements individually
var btn1El =  document.querySelector("#button-1") 
var btn2El =  document.querySelector("#button-2")
var btn3El =  document.querySelector("#button-3")
var btn4El =  document.querySelector("#button-4")


function timerSet(){ // a function that decrements the timer counter and writes to the timer element 
    var timer = setInterval( function (){
        secondsLeft--
        if (secondsLeft === 0){ //game over state
            clearInterval(timer)
            qEl.textContent = "Game Over"
            for (i=0; i < btns.length; i++) { //make all buttons display none
                btns[i].setAttribute("style", "display: none;")
            }
        }
        timerEl.textContent = `Time left: ${secondsLeft} seconds`
    }, 1000)   
}
timerSet() // call timer 

// create question objects
var question1 = {
    questionText: "Common Data types DO NOT include: " ,
    A: "1. strings",
    B: "2. booleans",
    C: "3. alerts",
    D: "4. numbers",
}

var question2 = {
    questionText: "The condition in an if/else statement is enclosed within ____. " ,
    A: "1. quotes",
    B: "2. curly brackets",
    C: "3. parentheses",
    D: "4. square brackets",
}

var qArray = [question1, question2]; //create array of question objects
var qArrayIndex = 0; //init index to 0

function alterQCard() { // alter the contents of the q card
    qEl.textContent = qArray[qArrayIndex].questionText;
    btn1El.textContent = qArray[qArrayIndex].A;
    btn2El.textContent = qArray[qArrayIndex].B;
    btn3El.textContent = qArray[qArrayIndex].C;
    btn4El.textContent = qArray[qArrayIndex].D;
}
