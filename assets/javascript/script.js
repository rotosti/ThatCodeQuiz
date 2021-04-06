// query selectors for all the necessary HTML elements that will be dynamically updated as the 
// quiz runs, grouped by components of the quiz application
// view high score link
var highScoreBtn = document.querySelector('#high-score-link');
// score and timer box and elements
var topRightBox = document.querySelector('#right-box');
var timeLeftSpan = document.querySelector('#time-left');
var scoreSpan = document.querySelector('#score');
// welcome card elements
var welcomeCard = document.querySelector('#welcome-card');
var questionTotalText = document.querySelector('#total-questions');
var timeTotalText = document.querySelector('#total-time');
var secondPenaltyText = document.querySelector('#second-penalty');
var gameStartBtn = document.querySelector('#begin-button');
// question card elements
var questionCard = document.querySelector('#question-card');
var questionText = document.querySelector('#question');
var answerButtonA = document.querySelector('#answerA');
var answerButtonB = document.querySelector('#answerB');
var answerButtonC = document.querySelector('#answerC');
var answerButtonD = document.querySelector('#answerD');
var answerButtonE = document.querySelector('#answerE');
var questionChoice1 = document.querySelector('#choice-1');
var questionChoice2 = document.querySelector('#choice-2');
var questionChoice3 = document.querySelector('#choice-3');
var questionChoice4 = document.querySelector('#choice-4');
var questionChoice5 = document.querySelector('#choice-5');
var correctOrWrongText = document.querySelector('#correct-Answer-Notifier');
// form card
var formCard = document.querySelector('#form-card');
var finalScoreForCard = document.querySelector('#final-score');
var nameInputTF = document.querySelector('#name-input');
var backToStartFromForm = document.querySelector('#back-to-start-button-from-form');
var submitToScoreboard = document.querySelector('#submit-to-scoreboard');
// high scores card
var highScoresCard = document.querySelector('#high-scores-card');
var clearScoresBtn = document.querySelector('#clear-scores-button');
var backToStartFromScores = document.querySelector("#back-to-start-button");

// variables that change the amount of questions to ask the user
// changes total quiz time
var timer = 45; 
// total amount of questions that will be asked, can be updated to a max of 25 which is
// the current total of questions in the question bank
var questionCount = 10;
// time penalty when a question is answered incorrectly
var secondPenalty = 5;
// pulls high scores from the local storage in the browser or sets to empty array if nothing found
var highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];

// initalization function, will update the total questions to ask, time penalty, and 
// total quiz time in the welcome card; will also update the high scores by scanning the local
// storage for previous high scores
function init() {
    questionTotalText.textContent = questionCount;
    timeTotalText.textContent = timer;
    secondPenaltyText.textContent = secondPenalty;
    updateHighScores();
}

// adds event listener to pull up the high score card from the welcome card (only place where 
// high score link is visible)
highScoreBtn.addEventListener("click", showHighScores);

// function to display the high score card and hide the view high scores link
function showHighScores() {
    // high score link
    highScoreBtn.dataset.visibility = "hidden";
    highScoreBtn.style.display = "none";
    // welcome card
    welcomeCard.dataset.visibility = "hidden";
    welcomeCard.style.display = "none";
    // high score card
    highScoresCard.dataset.visibility = "visible";
    highScoresCard.style.display = "flex";
}

// this function will clear the high score list, sort the user scores in descending order, re-set
// the local storage of high scores with the sorted values, and update the high score list on the
// HTML
function updateHighScores() {
    // reset of high score list
    document.body.children[5].children[1].innerHTML="";
    // sorts the high score list by score in decending order
    highScoreList = highScoreList.sort(function(a,b) {
        return(b[1]-a[1]);
    });
    // sets the sorted high score list in the local storage
    localStorage.setItem("highScores", JSON.stringify(highScoreList));
    // loop to create list items in the high score list and pull the correct user name and score
    // from the high score array
    for (var i = 0; i < highScoreList.length; i++) {
        // creates li tag
        var li = document.createElement('li');
        // creates two span tags
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');
        // sets id and text with user name
        span1.id = "user-name";
        span1.textContent = highScoreList[i][0];
        // sets id and text with user score
        span2.id = "user-score";
        span2.textContent = highScoreList[i][1];
        // adds spans as children to li
        li.appendChild(span1);
        li.appendChild(span2);
        // adds li to high score list parent
        document.body.children[5].children[1].appendChild(li);
    }
}

