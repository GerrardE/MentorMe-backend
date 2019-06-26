import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validQuestion = (data) => {
  const errors = {};
  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.photo = !isEmpty(data.photo) ? data.photo : '';
  data.tag = !isEmpty(data.tag) ? data.tag : '';

  // Title validations
  if (!validator.isLength(data.title, { min: 10, max: 500 })) {
    errors.title = 'Title must be between 10 and 500 characters';
  }

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  // Tag validations
  if (!validator.isLength(data.tag, { min: 2, max: 100 })) {
    errors.tag = 'Tag must be between 2 and 100 characters';
  }

  if (validator.isEmpty(data.tag)) {
    errors.tag = 'Tag field is required';
  }

  // Description validations
  if (validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validQuestion;
