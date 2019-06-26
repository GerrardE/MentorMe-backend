import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const salt = process.env.SALT || 5;
// eslint-disable-next-line radix
const SALT_ROUNDS = parseInt(salt);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    fullName: {
      type: DataTypes.CITEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.CITEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.CITEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: user => User.hashPassword(user),
      beforeUpdate: user => User.hashPassword(user)
    }
  });

  User.associate = (models) => {
    const {
      Question, Profile, Reply
    } = models;

    User.hasMany(Question, {
      foreignKey: 'userId',
      as: 'question',
    });

    User.hasMany(Reply, {
      foreignKey: 'userId',
      as: 'replies',
    });

    User.hasOne(Profile, {
      foreignKey: 'userId',
      as: 'profile',
    });
  };

  User.hashPassword = async (user) => {
    const hash = await bcrypt.hash(user.dataValues.password, SALT_ROUNDS);
    await user.setDataValue('password', hash);
  };

  return User;
};
