import models from '../models';
import validTag from '../validations/tag';

const { Tag } = models;

/**
 * Tag Controller
 * @async
 * @class TagController
 */
class TagController {
  /**
   * Create a Tag
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TagController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validTag(req.body);
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

      const TagDetails = {
        userId, title, tag, description, photo
      };

      const payload = await Tag.create(TagDetails);

      res.status(201).json({
        status: 201,
        message: 'Tag posted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Tag could not be created',
      });
    }
  }

  /**
   * Get all Tags
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TagController
   */
  static async get(req, res) {
    try {
      const { tag } = req.params;

      const payload = await Tag.findAndCountAll({ where: { tag } });

      return res.status(200).json({
        status: 200,
        message: 'Tags retrieved successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Tags could not be retrieved'
      });
    }
  }

  /**
   * Update a Tag
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TagController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validTag(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { oldTag } = req;
      const { userId, id } = oldTag;

      const {
        title, tag, description
      } = req.body;

      const TagDetails = {
        title, tag, description
      };

      await Tag.update(
        { TagDetails }, { returning: true, where: { id, userId } }
      );

      res.status(200).json({
        status: 200,
        message: 'Tag updated successfully'
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Tag could not be updated'
      });
    }
  }

  /**
   * Delete a Tag
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TagController
   */
  static async delete(req, res) {
    try {
      const { oldTag } = req;
      const { id, userId } = oldTag;
      await Tag.destroy({ where: { id, userId } });

      res.status(200).json({
        status: 200,
        message: 'Tag deleted successfully'
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Tag could not be deleted'
      });
    }
  }
}

export default TagController;
