var db = require("../models/");
var exports = (module.exports = {});

//Retrieve
exports.restaurantList = function(req, res) {
  var user = req.user;
  console.log(user);
  //Find all stored restaurants for logged in user
  db.User.findOne({
    where: {
      id: user.id
    },
    include: [
      {
        model: db.Restaurant,
        where: {
          userId: user.id
        }
      }
    ]
  }).then(function(results) {
    //Push all returned into array for front end use.
    var userInfo = results.dataValues;
    var hbsObject = {
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      Restaurants: userInfo.Restaurants
    };
    res.redirect("/user/" + user.id);
  });
};

//POST new restaurant
exports.saveRestaurant = function(req, res) {
  var userId = req.user.id;
  var newId = req.body.yelpID;
  var restaurantName = req.body.name;
  console.log("restcontroller", req.body);
  console.log("restcontroller", req.user);
  db.Restaurant.create({
    yelpID: newId,
    name: restaurantName,
    UserId: userId
  }).then(function(errors) {
    if (errors) throw errors;
    res.send("A new restaurant has been stored");
  });
};

//DELETE new restaurant
exports.deleteRestaurant = function(req, res) {
  db.Restaurant.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(errors) {
    if (errors) {
      throw errors;
    }
    res.send("Restaurant has been deleted");
  });
};
