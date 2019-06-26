import express from 'express';
import UserController from '../../controllers/users';
import trim from '../../middlewares/trim';

const router = express.Router();

router.get('/', (request, response) => response.status(200).send('Welcome to the MentorMe API'));

router.post('/auth/signup', trim, UserController.register);

export default router;
