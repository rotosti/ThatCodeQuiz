var highScoreBtn = document.querySelector('#high-score-link');

var topRightBox = document.querySelector('#right-box');
var timeLeftSpan = document.querySelector('#time-left');
var scoreSpan = document.querySelector('#score');

var welcomeCard = document.querySelector('#welcome-card');
var questionTotalText = document.querySelector('#total-questions');
var timeTotalText = document.querySelector('#total-time');
var secondPenaltyText = document.querySelector('#second-penalty');
var gameStartBtn = document.querySelector('#begin-button');

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

var formCard = document.querySelector('#form-card');
var finalScoreForCard = document.querySelector('#final-score');
var nameInputTF = document.querySelector('#name-input');
var backToStartFromForm = document.querySelector('#back-to-start-button-from-form');
var submitToScoreboard = document.querySelector('#submit-to-scoreboard');

var highScoresCard = document.querySelector('#high-scores-card');
var clearScoresBtn = document.querySelector('#clear-scores-button');
var backToStartFromScores = document.querySelector("#back-to-start-button");

var timer = 45; // change game time
var questionCount = 10; // change amount of questions to ask
var secondPenalty = 5; // change wrong answer time penalty
var highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];

function init() {
    questionTotalText.textContent = questionCount;
    timeTotalText.textContent = timer;
    secondPenaltyText.textContent = secondPenalty;
    updateHighScores();
}

highScoreBtn.addEventListener("click", showHighScores);

function showHighScores() {
    highScoreBtn.dataset.visibility = "hidden";
    highScoreBtn.style.display = "none";
    welcomeCard.dataset.visibility = "hidden";
    welcomeCard.style.display = "none";
    highScoresCard.dataset.visibility = "visible";
    highScoresCard.style.display = "flex";
}

// update high scores
function updateHighScores() {

    document.body.children[5].children[1].innerHTML="";

    highScoreList = highScoreList.sort(function(a,b) {
        return(b[1]-a[1]);
    });

    localStorage.setItem("highScores", JSON.stringify(highScoreList));
    
    for (var i = 0; i < highScoreList.length; i++) {

        var li = document.createElement('li');
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');

        span1.id = "user-name";
        span1.textContent = highScoreList[i][0];

        span2.id = "user-score";
        span2.textContent = highScoreList[i][1];

        li.appendChild(span1);
        li.appendChild(span2);

        document.body.children[5].children[1].appendChild(li);
    }
}

clearScoresBtn.addEventListener("click", clearHighScores);
// clear high scores
function clearHighScores() {

    document.body.children[5].children[1].innerHTML="";
    highScoreList = [];
    localStorage.setItem("highScores", JSON.stringify(highScoreList));

}


backToStartFromScores.addEventListener("click", returnFromScores);

function returnFromScores() {
    highScoresCard.dataset.visibility = "hidden";
    highScoresCard.style.display = "none";
    highScoreBtn.dataset.visibility = "visible";
    highScoreBtn.style.display = "block";
    welcomeCard.dataset.visibility = "visible";
    welcomeCard.style.display = "flex";
}

gameStartBtn.addEventListener("click", startGame);

function returnFromScoreForm() {
    formCard.dataset.visibility = "hidden";
    formCard.style.display = "none";

    welcomeCard.dataset.visibility = "visible";
    welcomeCard.style.display = "flex";

}

backToStartFromForm.addEventListener("click", returnFromScoreForm);

// work here
function submitScore() {
    var usersFinalScore = finalScoreForCard.textContent;
    var userName = nameInputTF.value;

    highScoreList.push([userName, usersFinalScore]);
    updateHighScores();

    formCard.dataset.visibility = "hidden";
    formCard.style.display = "none";

    highScoresCard.dataset.visibility = "visible";
    highScoresCard.style.display = "flex";

    nameInputTF.value = "";
}

submitToScoreboard.addEventListener("click", submitScore);

