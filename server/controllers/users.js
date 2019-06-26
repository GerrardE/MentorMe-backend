import bcrypt from 'bcrypt';
import models from '../models';
import userExtractor from '../helpers/userExtractor';
import { createToken } from '../middlewares/Token';
import validRegistration from '../validations/register';
import validationResponse from '../validations/validationResponse';

const { User } = models;

/**
 * User Controller
 * @async
 * @class UserController
 */
class UserController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async register(req, res, next) {
    try {
      const { errors, isValid } = validRegistration(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const user = await User.create(req.body);

      const payload = {
        id: user.id,
        email: user.email
      };

      const token = await createToken(payload);
      res.status(201).json({
        status: 201,
        message: 'Registration successful',
        user: userExtractor(user, token)
      });
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }

      return res.status(400).json({
        status: 400,
        errors: 'Registration unsuccessful'
      });
    }
  }
}

export default UserController;
