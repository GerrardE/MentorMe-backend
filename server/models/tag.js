module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    questionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Tag.associate = (models) => {
    const {
      Question
    } = models;

    Tag.belongsTo(Question, {
      foreignKey: 'questionId',
      as: 'tags'
    });
  };
  return Tag;
};