// event listener for the button on the high scores page which clears the current high scores
clearScoresBtn.addEventListener("click", clearHighScores);

// function which clears the high scores from the high scores list, from the array variable, and
// sets the empty variable in the local storage
function clearHighScores() {
    // clears the list of high scores in the HTML
    document.body.children[5].children[1].innerHTML="";
    // sets the high score list to an empty array
    highScoreList = [];
    // sets the high score list array (which is empty) to local storage
    localStorage.setItem("highScores", JSON.stringify(highScoreList));
}

// event listener for the button click to return from the high score card to the welcome card
backToStartFromScores.addEventListener("click", returnFromScores);

// function which returns the user from the high score card to the welcome card
function returnFromScores() {
    // high score card
    highScoresCard.dataset.visibility = "hidden";
    highScoresCard.style.display = "none";
    // high score card link seen when welcome card is visible
    highScoreBtn.dataset.visibility = "visible";
    highScoreBtn.style.display = "block";
    // welcome card
    welcomeCard.dataset.visibility = "visible";
    welcomeCard.style.display = "flex";
}

//event listener for button click to return to welcome card from high score entry card
backToStartFromForm.addEventListener("click", returnFromScoreForm);

// function which returns from the form card to the welcome card
function returnFromScoreForm() {
    // form card
    formCard.dataset.visibility = "hidden";
    formCard.style.display = "none";
    // welcome card
    welcomeCard.dataset.visibility = "visible";
    welcomeCard.style.display = "flex";
}

// event listener for the button to submit score and name to the high score list
submitToScoreboard.addEventListener("click", submitScore);

// function which submits user name and high score to the score list, will also update the 
// high score list array
function submitScore() {
    // takes the score and user name from the form card and stores in variables for processing
    var usersFinalScore = finalScoreForCard.textContent;
    var userName = nameInputTF.value;
    // pushes the user and score onto the high score list array
    highScoreList.push([userName, usersFinalScore]);
    // calls to update the high score list
    updateHighScores();
    // hides the form card
    formCard.dataset.visibility = "hidden";
    formCard.style.display = "none";
    // displays high score card
    highScoresCard.dataset.visibility = "visible";
    highScoresCard.style.display = "flex";
    // changes the value in the input text field on the form card to blank once the form card
    // is no longer visible
    nameInputTF.value = "";
}

// event listener on the welcome card for the user to start the quiz
gameStartBtn.addEventListener("click", startGame);

