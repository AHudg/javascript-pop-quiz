var timeLeft = 75;
// creates our DOM element for the score (timer)
var scoreEl = document.getElementById("score");
// creates our DOM element for the button to start the quiz
var beginBtnEl = document.querySelector("button[name='begin']");
// creates our DOM element for the <div> containing the quiz questions/answers
var quizEl = document.querySelector("div[class='focal-pt-bg']");
// creates our DOM element for the <ol> that will contain the answer choices
var orderEl = document.querySelector("ol[class='answer-list']");
console.log(orderEl)
// creates our DOM element for the <p> that is the quiz question
var quizQuestionEl = document.getElementById("quiz-questions");
// creates list items to later append to the quiz
var listItemOneEl = document.createElement('li');
var listItemTwoEl = document.createElement('li');
var listItemThreeEl = document.createElement('li');
var listItemFourEl = document.createElement('li');

// initialize an array to be used like a for loops but waits to iterate only after a <li> is clicked
var arrayIndex = 0;

// creates the array containing each question to be iterated through
var questionArray = ["Which of the following is NOT a commonly used data type?","The condition in an if/else statement is enclosed with ___?","Arrays in JavaScript can be used to store which of the following data types?","String values must be enclosed within ___ when being assigned to variables?","A very useful tool used during development and debugging for printing content to the debugger is?"];

// creates five objects that contain the four answer choices
ansObjOne = {
    ansOne: "Strings",
    ansTwo: "Booleans",
    ansThree: "Alerts",
    ansFour: "Numbers"
};

ansObjTwo = {
    ansOne: "Quotes",
    ansTwo: "Curly brackets",
    ansThree: "Parenthesis",
    ansFour: "Square brackets"
};

ansObjThree = {
    ansOne: "Numbers and strings",
    ansTwo: "Other arrays",
    ansThree: "Booleans",
    ansFour: "All of the above",
};

ansObjFour = {
    ansOne: "Commas",
    ansTwo: "Curly brackets",
    ansThree: "Quotes",
    ansFour: "Parenthesis"
};

ansObjFive = {
    ansOne: "JavaScript",
    ansTwo: "Terminal/Git Bash",
    ansThree: "For loops",
    ansFour: "Console.log",
};

// places those objects in an array at the same index as their corresponding question
var answersArray = [ansObjOne, ansObjTwo, ansObjThree, ansObjFour, ansObjFive];

// // creates an array with the correct string answer
// var correctArray = ["Alerts","Parenthesis","All of the above","Quotes","Console.log"];

var startQuiz = function() {
    // calls the timer to start counting down (keeping score)
    countdown();
    
    // display: none to hide the Start Quiz button
    beginBtnEl.setAttribute('style','display: none');
    // styles the <div> containing the quiz questions/answers
    quizEl.setAttribute('style','border: #DB7093 5px solid; background:#FFE4E1;');

    // styles the question
    quizQuestionEl.setAttribute('style','color: var(--secondary); font-weight:bold; padding:5px');

    // append the list items that were populated at initialization to the <ol>
    orderEl.appendChild(listItemOneEl);
    orderEl.appendChild(listItemTwoEl);
    orderEl.appendChild(listItemThreeEl);
    orderEl.appendChild(listItemFourEl);

    // call createQuiz() to populate the first page of the quiz and style the elements
    createQuiz();

    // when one of the list items are selected, call functiong nextQuestion()
    orderEl.addEventListener("click", updateTimer);
};

// function changes the text to iterate through the questions/answers and styles accordingly
var createQuiz = function() {
    quizQuestionEl.textContent = questionArray[arrayIndex];
    listItemOneEl.textContent = answersArray[arrayIndex].ansOne;
    listItemTwoEl.textContent = answersArray[arrayIndex].ansTwo;
    listItemThreeEl.textContent = answersArray[arrayIndex].ansThree;
    listItemFourEl.textContent = answersArray[arrayIndex].ansFour;

    listItemOneEl.className = "answers";
    listItemTwoEl.className = "answers";
    listItemThreeEl.className = "answers";
    listItemFourEl.className = "answers";

    listItemOneEl.addEventListener("mouseover",function(event) {
        listItemOneEl.className = "answers-hover";
    });

    listItemOneEl.addEventListener("mouseout",function(event) {
        listItemOneEl.className = "answers";
    });

    listItemTwoEl.addEventListener("mouseover",function(event) {
        listItemTwoEl.className = "answers-hover";
    });

    listItemTwoEl.addEventListener("mouseout",function(event) {
        listItemTwoEl.className = "answers";
    });

    listItemThreeEl.addEventListener("mouseover",function(event) {
        listItemThreeEl.className = "answers-hover";
    });

    listItemThreeEl.addEventListener("mouseout",function(event) {
        listItemThreeEl.className = "answers";
    });

    listItemFourEl.addEventListener("mouseover",function(event) {
        listItemFourEl.className = "answers-hover";
    });

    listItemFourEl.addEventListener("mouseout",function(event) {
        listItemFourEl.className = "answers";
    });

};

var updateTimer = function(event) {
    var element = event.target;

    // creates an array with the correct string answer
    var correctArray = ["Alerts","Parenthesis","All of the above","Quotes","Console.log"];

    if (element.textContent === correctArray[arrayIndex]) {
        timeLeft += 5;
    } else {
        timeLeft -= 10;
    }
    arrayIndex++;
    return createQuiz();
};

// creates the function that will house the score (timer) and count down
var countdown = function() {
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