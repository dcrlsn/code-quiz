var titleCard = document.querySelector("#title")
var lbCard = document.querySelector("#leaderboard")
var quizCard = document.querySelector("#quiz")

var startQuizBtn = document.querySelector("#start")
var lbBtn = document.querySelector("#highscore")
var goBackBtn = document.querySelector("#goback")

var quizQues = document.querySelector("#quiz h2")
var quizBtn = document.querySelectorAll("#quiz button")

var quizObject = [
  {
    question: "AAAAAAAAAA",
    answers: [
      "one",
      "two",
      "three",
      "four"
    ],
    correct: "c"
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
    correct: "c"
  },
  {
    question: "AAAAAADDADDDAAA",
    answers: [
      "one",
      "two",
      "three",
      "four"
    ],
    correct: "c"
  }
]

var curQuizObject = []
var removed = []
var score = 0;
var time = 0;

function showTitle() {
  titleCard.setAttribute("style", "display: block;")
  lbCard.setAttribute("style", "display: none;")
  quizCard.setAttribute("style", "display: none;")
}

function showLb() {
  titleCard.setAttribute("style", "display: none;")
  lbCard.setAttribute("style", "display: block;")
  quizCard.setAttribute("style", "display: none;")
}

function showQuiz() {
  titleCard.setAttribute("style", "display: none;")
  lbCard.setAttribute("style", "display: none;")
  quizCard.setAttribute("style", "display: block;")
  curQuizObject = [...quizObject];
  quizText()
}


function quizText() {
  var x = (Math.floor(Math.random() * curQuizObject.length));
  quizQues.textContent = curQuizObject[x].question;
  for (i = 0; i < curQuizObject[x].answers.length; i++) {
    var answer = curQuizObject[x].answers[i]
    quizBtn[i].textContent = answer;
  }
  removed = curQuizObject.splice(x, 1);
}

function quizScore() {
  console.log(this);
  if (curQuizObject.length > 0) {
    quizText()
  } else showTitle();
  if (this.dataset.id == removed[0].correct) { score++; } else { time--; }

}

function startQuiz() {
  showQuiz()

}





startQuizBtn.addEventListener("click", startQuiz)
lbBtn.addEventListener("click", showLb)
goBackBtn.addEventListener("click", showTitle)
for (i = 0; i < quizBtn.length; i++) {
  quizBtn[i].addEventListener("click", quizScore)
}