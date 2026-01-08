export class QuizController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindStart(this.handleStart.bind(this));
  }

  async init() {
    try {
      await this.model.loadQuestions();
      console.log(this.model.getCurrentQuestion());
      this.view.renderQuestion(this.model.getCurrentQuestion());
    } catch (err) {
      alert(err);
    }
  }


  handleStart() {
    this.view.welcomeSection.classList.add('section--exit');
    this.view.questionSection.classList.remove('section--hidden');
  }

  handleSubmit() {
    const selectedIndex = this.view.getSelectedAnswerIndex();

    if (selectedIndex === null) {
      alert('please select and answer!');
      return;
    }

    const isCorrect = this.model.submitAnswer(selectedIndex);

    this.view.showAnswerResult(isCorrect);
    this.view.disableAnswers();
  }

}