// core function of the application.  will display the questions card and dynamically update the
// HTML with new questions, new answers, start the timer, keep track of the score, display the 
// correct or wrong answer notifier, and verify if time ran out or the correct amount of questions
// have been asked
function startGame() {
    // START GAME INITIALIZATION
    // gets the question pool from the question bank
    var questionPool = generateQuestionPool();
    // turns on the scoreboard and timer
    scoreboardAndTimerToggle();
    // hides the welcome card
    welcomeCard.dataset.visibility = "hidden";
    welcomeCard.style.display = "none";
    // displays the question card
    questionCard.dataset.visibility = "visible";
    questionCard.style.display = "flex";
    // turns of high score button during game
    highScoreBtn.dataset.visibility = "hidden";
    highScoreBtn.style.display = "none";
    // creates event listeners for button clicks on the 5 list items where the answers are displayed
    answerButtonA.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonB.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonC.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonD.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonE.addEventListener("click", verifyAnswerToNextQuestion);
    // updates timer on the top right of the screen once the question card is displayed
    updateTimer(timer);
    // gets the working timer for the game from the timer variable which stores how many seconds
    // the game should last
    var currentGameTimer = timer;
    // sets the amount of questions that have been asked to 0, also used as index for the question
    // pool
    var traversedQuestionCount = 0;
    // sets user score to 0
    var userScore = 0;
    // updates user score on top right of screen
    updateScore(userScore);
    // updates the question in the question card to the first question in the question bank
    updateQuestion();
    // END INITIALIZATION

    // starts the timer for the game, each interval is 1 second long
    var timeInterval = setInterval(function() {
        // counts down the timer and updates what is displayed to the user
        currentGameTimer--;
        updateTimer(currentGameTimer);
        // condition to check if the timer has run out of if the correct amount of questions
        // have been asked
        if(currentGameTimer <= 0 || traversedQuestionCount === (questionCount)) {
          // will terminate the timer with clearInterval call
          clearInterval(timeInterval);
          // removes listeners on the answer choices since the game is over at this point,
          // fixes bug regarding duplicate listeners
          answerButtonA.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonB.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonC.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonD.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonE.removeEventListener("click", verifyAnswerToNextQuestion);
          // calls game over since the game is indeed over
          gameOver(userScore);
        }
    // interval set to 1000 milliseconds, or 1 second
    }, 1000);
    // nested function in the start game function, unique to the event listener for choosing answers,
    // will verify if the target answer is correct and react accordingly
    function verifyAnswerToNextQuestion(event) {
        // timer to display the answer notification text
        var wrongOrRightTimer = 1;
        // checks if the data-value property of the target click is the correct answer
        if (event.target.dataset.value === questionPool[traversedQuestionCount][6]) {
            // displays correct answer text notifying the user the answer selection was correct
            correctOrWrongText.style.color = "green";
            correctOrWrongText.innerHTML = "CORRECT";
            correctOrWrongText.style.display = "block";
            // updates the score since the question was answered correctly
            userScore += 5;
            // updates the user score span on the HTML
            updateScore(userScore);
            // counts answered question towards the total asked question count
            traversedQuestionCount++;
            // sets an intervial to show the correct answer notification to .7 seconds
            var timeInterval = setInterval(function() {
                //counts down the timer
                wrongOrRightTimer--;
                // checks if the timer is 0
                if(wrongOrRightTimer === 0) {
                    // stops the answer notification timer
                    clearInterval(timeInterval);
                    // hides the answer notification from user
                    correctOrWrongText.style.display = "none";
                    // verifies if to update the question if there are remaining questions in the
                    // question pool
                    if (traversedQuestionCount < questionPool.length) {
                        // calls function that updates question based on the current question count
                        updateQuestion();
                    }
                }
            // interval time of 700 milliseconds, or .7 seconds
            }, 700);
        // if selected target is the wrong answer
        } else {
            // displays wrong answer text notifying the user the selection was not correct
            correctOrWrongText.style.color = "red";
            correctOrWrongText.innerHTML = "WRONG";
            correctOrWrongText.style.display = "block";
            // applies game time penalty for getting an answer wrong
            currentGameTimer -= secondPenalty;
            // updates time to the new time after penalty deduction
            updateTimer(currentGameTimer);
            // counts answered question towards the total asked question count
            traversedQuestionCount++;
            // sets an intervial to show the wrong answer notification to .7 seconds
            var timeInterval = setInterval(function() {
                //counts down the timer
                wrongOrRightTimer--;
                // checks if the timer is 0
                if(wrongOrRightTimer === 0) {
                    // stops the answer notification timer
                    clearInterval(timeInterval);
                    // hides the answer notification from user
                    correctOrWrongText.style.display = "none";
                    // verifies if to update the question if there are remaining questions in the
                    // question pool
                    if (traversedQuestionCount < questionPool.length) {
                         // calls function that updates question based on the current question count
                        updateQuestion();
                    }
                }
            // interval time of 700 milliseconds, or .7 seconds
            }, 700);
        }
    }
    // updates the question card question and answers using the traversed question count as the index
    function updateQuestion() {
        // updates the question
        questionText.textContent = questionPool[traversedQuestionCount][0];
        // updates answer A
        questionChoice1.textContent = questionPool[traversedQuestionCount][1];
        questionChoice1.dataset.value = questionPool[traversedQuestionCount][1];
        answerButtonA.dataset.value = questionPool[traversedQuestionCount][1];
        // updates answer B
        questionChoice2.textContent = questionPool[traversedQuestionCount][2];
        questionChoice2.dataset.value = questionPool[traversedQuestionCount][2];
        answerButtonB.dataset.value = questionPool[traversedQuestionCount][2];
        // updates answer C
        questionChoice3.textContent = questionPool[traversedQuestionCount][3];
        questionChoice3.dataset.value = questionPool[traversedQuestionCount][3];
        answerButtonC.dataset.value = questionPool[traversedQuestionCount][3];
        // updates answer D
        questionChoice4.textContent = questionPool[traversedQuestionCount][4];
        questionChoice4.dataset.value = questionPool[traversedQuestionCount][4];
        answerButtonD.dataset.value = questionPool[traversedQuestionCount][4];
        // updates answer E
        questionChoice5.textContent = questionPool[traversedQuestionCount][5];
        questionChoice5.dataset.value = questionPool[traversedQuestionCount][5];
        answerButtonE.dataset.value = questionPool[traversedQuestionCount][5];
    }
}

