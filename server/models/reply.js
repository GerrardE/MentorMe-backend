module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Reply.associate = (models) => {
    const {
      User, Question
    } = models;

    Reply.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user_reply'
    });

    Reply.belongsTo(Question, {
      foreignKey: 'questionId',
      onDelete: 'CASCADE'
    });
  };
  return Reply;
};
