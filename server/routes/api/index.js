import express from 'express';
import profileRouter from './profile';
import questionRouter from './question';
import userRouter from './user';
import replyRouter from './reply';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.status(200).send('Welcome to the MentorMe API'));

apiRouter.use('/profiles', profileRouter);
apiRouter.use('/questions', questionRouter);
apiRouter.use('/', userRouter);
apiRouter.use('/questions', replyRouter);

export default apiRouter;
