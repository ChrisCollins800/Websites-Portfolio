const questionsBank = [
  {
    question: "What is the capital of Ireland?",
    answers: ["New York", "London", "Paris", "Dublin"],
    correct: 3,
    help: "Only one place here is in Ireland."
  },
  {
    question: "What is the largest planet in our Solar System?",
    answers: ["Earth", "Jupiter", "Mars", "Venus"],
    correct: 1,
    help: "Humans dont live there."
  },
  {
    question: "how many counties are in the Republic of Ireland?",
    answers: ["22", "32", "34", "26"],
    correct: 3,
    help: "The Republic of Ireland lost six counties in 1916."
  },
  {
    question: "What is the highest mountain in the world?",
    answers: ["K2", "Kangchenjunga", "Everest", "Lhotse"],
    correct: 2,
    help: "It does not start with a K."
  },
  {
    question: "What language is this quiz written in?",
    answers: ["English", "Italian", "Irish", "Spanish"],
    correct: 2,
    help: "It is the most popular language in the world."
  },
  {
    question: "What year did the Titanic sink?",
    answers: ["1912", "1910", "1914", "1916"],
    correct: 0,
    help: "It was before Irelands war of independance."
  },
  {
    question: "what is the largest country in the world called?",
    answers: ["China", "Russia", "Italy", "Australia"],
    correct: 1,
    help: "It is in Europe."
  },
  {
    question: "Which planet is closest to the sun?",
    answers: ["Mercury", "Venus", "Earth", "Mars"],
    correct: 0,
    help: "It is Known to be red."
  },
  {
    question: "How many continents are there?",
    answers: ["Five", "Six", "Seven", "Eight"],
    correct: 2,
    help: "It is an odd number."
  },
  {
    question: "How many days are in a year?",
    answers: ["364", "396", "342", "365"],
    correct: 3,
    help: "there are 52 weeks and 1 day in a year."
  }
];


const shuffledQuestions = questionsBank.sort(() => 0.5 - Math.random()).slice(0, 5);
let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const questionElement = document.getElementById('question');
  const answersListElement = document.getElementById('answer-list');

  questionElement.textContent = currentQuestion.question;


  if (currentQuestion.help) {
    questionElement.onmouseover = (event) => showToolTip(currentQuestion.help, event);
    questionElement.onmouseout = hideToolTip;
  }

  answersListElement.innerHTML = '';

  currentQuestion.answers.forEach((answer, index) => {
    const answerElement = document.createElement('li');
    answerElement.textContent = answer;


    answerElement.addEventListener('click', () => selectAnswer(index, currentQuestion.correct));
    answersListElement.appendChild(answerElement);
  });

  updateProgressBar();
}

function showToolTip(help, event) {
  const toolTip = document.getElementById("tooltip");
  toolTip.style.display = "block";
  toolTip.innerHTML = help;
  toolTip.style.left = (event.pageX + 15) + 'px';
  toolTip.style.top = (event.pageY + 5) + 'px'; 
}

function hideToolTip() {
  const toolTip = document.getElementById("tooltip");
  toolTip.style.display = "none";
}

function selectAnswer(selectedIndex) {
  const answersListElement = document.getElementById('answer-list');
  Array.from(answersListElement.children).forEach((answerElement, index) => {
    answerElement.classList.remove('selected');
    if (index === selectedIndex) {
      answerElement.classList.add('selected');
    }
  });
 
  shuffledQuestions[currentQuestionIndex].selected = selectedIndex;
}

function updateProgressBar() {
  const progressElement = document.getElementById('progress');
  progressElement.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;
  progressElement.textContent = `${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
}

function nextQuestion() {
  if (shuffledQuestions[currentQuestionIndex].hasOwnProperty('selected')) {
    if (shuffledQuestions[currentQuestionIndex].selected === shuffledQuestions[currentQuestionIndex].correct) {
      score++;
    }

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
      finishQuiz(); 
    } else {
      currentQuestionIndex++;
      displayQuestion();
      
      if (currentQuestionIndex === shuffledQuestions.length - 1) {
        document.getElementById('next-btn').textContent = 'Finish';
      }
    }
  } else {
    alert('Please select an answer.');
  }
}


function finishQuiz() {
  localStorage.setItem('quizScore', score);
  localStorage.setItem('quizAnswers', JSON.stringify(shuffledQuestions));
  window.location.href = 'summary.html';
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);

displayQuestion();
