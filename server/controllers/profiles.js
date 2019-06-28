import models from '@models';
import validProfile from '../validations/profile';

const { User, Profile } = models;

/**
 * Profile Controller
 * @async
 * @class ProfileController
 */
class ProfileController {
  /**
    * Retrieve a profile
    * @static
    * @param {*} req - Request object
    * @param {*} res - Response object
    * @return {json} Returns json object
    * @memberof ProfileController
    */
  static async getProfile(req, res) {
    try {
      const { userId: id } = req.params;
      const payload = await User.findOne({
        attributes: ['id', 'fullName', 'type', 'email', 'country'],
        where: { id },
        include: [{ model: models.Profile, as: 'profile', attributes: ['status', 'bio', 'phone', 'avatar', 'createdAt'] }]
      });

      if (!payload) {
        return res.status(404).send({
          status: 404,
          errors: 'User does not exist'
        });
      }

      res.status(200).send({
        status: 200,
        message: 'Profile retrieved successfully',
        payload
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        errors: 'Profile could not be retrieved'
      });
    }
  }

  /**
  * Update profile
  * @static
  * @param {*} req - Request object
  * @param {*} res - Response object
  * @return {json} Returns json object
  * @memberof ProfileController
  */
  static async updateProfile(req, res) {
    try {
      const { errors, isValid } = validProfile(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }
      const { id: userId } = req.decoded;
      const profile = await Profile.findOne({ where: { userId } });

      if (!profile) {
        return res.status(404).send({
          status: 404,
          errors: 'User does not exist'
        });
      }

      const payload = await profile.update(req.body);

      res.status(200).send({
        status: 200,
        message: 'Profile updated successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        errors: 'Profile could not be updated'
      });
    }
  }
}

export default ProfileController;