// function which randomly picks a specified amount of questions out of the question bank (based on
// the amount of questions designated in the quiz at the variable declaration)
function generateQuestionPool() {
    // array to store questions that will be sent back to caller
    var questionsToSendBack = [];
    // question bank as an array containing arrays
    var questionBank = [
        ["A Javascript variable is declared with which of the following keywords?", // question
        "var", // answer A
        "true", // answer B
        "span", // answer C
        "function", // answer D
        "rubberDucky", // answer E
        "var"], // correct answer
        ["HTML stands for ______",
        "Heavy Text Markup Language",
        "Hyper Text Markup Language",
        "Hotel Tango Mango Lima",
        "Hyper Text Making Language",
        "Hyper Textual Modification Language",
        "Hyper Text Markup Language"], 
        ["CSS stands for ______",
        "Cobra Styling System",
        "Cascada",
        "Cascading Style Sheets",
        "Cascading Style System",
        "Captain Style Symphony",
        "Cascading Style Sheets"], 
        ["Which of the following is not a Javascript data type?",
        "undefined",
        "string",
        "number",
        "boolean",
        "float",
        "float"], 
        ["Which company developed Javascript?",
        "Netscape",
        "Bell Labs",
        "Sun Microsystems",
        "IBM",
        "Microsoft",
        "Netscape"], 
        ["Inside which HTML element do we put Javascript?",
        "<head>",
        "<meta>",
        "<footer>",
        "<li>",
        "<script>",
        "<script>"],
        ["When linking a CSS stylesheet externally, we put the directory of the file in what attribute?",
        "id=",
        "class=",
        "src=",
        "href=",
        "data-css=",
        "href="],
        ["Javascript was created in how many days?",
        "1",
        "5",
        "10",
        "20",
        "50",
        "10"],
        ["What symbol is used to create comments in Javascript?",
        "\\\\", // escaped characters
        "//",
        "/* */",
        "<!-- -->",
        "\\* */",
        "//"],
        ["What is the definition of an undefined value in Javascript?",
        "a variable used in the code that doesn't exist",
        "a variable that is not assigned any value",
        "a property doesn't exist",
        "All of the Above",
        "None of the Above",
        "All of the Above"],
        ["What are the types of pop up boxes available in Javascript?",
        "Alert",
        "Confirm",
        "Prompt",
        "All of the Above",
        "None of the Above",
        "All of the Above"],
        ["What is the strict comparison operator in Javascript",
        "<=",
        ">=",
        "=",
        "==",
        "===",
        "==="],
        ["What types of quotation marks can you use to create a string in Javascript?",
        '""',
        "''",
        "``",
        "All of the Above",
        "None of the Above",
        "All of the Above"],
        ['In the equation "var b = 30 + 30", what will be the value of B assuming var B = 0?',
        "60",
        "0",
        "3030",
        "3300",
        "None of the Above",
        "0"],
        ["When trying to output some data to the browser's console, what function would you use?",
        "console.print()",
        "console.display()",
        "console.log()",
        "console.console()",
        "SEND IT FOR ME COMPUTER!",
        "console.log()"],
        ["If I wanted to assign a value of 10 to variable a, what operator would I typically use?",
        "===",
        "-=",
        "==",
        "=",
        "->",
        "="],
        ["If I wanted to change CSS properties when a user hovers over an element, what psuedo-class would I use?",
        ":hover",
        ":over",
        "::hover",
        ":highlight",
        ":focus",
        ":hover"],
        ["What is the correct Javascript file extension?",
        ".js",
        ".jss",
        ".javascript",
        ".ecma6",
        ".java",
        ".js"],
        ["What is the correct way to access the 2nd element in an arry?",
        "array[2]",
        "array.at(2)",
        "array.push(2)",
        "array[1]",
        "array[0]",
        "array[1]"],
        ["Math.random() returns a number between 0 and ______",
        "100",
        "1",
        "10",
        "infinity",
        "50",
        "1"],
        ["When creating an object in Javascript, what brackets are used to identify an object?",
        "[]",
        "{}",
        "()",
        "<>",
        "><",
        "{}"],
        ["Why do Javascipt and Java have a similar name?",
        "Javascript is a stripped down version of Java",
        "They were made by the same person",
        "They were both made on the island of Java",
        "Java and Javascript are the same language",
        "Javascript's syntax is loosely based on Java",
        "Javascript's syntax is loosely based on Java"],
        ["When a user views a page containing a Javascript program, which machine is executing the code?",
        "The web server",
        "Some server in some cloud somewhere",
        "The user's machine in a web browser",
        "The little gnome using an adding machine in my computer case",
        "Jeffrey",
        "The user's machine in a web browser"],
        ["Using the _____ statement, we can test for a specific condition.",
        "var",
        "select",
        "switch",
        "for",
        "if",
        "if"],
        ["Using the += is the same as ",
        "var c = c + b",
        "var b = a + c",
        "var b = a + a",
        "var c = c = c",
        "var a = b + c",
        "var c = c + b"],
    ]

    // loop to randomly pull questions from the question bank and verify the question was not
    // repeated
    for (var i = 0; i < questionCount; i++) {
        // gets random index using Math.random()
        var questionBankIndex = Math.floor(Math.random() * questionBank.length);
        // verifies if the question that is being selected by the random number exists in the 
        // questions to send back, it if does, it decreases i and repeats process
        if (questionsToSendBack.includes(questionBank[questionBankIndex])) {
            i--;// decrement of i to repeat the same iteration again
        } else {
            // adds question to the array if the question is unique to the array
            questionsToSendBack.push(questionBank[questionBankIndex]);
        }
    }
    // returns the questions back to the caller
    return questionsToSendBack;
}

