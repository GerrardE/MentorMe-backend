import bcrypt from 'bcrypt';
import models from '../models';
import userExtractor from '../helpers/userExtractor';
import { createToken } from '../middlewares/Token';
import validRegistration from '../validations/register';
import validLogin from '../validations/login';
import validationResponse from '../validations/validationResponse';

const { User } = models;

/**
 * User Controller
 * @async
 * @class UserController
 */
class UserController {
  /**
   * User registration
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async register(req, res) {
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
        fullName: user.fullName,
        type: user.type,
        country: user.country,
        email: user.email,
      };
      
      await user.createProfile(req.body);
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

  /**
   * User login
    * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async login(req, res) {
    try {
      const { errors, isValid } = await validLogin(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        return res.status(400).json({
          status: 400,
          errors: 'Invalid email or password'
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({
          status: 400,
          errors: 'Invalid email or password'
        });
      }

      const payload = {
        id: user.id,
        fullName: user.fullName,
        type: user.type,
        country: user.country,
        email: user.email,
      };
      const token = await createToken(payload);
      res.status(200).json({
        status: 200, message: 'Login successful', user: userExtractor(user, token)
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Login unsuccessful'
      });
    }
  }

  /**
   * List all users
    * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async getUsers(req, res) {
    try {
      const payload = await User.findAndCountAll({
        attributes: ['id', 'fullName', 'type', 'email', 'country', 'createdAt'],
        include: [{ model: models.Profile, as: 'profile', attributes: ['status', 'bio', 'phone', 'avatar'] }]
      });

      res.status(200).json({
        status: 200, message: 'Users retrieved successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Users could not be retrieved'
      });
    }
  }
}

export default UserController;
