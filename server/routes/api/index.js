import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => response.status(200).send('Welcome to the MentorMe API'));

export default apiRouter;