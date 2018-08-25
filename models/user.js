module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: "Name must be at least 3 characters in length."
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: "Username must be at least 3 characters in length."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 15],
          msg: "Passwords must be between 5 and 15 characters in length."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address."
        }
      }
    }
  });

  User.associate = function(models) {
    // Associating User with Restaurants
    // When a User is deleted, also delete any associated Restaurants
    User.hasMany(models.Restaurant, {
      onDelete: "cascade"
    });
  };
  return User;
};
