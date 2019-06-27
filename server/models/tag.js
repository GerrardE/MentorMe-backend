module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    questionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Tag.associate = (models) => {
    const {
      Question
    } = models;

    Tag.belongsToMany(Question, {
      foreignKey: 'questionId',
      through: 'questionTag',
      as: 'tags'
    });
  };
  return Tag;
};
