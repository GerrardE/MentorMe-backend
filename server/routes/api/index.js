import express from 'express';
import UserController from '../../controllers/users';
import trim from '../../middlewares/trim';
import { verifyToken } from '../../middlewares/Token';
import QuestionController from '../../controllers/questions';
import { questionFinder, questionPermission } from '../../middlewares/questionFinder';
import ReplyController from '../../controllers/reply';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send('Welcome to the MentorMe API'));

router.post('/auth/signup', trim, UserController.register);
router.post('/auth/login', trim, UserController.login);

router.post('/questions', verifyToken, trim, QuestionController.create);
router.get('/questions', verifyToken, QuestionController.getAll);
router.get('/questions/:tag', verifyToken, QuestionController.get);
router.put('/questions/:id',
  verifyToken, trim, questionFinder, questionPermission, QuestionController.update);
router.delete('/questions/:id',
  verifyToken, trim, questionFinder, questionPermission, QuestionController.delete);

router.post('/questions/:id/replies', verifyToken, questionFinder, ReplyController.create);
router.get('/questions/:id/replies', verifyToken, questionFinder, ReplyController.get);
router.put('/questions/:id/reply/:replyId', verifyToken, questionFinder, ReplyController.create);
router.delete('/questions/:id/reply/:replyId', verifyToken, questionFinder, ReplyController.create);

export default router;
