import express from 'express';
import trim from '../../middlewares/trim';
import { verifyToken } from '../../middlewares/Token';
import { questionFinder } from '../../middlewares/questionFinder';
import ReplyController from '../../controllers/reply';

const replyRouter = express.Router();

replyRouter.post('/:id/replies', verifyToken, questionFinder, trim, ReplyController.create);
replyRouter.get('/:id/replies', verifyToken, questionFinder, ReplyController.get);
replyRouter.put('/:id/reply/:replyId', verifyToken, questionFinder, trim, ReplyController.create);
replyRouter.delete('/:id/reply/:replyId', verifyToken, questionFinder, ReplyController.create);

export default replyRouter;
