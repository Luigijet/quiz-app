import { QuizController } from './quiz-controller';
import { QuizModel } from './quiz-model';
import { QuizView } from './quiz-view';

const model = new QuizModel();
const view = new QuizView();
const controller = new QuizController(model, view);

controller.init();