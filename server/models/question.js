module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Question.associate = (models) => {
    const {
      Reply, User, Tag
    } = models;

    Question.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user_question',
    });

    Question.hasMany(Reply, {
      foreignKey: 'questionId',
      as: 'reply',
    });

    Question.hasMany(Tag, {
      foreignKey: 'questionId',
      as: 'tag',
    });
  };
  return Question;
};
