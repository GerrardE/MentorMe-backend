import express from 'express';
import trim from '../../middlewares/trim';
import { verifyToken } from '../../middlewares/Token';
import QuestionController from '../../controllers/questions';
import { questionFinder, questionPermission } from '../../middlewares/questionFinder';

const questionRouter = express.Router();

questionRouter.post('/', verifyToken, trim, QuestionController.create);
questionRouter.get('/', verifyToken, QuestionController.getAll);
questionRouter.get('/:tag', verifyToken, QuestionController.get);
questionRouter.get('/:id/question', verifyToken, QuestionController.getOne);
questionRouter.put('/:id',
  verifyToken, trim, questionFinder, questionPermission, QuestionController.update);
questionRouter.delete('/:id',
  verifyToken, trim, questionFinder, questionPermission, QuestionController.delete);

export default questionRouter;
