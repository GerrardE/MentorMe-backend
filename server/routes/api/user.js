import express from 'express';
import UserController from '../../controllers/users';
import trim from '../../middlewares/trim';
import { verifyToken } from '../../middlewares/Token';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim, UserController.register);
userRouter.post('/auth/login', trim, UserController.login);
userRouter.get('/users', verifyToken, UserController.getUsers);

export default userRouter;
