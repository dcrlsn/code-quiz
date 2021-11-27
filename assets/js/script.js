var titleCard = document.querySelector("#title");
var lbCard = document.querySelector("#leaderboard");
var quizCard = document.querySelector("#quiz");
var scoreCard = document.querySelector("#score");

var startQuizBtn = document.querySelector("#start");
var lbBtn = document.querySelector("#highscore");
var goBackBtn = document.querySelector("#goback");
var timer = document.querySelector("#timer h2");
var scoreTitle = document.querySelector("#score h2");
var scoreAmt = document.querySelector("#score h1");

var quizQues = document.querySelector("#quiz h2");
var quizBtn = document.querySelectorAll("#quiz button");

var quizObject = [
  {
    question: "AAAAAAAAAA",
    answers: [
      "one",
      "two",
      "three",
      "four"
    ],
    correct: "b"
  },
  {
    question: "BBBBB",
    answers: [
      "one",
      "two",
      "three",
      "four"
    ],
    correct: "c"
  },
  {
    question: "CCCC",
    answers: [
      "one",
      "two",
      "three",
      "four"
    ],
    correct: "d"
  },
  {
    question: "AAAAAADDADDDAAA",
    answers: [
      "one",
      "two",
      "three",
      "four"
    ],
    correct: "a"
  }
];

var curQuizObject = [];
var removed = [];
var score = 0;
var timeLeft = 30;

function showTitle() {
  titleCard.setAttribute("style", "display: block;");
  lbCard.setAttribute("style", "display: none;");
  quizCard.setAttribute("style", "display: none;");
  timer.setAttribute("style", "display: none;");
  scoreCard.setAttribute("style", "display: none;");
}

function showLb() {
  titleCard.setAttribute("style", "display: none;");
  lbCard.setAttribute("style", "display: block;");
  quizCard.setAttribute("style", "display: none;");
  timer.setAttribute("style", "display: none;");
  scoreCard.setAttribute("style", "display:none;");
}

function showScore() {
  titleCard.setAttribute("style", "display: none;");
  lbCard.setAttribute("style", "display: none;");
  quizCard.setAttribute("style", "display: none;");
  timer.setAttribute("style", "display: none;");
  scoreCard.setAttribute("style", "display: block;");
  scoreTitle.textContent = "Congratulations! You scored"
  scoreAmt.textContent = `${score} points!`
}

function showQuiz() {
  titleCard.setAttribute("style", "display: none;");
  lbCard.setAttribute("style", "display: none;");
  quizCard.setAttribute("style", "display: block;");
  timer.setAttribute("style", "display:block;");
  scoreCard.setAttribute("style", "display:none;");
  timer.textContent = `${timeLeft} seconds remaining.`;
  curQuizObject = [...quizObject];
  quizText()
}

function setTime() {
  var interval = setInterval(function () {
    timeLeft--;
    var seconds = "";
    if (timeLeft === 1) {
      seconds = "second";
    } else seconds = "seconds";
    timer.textContent = `${timeLeft} ${seconds} remaining`;

    if (timeLeft === 0) {
      clearInterval(interval);
      showScore();
      timeLeft = 30;
    }

    if (curQuizObject.length === 0 && quizCard.getAttribute("style") === "display: none;") {
      clearInterval(interval);
      timeLeft = 30;
    }

  }, 1000)
}

function quizText() {
  var x = (Math.floor(Math.random() * curQuizObject.length));
  quizQues.textContent = curQuizObject[x].question;
  for (i = 0; i < curQuizObject[x].answers.length; i++) {
    var answer = curQuizObject[x].answers[i];
    quizBtn[i].textContent = answer;
  }
  removed = curQuizObject.splice(x, 1);
}

function quizScore() {
  console.log(this);
  if (this.dataset.id == removed[0].correct) { score = score + Math.floor(timeLeft * .5); } else { timeLeft = timeLeft - 5; };
  if (curQuizObject.length > 0) {
    quizText();
  } else showScore();
}

function startQuiz() {
  showQuiz();
  setTime();
}

//Event Listeners
startQuizBtn.addEventListener("click", startQuiz)
lbBtn.addEventListener("click", showLb)
goBackBtn.addEventListener("click", showTitle)
for (i = 0; i < quizBtn.length; i++) {
  quizBtn[i].addEventListener("click", quizScore);
}