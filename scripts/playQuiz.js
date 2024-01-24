// Quiz data with 7 questions
const quizData = [
  { question: "Happy", options: ["😊", "😢", "😡", "😴"], correctAnswer: "😊" },
  { question: "Sad", options: ["😊", "😢", "😡", "😴"], correctAnswer: "😢" },
  { question: "Angry", options: ["😊", "😢", "😡", "😴"], correctAnswer: "😡" },
  {
    question: "Sleepy",
    options: ["😊", "😢", "😡", "😴"],
    correctAnswer: "😴",
  },
  {
    question: "Excited",
    options: ["😊", "😢", "😡", "😴"],
    correctAnswer: "😊",
  },
  {
    question: "Confused",
    options: ["😊", "😢", "😡", "😴"],
    correctAnswer: "😢",
  },
  {
    question: "Surprised",
    options: ["😊", "😢", "😡", "😴"],
    correctAnswer: "😲",
  },
];

// Shuffle and select only 4 questions randomly
function getRandomQuestions() {
  const shuffledQuestions = quizData.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, 4);
}

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let timer;

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const startQuizButton = document.getElementById("start-quiz");

// Event listeners
startQuizButton.addEventListener("click", startQuiz);

// Quiz initialization function
function startQuiz() {
  const selectedQuestions = getRandomQuestions();
  currentQuestionIndex = 0;
  score = 0;
  quizData.length = 0; // Clear the original quiz data
  quizData.push(...selectedQuestions); // Replace with selected questions
  showQuestion();
  startTimer();
  startQuizButton.disabled = true;
}

// Display the current question
function showQuestion() {
  const quizQuestionElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("options");
  const currentQuestion = quizData[currentQuestionIndex];

  quizQuestionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.classList.add(
      "bg-gray-300",
      "text-gray-800",
      "py-2",
      "px-4",
      "rounded-md",
      "option-btn"
    );
    optionButton.textContent = option;
    optionButton.addEventListener("click", () =>
      handleAnswer(option, currentQuestion.correctAnswer)
    );
    optionsContainer.appendChild(optionButton);
  });
}

// Handle user's answer
function handleAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score++;
  }
  nextQuestion();
}

// Move to the next question or end the quiz
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Start the timer for the quiz
function startTimer() {
  let timeLeft = 10;
  const timerElement = document.getElementById("timer");
  timer = setInterval(() => {
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    timeLeft--;
    if (timeLeft < 0) {
      endQuiz();
    }
  }, 1000);
}

// End the quiz and display the result
function endQuiz() {
  clearInterval(timer);
  const scoreResultElement = document.getElementById("score-result");
  const quizQuestionElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("options");
  const timerElement = document.getElementById("timer");
  const startQuizButton = document.getElementById("start-quiz");

  scoreResultElement.innerHTML = `
    <p class="text-xl font-semibold mb-4">Quiz Completed!</p>
    <p class="text-lg">Your Score: ${score} / ${quizData.length}</p>
  `;
  quizQuestionElement.textContent = "";
  optionsContainer.innerHTML = "";
  timerElement.textContent = "";
  startQuizButton.disabled = false;
}

// Leave process
let leaveButton;
let leavePopup;

// Event listener for initiating the leave process
startQuizButton.addEventListener("click", startLeaveProcess);

// Start the leave process
function startLeaveProcess() {
  startQuizButton.removeEventListener("click", startQuiz);
  startQuizButton.textContent = "Leave";
  startQuizButton.classList.remove("bg-blue-500", "hover:bg-blue-600");
  startQuizButton.classList.add("bg-red-500", "hover:bg-red-600");
  leaveButton = document.getElementById("start-quiz");
  leaveButton.addEventListener("click", showLeavePopup);
}

// Display leave confirmation popup
function showLeavePopup() {
  leavePopup = confirm(
    "Are you sure you want to leave? Your progress will be lost."
  );
  if (leavePopup) {
    resetQuiz();
    window.location.href = "./game.html";
  }
}

// Reset the quiz to its initial state
function resetQuiz() {
  clearInterval(timer);
  startQuizButton.addEventListener("click", startQuiz);
  startQuizButton.textContent = "Start Quiz";
  startQuizButton.classList.remove("bg-red-500", "hover:bg-red-600");
  startQuizButton.classList.add("bg-blue-500", "hover:bg-blue-600");
  currentQuestionIndex = 0;
  score = 0;
  const scoreResultElement = document.getElementById("score-result");
  scoreResultElement.textContent = "";
}
