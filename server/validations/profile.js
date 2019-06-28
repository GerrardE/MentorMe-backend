import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validProfile = (data) => {
  const errors = {};
  data.status = !isEmpty(data.status) ? data.status : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  // status validations
  if (!validator.isLength(data.status, { max: 200 })) {
    errors.status = 'Status must have a maximum of 200 characters';
  }

  // bio validations
  if (!validator.isLength(data.bio, { max: 500 })) {
    errors.bio = 'Bio must have a maximum of 500 characters';
  }

  // phone validations
  if (!validator.isLength(data.phone, { max: 50 })) {
    errors.phone = 'Phone must have a maximum of 50 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validProfile;
