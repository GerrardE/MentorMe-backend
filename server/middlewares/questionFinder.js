import models from '@models';

const { Question, User } = models;

const questionFinder = async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findOne({ where: { id } });

  if (!question) {
    return res.status(400).json({
      status: 404,
      errors: 'Question does not exist'
    });
  }
  req.question = question;
  next();
};

const questionPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const question = await Question.findOne({ where: { id, userId } });

  if (!question) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.question = question;
  next();
};

export { questionFinder, questionPermission };
