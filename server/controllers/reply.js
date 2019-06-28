import models from '../models';
import validReply from '../validations/reply';
import replies from '../helpers/replies';

const { Reply, Question } = models;

/**
 * Reply Controller
 * @async
 * @class ReplyController
 */
class ReplyController {
  /**
   * Create a Reply
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReplyController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validReply(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }
      const { question } = req;
      const questionId = question.id;
      const { id: userId } = req.decoded;
      const { body } = req.body;


      await question.createReply({ userId, body });
      const payload = await replies(questionId);

      res.status(201).json({
        status: 201,
        message: 'Reply posted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Reply could not be posted'
      });
    }
  }

  /**
   * Get all Replys
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReplyController
   */
  static async get(req, res) {
    try {
      const { id } = req.params;

      const payload = await Reply.findAndCountAll({
        where: { questionId: id },
        attributes: ['id', 'body', 'createdAt'],
        include: [{ model: models.User, as: 'user_reply', attributes: ['id', 'fullName'] }]
      });

      return res.status(200).json({
        status: 200,
        message: 'Replies retrieved successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Replies could not be retrieved'
      });
    }
  }
}

export default ReplyController;
