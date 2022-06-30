
//create timer counter
var secondsLeft = 40; 

//create timer variable
var timer;

// create score counter
var score = 0;

//get html element 
var timerEl = document.querySelector("#timer")  

// get main html el
var qHeadEl =  document.querySelector("#q-header") 

//grab h2 element
var qEl =  document.querySelector("#question") 

// grab p element
var pEl = document.querySelector("#q-subtext") 

// grab q-card element
var cardEl =  document.querySelector("#q-card") 

//grab all button elements 
var btns = document.querySelectorAll(".mult-choice-opt")

//grab button elements individually
var btn1El =  document.querySelector("#button-1") 
var btn2El =  document.querySelector("#button-2")
var btn3El =  document.querySelector("#button-3")
var btn4El =  document.querySelector("#button-4")
var subBtn = document.querySelector("#submit-btn")
var goBackBtn = document.querySelector("#go-back")
var clearBtn = document.querySelector("#clear-high-scores")
var highScoreLink = document.querySelector("#view-high-scores")
var strtBtn = document.querySelector("#strt-btn")



// grab form element
var formEl = document.querySelector("#submit-form")

//grab high score card element
var hiScrEl = document.querySelector("#high-score-card")

// grab ol element
var scoreListEl = document.querySelector("#score-list")

//grab value of input
var initialText =  document.querySelector("#initial-box").value.trim(); 




function timerSet(){ // a function that decrements the timer counter and writes to the timer element 
    timer = setInterval( function (){
        secondsLeft--
        if (secondsLeft <= 0){ //game over state
            stopTimer()
            score = secondsLeft
            qEl.textContent = "All Done! You ran out out time/points"
            completedPage.p = `Your final score is: ${score}` //alter object to reflect this
            pEl.textContent = completedPage.p; // update p element
            cardEl.style = "display: none;" // hide buttons
            formEl.style = "display: block;" // reveal form element
        }
        timerEl.textContent = `Time left: ${secondsLeft} seconds`
    }, 1000)   
}
function stopTimer(){
    clearInterval(timer)
}

// create question objects
var question1 = {
    questionText: "Common Data types DO NOT include: " ,
    A: "1. strings",
    B: "2. booleans",
    C: "3. alerts",
    D: "4. numbers",
    p: "", 
    displayStatus: "display: block",
    rightAnswer : "#button-3"
}

var question2 = {
    questionText: "The condition in an if/else statement is enclosed within ____. " ,
    A: "1. quotes",
    B: "2. curly brackets",
    C: "3. parentheses",
    D: "4. square brackets",
    p: "", 
    displayStatus: "display: block",
    rightAnswer : "#button-3"
}
var question3 = {
    questionText: "A very useful tool used during development for printing content to the debugger is: " ,
    A: "1. JavaScript",
    B: "2. terminal/bash",
    C: "3. for loops",
    D: "4. console.log",
    p: "", 
    displayStatus: "display: block",
    rightAnswer : "#button-4",
}

var completedPage = {
    questionText: "All Done!" ,
    A: "1. JavaScript",
    B: "2. terminal/bash",
    C: "3. for loops",
    D: "4. console.log",
    p: `Error`, 
    displayStatus: "display: none",
}
// TODO: learn more about forEach, maybe replace array with object
var qArray = [question1, question2, question3, completedPage ]; //create array of question objects
var qArrayIndex = 0; //init index to 0

function alterQCard() { // alter the contents of the q card
    qEl.textContent = qArray[qArrayIndex].questionText;
    btn1El.textContent = qArray[qArrayIndex].A;
    btn2El.textContent = qArray[qArrayIndex].B;
    btn3El.textContent = qArray[qArrayIndex].C;
    btn4El.textContent = qArray[qArrayIndex].D;
    pEl.textContent =  qArray[qArrayIndex].p;
    cardEl.setAttribute("style", qArray[qArrayIndex].displayStatus)
}


//set event listener for start button
qHeadEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        alterQCard()
        qArrayIndex++
        event.target.setAttribute("style", "display: none;")
        timerSet() // call timer 
    }
})


// event listener for button presses in q-card,  q array index needs to be offest by 1 to allow for the start button to make it's change, otherwise the first card needs to be clicked twice
cardEl.addEventListener("click", function (event){
    if (event.target.matches("button")) {
        alterQCard()
        console.log(qArray[qArrayIndex-1].rightAnswer)
        console.log(qArray[qArrayIndex-1])
        console.log(qArrayIndex-1)
        if (event.target.matches(qArray[qArrayIndex-1].rightAnswer)){ //subtract points for a wrong answer
            console.log("right answer")
        } else {
            secondsLeft = secondsLeft -5
            
        }

        if (qArrayIndex < qArray.length-1){ // if it is not the last index in the qArray add one to the index
            qArrayIndex++
        } else{  // if it is the last index in the qArray
            score = secondsLeft //assign a score variable
            completedPage.p = `Your final score is: ${score}` //alter object to reflect this
            pEl.textContent = qArray[qArrayIndex].p; // update p element
            formEl.style = "display: block;" // reveal form element
            stopTimer()
        }
        
    }
})


//create array to store scores in local storage
var highScores = [];

function setScoreList(){
    localStorage.setItem("highScores", JSON.stringify(highScores)) //update local storage
}

function renderScoreList(){
    var listItems =  document.querySelectorAll(".score-item") //grab all lis
    for (i=0; i < listItems.length; i++){ //remove the li elements from the page
        listItems[i].remove()
    }
    for (i=0; i < highScores.length; i++) { //create lis
        var scoreEl = document.createElement("li")
        scoreEl.textContent = highScores[i]
        scoreEl.className = "score-item" //assign al lis to a class
        scoreListEl.append(scoreEl)//append li to an ol on the page
    }
}

// event listener for the submit button
subBtn.addEventListener("click", function (event) {
    event.preventDefault();
    
    qEl.textContent = "High Scores:"; // set h2 el
    pEl.textContent = ""; //empty p el
    formEl.style = "display: none;"; // hide form element
    hiScrEl.style = "display: block;";// reveal high score card

    var storedScores =JSON.parse(localStorage.getItem("highScores")) //pull from local storage, if there is something there, set the array to it
    if (storedScores !==null){
        highScores = storedScores
    }

    //push input to highScores
    var initialText =  document.querySelector("#initial-box")
    initialText = initialText.value;  //grab  value of input
    initialText = `${initialText} with ${score} points`
    highScores.push(initialText)
    setScoreList() // store the item
    renderScoreList() // render list

}) ;

clearBtn.addEventListener("click", function() { //clear highscores
    highScores = [] // make highscores empty
    setScoreList()
    renderScoreList()
})

goBackBtn.addEventListener("click", function(){
    qArrayIndex = 0;
    secondsLeft = 30;
    hiScrEl.style = "display: none;";
    pEl.textContent = " Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10s";
    qEl.textContent = "Coding Quiz Challenge";
    timerEl.style = "display: block;";
    strtBtn.style = "display: inline-block;";
})

highScoreLink.addEventListener("click", function(){
    qEl.textContent = "High Scores:"; // set h2 el
    pEl.textContent = ""; //empty p el
    formEl.style = "display: none;"; // hide form element
    hiScrEl.style = "display: block;";// reveal high score card
    strtBtn.style =  "display:none;"

    var storedScores =JSON.parse(localStorage.getItem("highScores")) //pull from local storage, if there is something there, set the array to it
    if (storedScores !==null){
        highScores = storedScores
    }
    renderScoreList()
})