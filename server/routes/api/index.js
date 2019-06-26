import express from 'express';
import UserController from '../../controllers/users';
import trim from '../../middlewares/trim';
import { verifyToken } from '../../middlewares/Token';
import QuestionController from '../../controllers/questions';
import QuestionFinder from '../../middlewares/questionFinder';

const router = express.Router();

router.get('/', (request, response) => response.status(200).send('Welcome to the MentorMe API'));

router.post('/auth/signup', trim, UserController.register);
router.post('/auth/login', trim, UserController.login);
router.post('/questions', verifyToken, trim, QuestionController.create);
router.put('/questions/:id', verifyToken, trim, QuestionFinder, QuestionController.update);
router.delete('/questions/:id', verifyToken, trim, QuestionFinder, QuestionController.delete);
router.get('/questions/:tag', verifyToken, QuestionController.get);

export default router;
