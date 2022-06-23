// Initializes the timer/score
var timeLeft = 20;
// creates our DOM element for the score (timer)
var scoreEl = document.getElementById("score");

var body = document.querySelector("body");

// creates our DOM element for the <div> containing the quiz questions/answers
var quizEl = document.querySelector("div[class='focal-pt-bg']");
// creates our DOM element for the button to start the quiz
var beginBtnEl = document.querySelector("button[name='begin']");

var viewHighscore = document.querySelector("button[name='scores']")

// creates our DOM element for the <p> that is the quiz question
var quizQuestionEl = document.getElementById("quiz-questions");

// creates our DOM element for the <ol> that will contain the answer choices
var orderEl = document.querySelector("ol[class='answer-list']");
// creates list items to later append to the quiz
var listItemOneEl = document.createElement('li');
var listItemTwoEl = document.createElement('li');
var listItemThreeEl = document.createElement('li');
var listItemFourEl = document.createElement('li');

// initialize an array to be used like a for loops but waits to iterate only after a <li> is clicked
var arrayIndex = 0;

// creates the array containing each question to be iterated through
var questionArray = ["Which of the following is NOT a commonly used data type?","The condition in an if/else statement is enclosed with ___?","Arrays in JavaScript can be used to store which of the following data types?","String values must be enclosed within ___ when being assigned to variables?","A very useful tool used during development and debugging for printing content to the debugger is?"];

var startQuiz = function() {
    // calls the timer to start counting down (keeping score)
    countdown();

    viewHighscore.setAttribute('style','display: none');
    
    // display: none to hide the Start Quiz button
    beginBtnEl.setAttribute('style','display: none');
    // styles the <div> containing the quiz questions/answers
    quizEl.setAttribute('style','border: #DB7093 5px solid; background:#FFE4E1;');

    // styles the question
    quizQuestionEl.setAttribute('style','color: var(--secondary); font-weight:bold; padding: 0; margin:10px');

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
        scoreEl.textContent = "Your score: " + timeLeft;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            scoreEl.textContent = "";
        } else {
        scoreEl.textContent = "Your score: " + timeLeft;
        };
    }

    arrayIndex++;
    if (arrayIndex < questionArray.length) {
        return createQuiz();
    };
};

// creates the function that will house the score (timer) and count down
var countdown = function() {
    // use the setInterval to call this function every 1000 ms
    var firstInterval = setInterval(function() {
        // as long as time is left and you are still on a quiz question...
        if (timeLeft > 0 && arrayIndex < questionArray.length) {
            // set the text to set "Your score: ___"
            scoreEl.textContent = "Your score: " + timeLeft;
            // decrement the score (time) by 1
            timeLeft--;
        } 
        //
        else if (timeLeft > 0 && arrayIndex >= questionArray.length) {
            clearInterval(firstInterval);
            endQuiz();
        }
        // when the score (time) reaches 0...
        else {
            // stop the interval from continuing to run
            clearInterval(firstInterval);
            loser();
        };
    }, 1000); //for 1000ms
};

var endQuiz = function() {
    scoreEl.textContent = "";
    orderEl.setAttribute('style','display:none');
    quizQuestionEl.textContent = "Congratulations! You have finished the quiz with a score of " + timeLeft + "!";

    var endText = document.createElement("p");
    endText.setAttribute('id','endText');
    endText.textContent = "Don't forget to submit your score to the highscores below:";
    endText.setAttribute('style','color:var(--secondary); padding:0;');

    var formEl = document.createElement("form");
    formEl.setAttribute('id','form');

    var labelEl = document.createElement("label");
    labelEl.setAttribute('for',"initials");
    labelEl.textContent = "Initials:";
    labelEl.setAttribute('style','padding: 5px;')

    var inputEl = document.createElement("input");
    inputEl.setAttribute('type',"text");
    inputEl.setAttribute('name',"initials");
    inputEl.setAttribute('placeholder','ADH');
    inputEl.setAttribute('id',"initials");
    inputEl.setAttribute('style','padding:5px; border: 3px solid var(--secondary); border-radius: 5px;');

    var submitBtnEl = document.createElement("button");
    submitBtnEl.textContent = "Save";
    submitBtnEl.addEventListener("click", saveHighscores);

    quizEl.appendChild(endText);
    endText.appendChild(formEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitBtnEl);
};

