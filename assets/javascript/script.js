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
var backToStartFromScores = document.querySelector("#back-to-start-button");

var timer = 30; // change game time
var questionCount = 4; // change amount of questions to ask
var secondPenalty = 5; // change wrong answer time penalty

function updateWelcomeCard() {
    questionTotalText.textContent = questionCount;
    timeTotalText.textContent = timer;
    secondPenaltyText.textContent = secondPenalty;
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

function submitScore() {
    var usersFinalScore = finalScoreForCard.textContent;
    var userName = nameInputTF.value;

    var li = document.createElement('li');
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');

    span1.id = "user-name";
    span1.textContent = userName;

    span2.id = "user-score";
    span2.textContent = usersFinalScore;

    li.appendChild(span1);
    li.appendChild(span2);

    document.body.children[5].children[1].appendChild(li);

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
        ["This is a placeholder(#1-C) from the generate question pool.",
        "Cool",
        "Great",
        "It Works!",
        "Crickey its a wolverine!",
        "OH EM GEE",
        "It Works!"], 
        ["This is a placeholder(#2-A) from the generate question pool.",
        "Cool",
        "Great",
        "It Works!",
        "Crickey its a wolverine!",
        "OH EM GEE",
        "Cool"], 
        ["This is a placeholder(#3-B) from the generate question pool.",
        "Cool",
        "Great",
        "It Works!",
        "Crickey its a wolverine!",
        "OH EM GEE",
        "Great"], 
        ["This is a placeholder(#4-E) from the generate question pool.",
        "Cool",
        "Great",
        "It Works!",
        "Crickey its a wolverine!",
        "OH EM GEE",
        "OH EM GEE"], 
        ["This is a placeholder(#5-D) from the generate question pool.",
        "Cool",
        "Great",
        "It Works!",
        "Crickey its a wolverine!",
        "OH EM GEE",
        "Crickey its a wolverine!"], 
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

updateWelcomeCard();