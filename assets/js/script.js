var titleCard = document.querySelector("#title");
var lbCard = document.querySelector("#leaderboard");
var quizCard = document.querySelector("#quiz");
var scoreCard = document.querySelector("#score");

var startQuizBtn = document.querySelector("#start");
var lbBtn = document.querySelector("#highscore");
var goBackBtn = document.querySelector(".goback");
var timer = document.querySelector("#timer h2");
var scoreTitle = document.querySelector("#score h2");
var scoreAmt = document.querySelector("#score h1");

var quizQues = document.querySelector("#quiz h2");
var quizBtn = document.querySelectorAll("#quiz button");

var submitBtn = document.querySelector("#submit-btn");
var liEl = document.querySelectorAll("li");

var quizObject = [
  {
    question: "Which of these is not a data type?",
    answers: [
      "boolean",
      "two",
      "string",
      "undefined"
    ],
    correct: "b"
  },
  {
    question: "[1, 2, 3] is an example of a (an)",
    answers: [
      "string",
      "function",
      "array",
      "promise"
    ],
    correct: "c"
  },
  {
    question: "A javascript file has the extension",
    answers: [
      ".java",
      ".html",
      ".xml",
      ".js"
    ],
    correct: "d"
  },
  {
    question: 'What does "undefined + 5" equal',
    answers: [
      "NaN",
      "undefined",
      "5",
      "'undefined5'"
    ],
    correct: "a"
  },
  {
    question: "What is node.js?",
    answers: [
      "a function",
      "a javascript back-end",
      "a javascript front-end",
      "a variable"
    ],
    correct: "b"
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
};

function showLb() {
  titleCard.setAttribute("style", "display: none;");
  lbCard.setAttribute("style", "display: block;");
  quizCard.setAttribute("style", "display: none;");
  timer.setAttribute("style", "display: none;");
  scoreCard.setAttribute("style", "display:none;");
  populateLb();
};

function showScore() {
  titleCard.setAttribute("style", "display: none;");
  lbCard.setAttribute("style", "display: none;");
  quizCard.setAttribute("style", "display: none;");
  timer.setAttribute("style", "display: none;");
  scoreCard.setAttribute("style", "display: block;");
  scoreTitle.textContent = "Congratulations! You scored"
  scoreAmt.textContent = `${score} points!`
};

function showQuiz() {
  titleCard.setAttribute("style", "display: none;");
  lbCard.setAttribute("style", "display: none;");
  quizCard.setAttribute("style", "display: block;");
  timer.setAttribute("style", "display:block;");
  scoreCard.setAttribute("style", "display:none;");
  timer.textContent = `${timeLeft} seconds remaining.`;
  curQuizObject = [...quizObject];
  quizText()
};

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
    };

    if (curQuizObject.length === 0 && quizCard.getAttribute("style") === "display: none;") {
      clearInterval(interval);
      timeLeft = 30;
    };

  }, 1000)
};

function quizText() {
  var x = (Math.floor(Math.random() * curQuizObject.length));
  quizQues.textContent = curQuizObject[x].question;
  for (i = 0; i < curQuizObject[x].answers.length; i++) {
    var answer = curQuizObject[x].answers[i];
    quizBtn[i].textContent = answer;
  }
  removed = curQuizObject.splice(x, 1);
};

function quizScore() {
  console.log(this);
  if (this.dataset.id == removed[0].correct) { score = score + Math.floor(timeLeft * .5); } else { timeLeft = timeLeft - 5; };
  if (curQuizObject.length > 0) {
    quizText();
  } else showScore();
};

function saveScore() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var initials = document.querySelector("#initials-input")
  var highScore = {
    initials: initials.value,
    score: score
  };
  highScores.push(highScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  initials.value = ""
  score = 0
};

function populateLb() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
  if (highScores.length > 5) {
    highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    highScores.length = 5
    localStorage.clear();
    localStorage.setItem("highScores", JSON.stringify(highScores))
  } else localStorage.setItem("highScores", JSON.stringify(highScores));
  for (i = 0; i < highScores.length; i++) {
    liEl[i].textContent = `${highScores[i].initials} - ${highScores[i].score}`
  }
};

function startQuiz() {
  showQuiz();
  setTime();
};

//Event Listeners
startQuizBtn.addEventListener("click", startQuiz);
lbBtn.addEventListener("click", showLb);
goBackBtn.addEventListener("click", showTitle);
for (i = 0; i < quizBtn.length; i++) {
  quizBtn[i].addEventListener("click", quizScore);
}
submitBtn.addEventListener("click", function (event) {
  var initials = document.querySelector("#initials-input")
  event.preventDefault();
  if (initials.value) {
    saveScore();
    showLb();
  }
});