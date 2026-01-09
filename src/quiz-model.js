import { fetchQuizQuestions } from './quiz-service';

export class QuizModel {
  constructor() {
    // Holds all structured quiz questions
    this.questions = [];

    // Index of the currently active question
    this.currentIndex = 0;

    // User's current score
    this.score = 0;
  }

  /**
   * Fetches quiz questions from the API
   * and converts them into app-friendly format
   */
  async loadQuestions() {
    const rawData = await fetchQuizQuestions();
    this.questions = this.structureQuizData(rawData);
  }

  /**
   * Transforms raw API response into structured quiz data
   * - Decodes HTML entities
   * - Merges correct and incorrect answers
   * - Randomizes answer order
   */
  structureQuizData(apiResponse) {
    return apiResponse.results.map((q, index) => {
      const answers = [
        { text: q.correct_answer, isCorrect: true },
        ...q.incorrect_answers.map(a => ({
          text: a,
          isCorrect: false
        }))
      ].sort(() => Math.random() - 0.5); // shuffle answers

      return {
        id: index + 1,
        category: q.category,
        difficulty: q.difficulty,
        type: q.type,
        question: this.decodeHTML(q.question),
        answers: answers.map(a => ({
          ...a,
          text: this.decodeHTML(a.text)
        }))
      };
    });
  }

  /**
   * Decodes HTML entities coming from the API
   * Example: &quot; → "
   */
  decodeHTML(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  /**
   * Returns the currently active question
   */
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  /**
   * Submits the user's selected answer
   * @param {number} selectedIndex - index of selected answer
   * @returns {boolean} true if correct, false if wrong
   */
  submitAnswer(selectedIndex) {
    const question = this.getCurrentQuestion();
    const selectedAnswer = question.answers[selectedIndex];

    if (selectedAnswer.isCorrect) {
      this.score++;
      return true;
    }

    return false;
  }

  /**
   * Moves to the next question
   */
  nextQuestion() {
    this.currentIndex++;
  }

  /**
   * Checks whether the quiz has ended
   * @returns {boolean} true if no more questions
   */
  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  /**
   * Returns the index of the correct answer
   * (useful for showing feedback after submission)
   */
  getCorrectAnswerIndex() {
    return this.getCurrentQuestion().answers.findIndex(
      a => a.isCorrect
    );
  }


  /**
   *  Reset the score and currentIndex of Question
   */
  reset() {
    this.currentIndex = 0;
    this.score = 0;
  }
}
