export class QuizView {
  constructor() {
    // Start quiz button
    this.startBtn = document.querySelector('#start');

    // Welcome screen section
    this.welcomeSection = document.querySelector('#welcome-section');

    // Question screen section
    this.questionSection = document.querySelector('#question-section');

    // Container where questions + answers are rendered
    this.questionContainer = document.querySelector('#question-container');

    // Submit answer button
    this.submitBtn = document.querySelector('#submit');

    // Next question button
    this.nextBtn = document.querySelector('#next');

    // Message area (errors, hints, feedback)
    this.messageEl = document.querySelector('#message');

    // Score screen section
    this.scoreSection = document.querySelector('#score-section');

    // Container where score is rendered
    this.scoreContainer = document.querySelector('#score-container');

    // Reset button
    this.resetBtn = document.querySelector('#reset');

    // Question Index
    this.questionIndex = document.getElementById('questionIndex');
  }

  /**
   * Renders a quiz question and its possible answers
   * @param {Object} question - current question object
   */
  renderQuestion(question) {
    // Clear previous question content
    this.questionContainer.innerHTML = '';

    // Build answer options HTML
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

    // Final markup for question + answers
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

    // Insert into DOM
    this.questionContainer.insertAdjacentHTML('afterbegin', HTML);
  }

  /**
  * Renders a quiz question and its possible answers
  * @param {index} questionIndex - current question index
  * @param {length} questionLength - current question index
  */
  renderQuestionIndex(index, length) {
    this.questionIndex.innerHTML = '';

    this.questionIndex.innerHTML = `${index}/${length}`;
  }

  /**
   * Returns the index of the selected answer
   * @returns {number|null}
   */
  getSelectedAnswerIndex() {
    const selected = document.querySelector(
      'input[name="answer"]:checked'
    );
    return selected ? Number(selected.value) : null;
  }

  /**
   * Shows correct and wrong answers visually
   * @param {number} selectedIndex - user's selected answer index
   * @param {number} correctIndex - correct answer index
   */
  showAnswerResult(selectedIndex, correctIndex) {
    const answers = document.querySelectorAll(
      'input[name="answer"]'
    );

    answers.forEach(input => {
      const index = Number(input.value);
      const label = input.closest('label');

      // Highlight correct answer
      if (index === correctIndex) {
        label.classList.add('correct');
      }
      // Highlight wrong selected answer
      else if (index === selectedIndex) {
        label.classList.add('wrong');
      }

      // Prevent further changes
      input.disabled = true;
    });

    // Enable "Next" button after answering
    this.nextBtn.disabled = false;
  }

  /**
   * Disables all answer inputs
   * (useful after submission)
   */
  disableAnswers() {
    document
      .querySelectorAll('input[name="answer"]')
      .forEach(input => (input.disabled = true));
  }

  /**
   * Binds submit button click to controller logic
   * @param {Function} handler
   */
  bindSubmit(handler) {
    this.submitBtn.addEventListener('click', handler);
  }

  /**
   * Binds next button click to controller logic
   * @param {Function} handler
   */
  bindNext(handler) {
    this.nextBtn.addEventListener('click', handler);
  }

  /**
   * Binds start button click to controller logic
   * @param {Function} handler
   */
  bindStart(handler) {
    this.startBtn.addEventListener('click', handler);
  }

  /**
  * Binds start button click to controller logic
  * @param {Function} handler
  */
  bindReset(handler) {
    this.resetBtn.addEventListener('click', handler);
  }

  /**
   * Displays final score screen
   * @param {number} score
   */
  renderFinalScore(score) {
    // Reset content
    this.scoreContainer.innerHTML = '';

    // Markup for player score
    const HTML = `
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="font-medium text-2xl text-center">
          Your score 🎉
        </h1>

        <p class="font-bold text-7xl text-center text-primary">
          ${score}
        </p>
      </div>
    `;

    this.questionSection.classList.add(
      'section--exit'
    );

    this.scoreSection.classList.remove(
      'section--hidden'
    );
    // Insert into DOM
    this.scoreContainer.insertAdjacentHTML('afterbegin', HTML);
  }

  /**
   * Displays a message to the user
   * @param {string} msg
   */
  showMessage(msg) {
    this.messageEl.textContent = msg;
  }
}