var saveHighscores = function(event) {
    event.preventDefault();
    var inputEl = document.getElementById("initials");

    highscoreObj = {
        initial: inputEl.value,
        score: timeLeft,
    };

    inputEl.value = "";

    arrayHighscores = JSON.parse(localStorage.getItem("Highscores"));

    if (!arrayHighscores) {
        arrayHighscores = [];
    }

    arrayHighscores.push(highscoreObj);
    // You can save multiple times on one instance- it is a limitation

    // Sorts the array
    if (arrayHighscores.length > 1) {

        arrayHighscores.sort((a,b) => {
            return b.score - a.score;
        });
        
        if (arrayHighscores.length > 5) {
            arrayHighscores.splice(5, arrayHighscores.length-5);
        }
    }

    localStorage.setItem("Highscores", JSON.stringify(arrayHighscores));

    window.location.reload();
}

var loadHighscores = function() {
    if (viewHighscore.textContent === "View Highscores") {
        viewHighscore.textContent = "Return";
        quizEl.setAttribute('style','border: #DB7093 5px solid; background:#FFE4E1;');
        quizQuestionEl.setAttribute('style','color: var(--secondary); font-weight:bold; padding: 0; margin:10px');
        beginBtnEl.setAttribute('style','display: none');
        orderEl.setAttribute('style','display: none');

        quizQuestionEl.textContent = "Highscores List";
        makeTable();

        arrayHighscores = JSON.parse(localStorage.getItem("Highscores"));

        if (!arrayHighscores) {
            arrayHighscores = [];
        }

        if (arrayHighscores.length < 5) {
            highscoreObj = {
                initial: "None",
                score: "N/A",
            };

            switch(arrayHighscores.length) {
                case 4:
                    arrayHighscores.splice(4,0,highscoreObj);
                    break;
                case 3:
                    arrayHighscores.splice(3,0,highscoreObj,highscoreObj);
                    break;
                case 2:
                    arrayHighscores.splice(2,0,highscoreObj,highscoreObj,highscoreObj);
                    break;
                case 1:
                    arrayHighscores.splice(1,0,highscoreObj,highscoreObj,highscoreObj,highscoreObj);
                    break;
                default:
                    arrayHighscores.splice(0,0,highscoreObj,highscoreObj,highscoreObj,highscoreObj,highscoreObj);

            }
        }

        tableInitialOneEl.textContent = arrayHighscores[0].initial;
        tableScoreOneEl.textContent = arrayHighscores[0].score;

        tableInitialTwoEl.textContent = arrayHighscores[1].initial;
        tableScoreTwoEl.textContent = arrayHighscores[1].score;

        tableInitialThreeEl.textContent = arrayHighscores[2].initial;
        tableScoreThreeEl.textContent = arrayHighscores[2].score;

        tableInitialFourEl.textContent = arrayHighscores[3].initial;
        tableScoreFourEl.textContent = arrayHighscores[3].score;

        tableInitialFiveEl.textContent = arrayHighscores[4].initial;
        tableScoreFiveEl.textContent = arrayHighscores[4].score;

        var clearScores = document.createElement("button");
        clearScores.textContent = "Clear Highscores";
        quizEl.appendChild(clearScores);


    } else if (viewHighscore.textContent === "Return") {
        window.location.reload();
    }
}

