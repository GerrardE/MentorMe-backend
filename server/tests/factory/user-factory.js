import models from '@models';
import faker from 'faker';
import { createToken } from '../../middlewares/Token';

const { User } = models;

const generateToken = async (userDetails) => {
  const token = await createToken(userDetails);
  return token;
};

const createTestUser = async ({
  fullName, email, password, type, country
}) => {
  const newUser = await User.create({
    id: faker.random.uuid(),
    fullName: fullName || faker.random.alphaNumeric(6),
    type: type || faker.random.word(),
    email: email || faker.internet.email(),
    country: country || faker.address.country(),
    password: password || faker.internet.password()
  });

  return (newUser);
};

export { createTestUser, generateToken };
