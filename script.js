let startContainer = document.querySelector(".start-container");
let questionContainer = document.querySelector(".question-container");
let startButton = document.querySelector(".start-button");
let resultElement = document.querySelector(".result");
let timerElement = document.querySelector(".timer");

let correctAnswers = 0;
let totalAnswers = 0;
let timeLeft = 20;

function randint(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let znakArr = ["+", "-", "*", "/"];

function getRandomZnak() {
  return znakArr[randint(0, 3)];
}

// Перемішування масиву
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class Question {
  constructor() {
    let num1 = randint(1, 30);
    let num2 = randint(1, 30);
    let znak = getRandomZnak();

    if (znak === "+") {
      this.correctAnswer = num1 + num2;
    } else if (znak === "-") {
      this.correctAnswer = num1 - num2;
    } else if (znak === "*") {
      this.correctAnswer = num1 * num2;
    } else {
      this.correctAnswer = parseFloat((num1 / num2).toFixed(2));
    }

    this.question = `${num1} ${znak} ${num2}`;

    let wrong1 = randint(this.correctAnswer - 15, this.correctAnswer - 1);
    let wrong2 = randint(this.correctAnswer + 1, this.correctAnswer + 15);
    let wrong3 = randint(this.correctAnswer - 10, this.correctAnswer - 5);
    let wrong4 = randint(this.correctAnswer + 5, this.correctAnswer + 10);

    this.answers = shuffle([this.correctAnswer, wrong1, wrong2, wrong3, wrong4]);
  }

  display() {
    document.querySelector(".question").innerHTML = this.question;
    let answerElements = document.querySelectorAll(".answer");
    for (let i = 0; i < answerElements.length; i++) {
      answerElements[i].innerHTML = this.answers[i];
      answerElements[i].classList.remove("correct", "wrong"); // Скидання класів
    }
  }
}

let currentQuestion;

function loadNextQuestion() {
  currentQuestion = new Question();
  currentQuestion.display();
}

let answers = document.querySelectorAll(".answer");
answers.forEach((el) => {
  el.addEventListener("click", function () {
    totalAnswers++;
    let selectedAnswer = parseFloat(this.innerHTML);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      this.classList.add("correct");
      correctAnswers++;
    } else {
      this.classList.add("wrong");
    }

    setTimeout(() => {
      loadNextQuestion();
    }, 500);
  });
});

function startTimer() {
  timeLeft = 20; 
  timerElement.textContent = timeLeft; 
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval); 
      endGame(); 
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval); // Зупинка таймера
  timerElement.textContent = ''; // Очищення тексту таймера

  let accuracy = Math.round((correctAnswers * 100) / totalAnswers) || 0;
  alert(`Правильно: ${correctAnswers}\nУсього: ${totalAnswers}\nТочність: ${accuracy}%`);

  // Виведення статистики
  resultElement.innerHTML = `
    <p>Ви дали ${correctAnswers} правильних відповідей із ${totalAnswers}.</p>
    <p>Точність: ${accuracy}%</p>
  `;

  // Повертаємо до початкового екрану
  questionContainer.style.display = "none";
  startContainer.style.display = "block";
}

startButton.addEventListener("click", function () {
  startContainer.style.display = "none";
  questionContainer.style.display = "block"; // Відображаємо питання
  correctAnswers = 0;
  totalAnswers = 0;
  loadNextQuestion(); 
  startTimer();
});

function createStar(){
    const star= document.createElement("div");
    star.classList.add("star");

    star.style.left=Math.random() * 100 + "vw";
    star.style.width= star.style.height= Math.random() * 5 + 5 + "px"
    star.style.animationDuration= Math.random() * 3 + 2 + "s";


    document.querySelector(".stars").appendChild(star);


    setTimeout(() => {
        star.remove();
    }, 5000);
}

setInterval(createStar, 300);