var makeTable = function() {
    // creates the table DOM element
    tableEl = document.createElement("table");
    // creates the first row containing the 'Initials' and 'Scores' labels for table
    tableRowLabelEl = document.createElement("tr");
    tableInitialEl = document.createElement("th");
    tableInitialEl.setAttribute('bgcolor',"#DB7093");
    tableScoreEl = document.createElement("th");
    tableScoreEl.setAttribute('bgcolor',"#DB7093");

    // creates the second row of the table- the first row of actual highscores
    tableRowOneEl = document.createElement("tr");
    tableInitialOneEl = document.createElement("td");
    tableInitialOneEl.setAttribute('bgcolor','#FFC0CB')
    tableScoreOneEl = document.createElement("td");
    tableScoreOneEl.setAttribute('bgcolor','#FFC0CB');

    // creates the third row of the table- the second row of actual highscores
    tableRowTwoEl = document.createElement("tr");
    tableInitialTwoEl = document.createElement("td");
    tableInitialTwoEl.setAttribute('bgcolor',"#DB7093");
    tableScoreTwoEl = document.createElement("td");
    tableScoreTwoEl.setAttribute('bgcolor',"#DB7093");

    // creates the fourth row of the table- the third row of actual highscores
    tableRowThreeEl = document.createElement("tr");
    tableInitialThreeEl = document.createElement("td");
    tableInitialThreeEl.setAttribute('bgcolor','#FFC0CB');
    tableScoreThreeEl = document.createElement("td");
    tableScoreThreeEl.setAttribute('bgcolor','#FFC0CB');

    // creates the fifth row of the table- the fourth row of actual highscores
    tableRowFourEl = document.createElement("tr");
    tableInitialFourEl = document.createElement("td");
    tableInitialFourEl.setAttribute('bgcolor',"#DB7093");
    tableScoreFourEl = document.createElement("td");
    tableScoreFourEl.setAttribute('bgcolor',"#DB7093");

    // creates the sixth row of the table- the fifth row of actual highscores
    tableRowFiveEl = document.createElement("tr");
    tableInitialFiveEl = document.createElement("td");
    tableInitialFiveEl.setAttribute('bgcolor','#FFC0CB');
    tableScoreFiveEl = document.createElement("td");
    tableScoreFiveEl.setAttribute('bgcolor','#FFC0CB');

    var flexDiv = document.createElement("div");
    flexDiv.className = "flex";
    quizEl.appendChild(flexDiv);

    // appends the table to the div
    flexDiv.appendChild(tableEl);

    //appends row one and it's table headers
    tableEl.appendChild(tableRowLabelEl);
    tableRowLabelEl.appendChild(tableInitialEl);
    tableRowLabelEl.appendChild(tableScoreEl);

    // appends row two and the first initials/score
    tableEl.appendChild(tableRowOneEl);
    tableRowOneEl.appendChild(tableInitialOneEl);
    tableRowOneEl.appendChild(tableScoreOneEl);

    // appends row three and the second initials/score
    tableEl.appendChild(tableRowTwoEl);
    tableRowTwoEl.appendChild(tableInitialTwoEl);
    tableRowTwoEl.appendChild(tableScoreTwoEl);    

    // appends row four and the third initials/score
    tableEl.appendChild(tableRowThreeEl);
    tableRowThreeEl.appendChild(tableInitialThreeEl);
    tableRowThreeEl.appendChild(tableScoreThreeEl); 

    // appends row five and the fourth initials/score
    tableEl.appendChild(tableRowFourEl);
    tableRowFourEl.appendChild(tableInitialFourEl);
    tableRowFourEl.appendChild(tableScoreFourEl); 

    // appends row six and the fifth initials/score
    tableEl.appendChild(tableRowFiveEl);
    tableRowFiveEl.appendChild(tableInitialFiveEl);
    tableRowFiveEl.appendChild(tableScoreFiveEl); 

    tableInitialEl.textContent = "Initials";
    tableScoreEl.textContent = "Scores";
}

var loser = function() {
    scoreEl.textContent = "";

    orderEl.setAttribute('style','display:none');

    quizQuestionEl.textContent = "Uh oh! Looks like you ran out of time :/";

    var loserText = document.createElement("p");
    loserText.textContent = "Don't worry though! I encourage you to try again!";
    loserText.setAttribute('style','color:var(--secondary); padding:0;');

    var retryBtnEl = document.createElement("button");
    retryBtnEl.textContent = "Retry!"
    retryBtnEl.setAttribute('onClick','window.location.reload()');

    quizEl.appendChild(loserText);
    quizEl.appendChild(retryBtnEl);

};

var clearHighscores = function(event) {
    var targetEl = event.target;

    if (targetEl.textContent === "Clear Highscores") {
        localStorage.clear();

        tableInitialOneEl.textContent = "None";
        tableScoreOneEl.textContent = "N/A";

        tableInitialTwoEl.textContent = "None";
        tableScoreTwoEl.textContent = "N/A";

        tableInitialThreeEl.textContent = "None";
        tableScoreThreeEl.textContent = "N/A";

        tableInitialFourEl.textContent = "None";
        tableScoreFourEl.textContent = "N/A";

        tableInitialFiveEl.textContent = "None";
        tableScoreFiveEl.textContent = "N/A";
    }
};

// so I get rid of the parenthesis behind this function? With parenthesis it runs automaticall- w/o them it waits like expected.
beginBtnEl.addEventListener("click", startQuiz);
viewHighscore.addEventListener("click", loadHighscores);
body.addEventListener("click",clearHighscores);