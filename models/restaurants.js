module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    yelpID: DataTypes.STRING,
    name: DataTypes.STRING
  });

  Restaurant.associate = function(models) {
    // We're saying that a Restaurant should belong to a User
    // A Restaurant can't be created without a Restaurant due to the foreign key constraint
    Restaurant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Restaurant;
};
