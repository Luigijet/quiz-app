export class QuizController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind UI events to controller logic
    this.view.bindStart(this.handleStart.bind(this));
    this.view.bindSubmit(this.handleSubmit.bind(this));
    this.view.bindNext(this.handleNext.bind(this));
    this.view.bindReset(this.handleReset.bind(this));
  }

  /**
   * Initializes the quiz:
   * - Loads questions
   * - Renders first question
   * - Shows welcome screen
   */
  async init() {
    try {
      await this.model.loadQuestions();

      this.view.renderQuestion(
        this.model.getCurrentQuestion()
      );

      this.view.renderQuestionIndex(this.model.currentIndex + 1, this.model.questions.length);

      // Small delay for UI animation
      await new Promise(r => setTimeout(r, 200));

      this.view.welcomeSection.classList.remove(
        'section--hidden'
      );
    } catch (err) {
      alert(err);
    }
  }

  /**
   * Handles quiz start button
   */
  handleStart() {
    this.view.welcomeSection.classList.add(
      'section--exit'
    );
    this.view.questionSection.classList.remove(
      'section--hidden'
    );
  }

  /**
   * Handles answer submission
   */
  handleSubmit() {
    const selectedIndex =
      this.view.getSelectedAnswerIndex();

    if (selectedIndex === null) {
      this.view.showMessage('Please select an answer');
      return;
    }

    this.model.submitAnswer(selectedIndex);

    const correctIndex =
      this.model.getCorrectAnswerIndex();

    // Update UI feedback
    this.view.showAnswerResult(
      selectedIndex,
      correctIndex
    );

    // Toggle buttons
    this.view.submitBtn.classList.add('hidden');
    this.view.nextBtn.classList.remove('hidden');
  }

  /**
   * Handles next question logic
   * Uses isFinished() to decide quiz end
   */
  handleNext() {
    // Move to next question
    this.model.nextQuestion();

    if (this.model.isFinished()) {
      this.view.renderFinalScore(this.model.score);
      return;
    }

    // Render next question
    this.view.renderQuestion(
      this.model.getCurrentQuestion()
    );

    // Render question index
    this.view.renderQuestionIndex(this.model.currentIndex + 1, this.model.questions.length);

    // Reset buttons
    this.view.submitBtn.classList.remove('hidden');
    this.view.nextBtn.classList.add('hidden');
  }

  /**
  * Handles quiz reset
  */
  async handleReset() {
    // Reset model state
    this.model.reset();

    //  reload questions for a fresh quiz
    await this.model.loadQuestions();

    // Reset UI
    this.view.submitBtn.classList.remove('hidden');
    this.view.nextBtn.classList.add('hidden');

    this.view.scoreSection.classList.add('section--exit');

    // Show welcome screen again
    this.view.questionSection.classList.add('section--hidden');
    this.view.welcomeSection.classList.add('section--hidden');
    this.view.scoreSection.classList.add('section--hidden');

    this.view.questionSection.classList.remove('section--exit');
    this.view.welcomeSection.classList.remove('section--exit');
    this.view.scoreSection.classList.remove('section--exit');


    // Small delay for UI animation
    await new Promise(r => setTimeout(r, 200));

    this.view.welcomeSection.classList.remove(
      'section--hidden'
    );

    // Render first question
    this.view.renderQuestion(
      this.model.getCurrentQuestion()
    );
  }
}