function startGame() {
    // START GAME INITIALIZATION
    var questionPool = generateQuestionPool();
    scoreboardAndTimerToggle();

    welcomeCard.dataset.visibility = "hidden";
    welcomeCard.style.display = "none";

    questionCard.dataset.visibility = "visible";
    questionCard.style.display = "flex";

    answerButtonA.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonB.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonC.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonD.addEventListener("click", verifyAnswerToNextQuestion);
    answerButtonE.addEventListener("click", verifyAnswerToNextQuestion);

    updateTimer(timer);
    
    var currentGameTimer = timer;
    var traversedQuestionCount = 0;
    var userScore = 0;

    updateQuestion();

    // END INITIALIZATION

    // WORKS BUT NEED TO GET EVENT LISTENER HANDLED
    var timeInterval = setInterval(function() {
        currentGameTimer--;
        updateTimer(currentGameTimer);
    
        if(currentGameTimer <= 0 || traversedQuestionCount === (questionCount)) {
          console.log(gameOver);
          clearInterval(timeInterval);

          answerButtonA.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonB.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonC.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonD.removeEventListener("click", verifyAnswerToNextQuestion);
          answerButtonE.removeEventListener("click", verifyAnswerToNextQuestion);

          gameOver(userScore);
        }
    
    }, 1000);

    function verifyAnswerToNextQuestion(event) {

        var wrongOrRightTimer = 1;

        if (event.target.dataset.value === questionPool[traversedQuestionCount][6]) {

            correctOrWrongText.style.color = "green";
            correctOrWrongText.innerHTML = "CORRECT";
            correctOrWrongText.style.display = "block";

            userScore += 5;
            updateScore(userScore);

            traversedQuestionCount++;

            var timeInterval = setInterval(function() {
                
                wrongOrRightTimer--;
                
                if(wrongOrRightTimer === 0) {
                    clearInterval(timeInterval);
                    correctOrWrongText.style.display = "none";

                    if (traversedQuestionCount < questionPool.length) {
                        updateQuestion();
                    }
                }
            }, 700);

        } else {

            correctOrWrongText.style.color = "red";
            correctOrWrongText.innerHTML = "WRONG";
            correctOrWrongText.style.display = "block";

            currentGameTimer -= secondPenalty;
            updateTimer(currentGameTimer);

            traversedQuestionCount++;
        
            var timeInterval = setInterval(function() {
                
                wrongOrRightTimer--;

                if(wrongOrRightTimer === 0) {
                    clearInterval(timeInterval);
                    correctOrWrongText.style.display = "none";

                    if (traversedQuestionCount < questionPool.length) {
                        updateQuestion();
                    }
                }
            }, 700);
        }
    }

    function updateQuestion() {
        questionText.textContent = questionPool[traversedQuestionCount][0];

        questionChoice1.textContent = questionPool[traversedQuestionCount][1];
        questionChoice1.dataset.value = questionPool[traversedQuestionCount][1];
        answerButtonA.dataset.value = questionPool[traversedQuestionCount][1];

        questionChoice2.textContent = questionPool[traversedQuestionCount][2];
        questionChoice2.dataset.value = questionPool[traversedQuestionCount][2];
        answerButtonB.dataset.value = questionPool[traversedQuestionCount][2];

        questionChoice3.textContent = questionPool[traversedQuestionCount][3];
        questionChoice3.dataset.value = questionPool[traversedQuestionCount][3];
        answerButtonC.dataset.value = questionPool[traversedQuestionCount][3];
        
        questionChoice4.textContent = questionPool[traversedQuestionCount][4];
        questionChoice4.dataset.value = questionPool[traversedQuestionCount][4];
        answerButtonD.dataset.value = questionPool[traversedQuestionCount][4];
        
        questionChoice5.textContent = questionPool[traversedQuestionCount][5];
        questionChoice5.dataset.value = questionPool[traversedQuestionCount][5];
        answerButtonE.dataset.value = questionPool[traversedQuestionCount][5];
    }
}

function generateQuestionPool() {
    var questionsToSendBack = [];
    var questionBank = [
        ["A Javascript variable is declared with which of the following keywords?",
        "var",
        "true",
        "span",
        "function",
        "rubberDucky",
        "var"], 
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
        "\\\\",
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

    for (var i = 0; i < questionCount; i++) {
        var questionBankIndex = Math.floor(Math.random() * questionBank.length);
        
        if (questionsToSendBack.includes(questionBank[questionBankIndex])) {
            i--;
        } else {
            questionsToSendBack.push(questionBank[questionBankIndex]);
        }
    }

    return questionsToSendBack;
}

function scoreboardAndTimerToggle() {

    if (topRightBox.dataset.visibility === "hidden") {
        topRightBox.dataset.visibility = "visible";
        topRightBox.style.display = "block";
    } else {
        topRightBox.dataset.visibility = "hidden";
        topRightBox.style.display = "none";
    }
}

function updateTimer(time) {
    timeLeftSpan.textContent = time;
}

function updateScore(score) {
    scoreSpan.textContent = score;
}

function gameOver(gameScore){
    scoreboardAndTimerToggle();

    questionCard.dataset.visibility = "hidden";
    questionCard.style.display = "none";

    formCard.dataset.visibility = "visible";
    formCard.style.display = "flex";
    finalScoreForCard.textContent = gameScore;

    updateScore(0);
    updateTimer(0);
}

init();