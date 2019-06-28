import express from 'express';
import trim from '../../middlewares/trim';
import { verifyToken } from '../../middlewares/Token';
import ProfileController from '../../controllers/profiles';

const profileRouter = express.Router();

profileRouter.get('/:userId', verifyToken, ProfileController.getProfile);
profileRouter.put('/update', verifyToken, trim, ProfileController.updateProfile);

export default profileRouter;
