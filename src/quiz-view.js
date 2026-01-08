export class QuizView {
  constructor() {
    this.startBtn = document.querySelector('#start');
    this.welcomeSection = document.querySelector('#welcome-section');
    this.questionSection = document.querySelector('#question-section');
    this.questionContainer = document.querySelector('#question-container');
    this.answersEl = document.querySelector('#answers');
    this.submitBtn = document.querySelector('#submit');
    this.nextBtn = document.querySelector('#next');
    this.messageEl = document.querySelector('#message');
  }

  renderQuestion(question) {
    // Reset UI
    this.questionContainer.innerHTML = '';

    const answersHTML = question.answers
      .map(
        (ans, index) => `
          <label class="answer" data-index="${index}">
            <input
              type="radio"
              name="answer"
              id="answer-${index}"
              value="${index}"
            />
  
            <svg class="unchecked" viewBox="0 -0.5 25 25">
              <path d="m24 24h-24v-24h24.8v24zm-1.6-2.4v-19.2h-20v19.2z"></path>
            </svg>
  
            <svg class="check" viewBox="0 -1.5 27 27">
              <path d="m24 24h-24v-24h18.4v2.4h-16v19.2h20v-8.8h2.4v11.2zm-19.52-12.42 1.807-1.807 5.422 5.422 13.68-13.68 1.811 1.803-15.491 15.491z"></path>
            </svg>
  
            <span class="text">${ans.text}</span>
          </label>
        `
      )
      .join('');

    const HTML = `
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="font-medium text-2xl text-center">
          ${question.question}
        </h1>
  
        <div id="answers" class="w-full">
          ${answersHTML}
        </div>
      </div>
    `;

    this.questionContainer.insertAdjacentHTML('afterbegin', HTML);
  }


  getSelectedAnswerIndex() {
    const selected = document.querySelector(
      'input[name="answer"]:checked'
    );
    return selected ? Number(selected.value) : null;
  }

  showAnswerResult(isCorrect) {
    this.messageEl.textContent = isCorrect
      ? '✅ Correct!'
      : '❌ Wrong answer';

    this.nextBtn.disabled = false;
  }

  disableAnswers() {
    document
      .querySelectorAll('input[name="answer"]')
      .forEach(input => (input.disabled = true));
  }

  bindSubmit(handler) {
    this.submitBtn.addEventListener('click', handler);
  }

  bindNext(handler) {
    this.nextBtn.addEventListener('click', handler);
  }

  bindStart(handler) {
    this.startBtn.addEventListener('click', handler);
  }

  renderFinalScore(score) {
    document.querySelector('#quiz').innerHTML = `
        <h2>Your Score</h2>
        <p>${score}</p>
      `;
  }

  showMessage(msg) {
    this.messageEl.textContent = msg;
  }
}
