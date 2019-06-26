import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validRegistration = (data) => {
  const errors = {};
  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Name validations
  if (!validator.isLength(data.fullName, { min: 2, max: 200 })) {
    errors.fullName = 'fullName must be between 2 and 100 characters';
  }

  if (validator.isEmpty(data.fullName)) {
    errors.fullName = 'fullName field is required';
  }

  // Type validation
  if (validator.isEmpty(data.type)) {
    errors.type = 'Type field is required';
  }

  // Email validations
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Country validation
  if (validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }

  // Password validations
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 to 30 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validRegistration;
