// creates our DOM element for the score (timer)
var scoreEl = document.getElementById("score");
// creates our DOM element for the button to start the quiz
var beginBtnEl = document.querySelector("button[name='begin']");
// creates our DOM element for the <div> containing the quiz questions/answers
var quizEl = document.querySelector("div[class='focal-pt-bg']");
// creates our DOM element for the <p> that is the quiz question
var quizQuestion = document.getElementById("quiz-questions");

var questionArray = ["Which of the following is NOT a commonly used data type?","The condition in an if/else statement is enclosed with ___?","Arrays in JavaScript can be used to store which of the following data types?","String values must be enclosed within ___ when being assigned to variables?","A very useful tool used during development and debugging for printing content to the debugger is?"];
    
ansObjOne = {
    ansOne: "Strings",
    ansTwo: "Booleans",
    ansNestObj: {
        ansThree: "Alerts",
        corrent: true
    },
    ansFour: "Numbers"
};

ansObjTwo = {
    ansOne: "Quotes",
    ansTwo: "Curly brackets",
    ansNestObj: {
        ansThree: "Parenthesis",
        correct: true
    },
    ansFour: "Square brackets"
};

ansObjThree = {
    ansOne: "Numbers and strings",
    ansTwo: "Other arrays",
    ansThree: "Booleans",
    ansNestObj: {
        ansFour: "All of the above",
        corect: true
    }
};

ansObjFour = {
    ansOne: "Commas",
    ansNestObj: {
        ansTwo: "Curly brackets",
        correct: true
    },
    ansThree: "Quotes",
    ansFour: "Parenthesis"
};

ansObjFive = {
    ansOne: "JavaScript",
    ansTwo: "Terminal/Git Bash",
    ansThree: "For loops",
    ansNestObj: {
        ansFour: "Console.log",
        correct: true
    }
};

var answersArray = [ansObjOne, ansObjTwo, ansObjThree, ansObjFour, ansObjFive];

var correctArray = ["Alerts","Parenthesis","All of the above","Curly brackets","Console.log"];

var startQuiz = function() {
    // calls the timer to start counting down (keeping score)
    countdown();
    
    // display: none to hide the Start Quiz button
    beginBtnEl.setAttribute('style','display: none');
    // styles the <div> containing the quiz questions/answers
    quizEl.setAttribute('style','border: #DB7093 5px solid; background:#FFE4E1;');
    // styles the question
    quizQuestion.setAttribute('style','color: var(--secondary); font-weight:bold');

    // createQuestions();
};

var createQuestions = function() {

}

// creates the function that will house the score (timer) and count down
var countdown = function() {
    var timeLeft = 75;

    // use the setInterval to call this function every 1000 ms
    var firstInterval = setInterval(function() {
        // as long as time is left...
        if (timeLeft > 0) {
            // set the text to set "Your score: ___"
            scoreEl.textContent = "Your score: " + timeLeft;
            // decrement the score (time) by 1
            timeLeft--;
        // when the score (time) reaches 0...
        } else {
            // erase the score (timer) completely
            scoreEl.textContent = "";
            // stop the interval from continuing to run
            clearInterval(firstInterval);
            alert("You've run out of time!");
        };
    }, 1000); //for 1000ms
};

// so I get rid of the parenthesis behind this function? With parenthesis it runs automaticall- w/o them it waits like expected.
beginBtnEl.addEventListener("click", startQuiz);