import { fetchQuizQuestions } from './quiz-service';

export class QuizModel {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
  }

  async loadQuestions() {
    const rawData = await fetchQuizQuestions();
    this.questions = this.structureQuizData(rawData);
  }

  structureQuizData(apiResponse) {
    return apiResponse.results.map((q, index) => {
      const answers = [
        { text: q.correct_answer, isCorrect: true },
        ...q.incorrect_answers.map(a => ({
          text: a,
          isCorrect: false
        }))
      ].sort(() => Math.random() - 0.5);

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

  decodeHTML(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }
}
