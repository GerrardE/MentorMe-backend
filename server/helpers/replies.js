import models from '../models';

const { Reply } = models;

const replies = async (value) => {
  const payload = await Reply.findAll({
    attributes: ['id', 'createdAt', 'updatedAt', 'body'],
    where: {
      questionId: value
    },
    order: ['createdAt'],
    include: [{
      model: models.User,
      as: 'user_reply',
      attributes: ['fullName']
    }]
  });

  return payload;
};

export default replies;