// function specific to disabling the view on the score and timer in the top right of the
// screen
function scoreboardAndTimerToggle() {
    // if the scoreboard and timer is hidden, make is visible
    if (topRightBox.dataset.visibility === "hidden") {
        topRightBox.dataset.visibility = "visible";
        topRightBox.style.display = "block";
    } else { // if the scoreboard is visible, make it hidden
        topRightBox.dataset.visibility = "hidden";
        topRightBox.style.display = "none";
    }
}

// function to update the timer in the top right of the app when the questions card is visible
function updateTimer(time) {
    timeLeftSpan.textContent = time;
}

// function to update the score in the top right of the app when the questions card is visible
function updateScore(score) {
    scoreSpan.textContent = score;
}

// function which is called at the end of the quiz when either the timer hits 0 or the correct
// amount of questions are asked and answered
function gameOver(gameScore){
    // turns the high score link back to visible
    highScoreBtn.dataset.visibility = "visible";
    highScoreBtn.style.display = "block";
    // toggles the visibility of the scoreboard and timer
    scoreboardAndTimerToggle();
    // question card
    questionCard.dataset.visibility = "hidden";
    questionCard.style.display = "none";
    // form card
    formCard.dataset.visibility = "visible";
    formCard.style.display = "flex";
    // takes the final quiz score and updates the form card
    finalScoreForCard.textContent = gameScore;
    // resets the scoreboard and timer
    updateScore(0);
    updateTimer(0);
}

// initializes the app
init();