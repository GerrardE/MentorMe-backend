import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validReply = (data) => {
  const errors = {};
  data.body = !isEmpty(data.body) ? data.body : '';

  // Body validations
  if (!validator.isLength(data.body, { min: 5 })) {
    errors.body = 'Body must be at least 5 characters';
  }

  if (validator.isEmpty(data.body)) {
    errors.body = 'Body field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validReply;
