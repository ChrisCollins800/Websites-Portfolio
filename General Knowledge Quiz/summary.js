function displaySummaryInNewWindow() {
    const quizScore = localStorage.getItem('quizScore');
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
  
    if (!quizAnswers || quizScore === null) {
      alert('No quiz data found.');
      return;
    }
    
    const grade = (quizScore / quizAnswers.length) * 100;


    const summaryContainer = document.createElement('div');
summaryContainer.id = 'summary-modal';
document.body.appendChild(summaryContainer);


    const gradeElement = document.createElement('h2');
    gradeElement.textContent = `Your Grade: ${grade}%`;
    summaryContainer.appendChild(gradeElement);
 
    quizAnswers.forEach((question, index) => {
      const questionWrapper = document.createElement('div');
      const questionElement = document.createElement('p');
      questionElement.innerHTML = `<strong>Question ${index + 1}: ${question.question}</strong>`;
  
      const userAnswer = question.answers[question.selected];
      const correctAnswer = question.answers[question.correct];
  
      const answerElement = document.createElement('p');
      answerElement.innerHTML = `Your answer: ${userAnswer} <br> Correct answer: ${correctAnswer}`;
      answerElement.style.color = question.selected === question.correct ? 'green' : 'red';
  
      questionWrapper.appendChild(questionElement);
      questionWrapper.appendChild(answerElement);
      summaryContainer.appendChild(questionWrapper);
    });
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
      summaryContainer.style.display = 'none';
    };
    summaryContainer.appendChild(closeButton);
  }
  
  displaySummaryInNewWindow();

  