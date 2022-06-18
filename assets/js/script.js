// creates our DOM element for the score (timer)
var scoreEl = document.getElementById("score");
// creates our DOM element for the button to start the quiz
var beginBtnEl = document.querySelector("button[name='begin']");

debugger;

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
        }
    }, 1000);
};

// so I get rid of the parenthesis behind this function? With parenthesis it runs automaticall- w/o them it waits like expected.
beginBtnEl.addEventListener("click", countdown);