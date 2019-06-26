import models from '@models';
import faker from 'faker';

const { Question } = models;

const createTestQuestion = async ({
  title, tag, description, userId
}) => {
  const newQuestion = await Question.create({
    userId,
    title: title || faker.random.words(),
    tag: tag || faker.random.word(),
    description: description || faker.random.words()
  });

  return newQuestion;
};

export default createTestQuestion;
