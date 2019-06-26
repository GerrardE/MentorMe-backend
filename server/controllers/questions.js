import models from '../models';
import validQuestion from '../validations/question';

const { Question } = models;

/**
 * Question Controller
 * @async
 * @class QuestionController
 */
class QuestionController {
  /**
   * Create a question
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof QuestionController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validQuestion(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }
      const { id: userId } = req.decoded;
      const {
        title, tag, description, photo
      } = req.body;

      const questionDetails = {
        userId, title, tag, description, photo
      };

      const payload = await Question.create(questionDetails);

      res.status(201).json({
        status: 201,
        message: 'Question posted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Question could not be created',
      });
    }
  }

  /**
   * Get all questions
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof QuestionController
   */
  static async get(req, res) {
    try {
      const { tag } = req.params;

      const payload = await Question.findAndCountAll({ where: { tag } });

      return res.status(200).json({
        status: 200,
        message: 'Questions retrieved successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Questions could not be retrieved'
      });
    }
  }

  /**
   * Update a question
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof QuestionController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validQuestion(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { oldQuestion } = req;
      const { userId, id } = oldQuestion;

      const {
        title, tag, description
      } = req.body;

      const questionDetails = {
        title, tag, description
      };

      await Question.update(
        { questionDetails }, { returning: true, where: { id, userId } }
      );

      res.status(200).json({
        status: 200,
        message: 'Question updated successfully'
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Question could not be updated'
      });
    }
  }

  /**
   * Delete a question
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof QuestionController
   */
  static async delete(req, res) {
    try {
      const { oldQuestion } = req;
      const { id, userId } = oldQuestion;
      await Question.destroy({ where: { id, userId } });

      res.status(200).json({
        status: 200,
        message: 'Question deleted successfully'
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Question could not be deleted'
      });
    }
  }
}

export default QuestionController;
