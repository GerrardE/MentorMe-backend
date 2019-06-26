import models from '@models';

const { Question, User } = models;

const QuestionFinder = async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findOne({ where: { id } });
  if (!question) {
    return res.status(400).json({
      status: 404,
      errors: 'Question does not exist'
    });
  }

  const questionOwner = await question.getQuestion();
  if (!questionOwner) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.oldQuestion = question;

  next();
};

export default QuestionFinder;
