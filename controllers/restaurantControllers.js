var db = require("../models/");
var exports = (module.exports = {});

//Retrieve
exports.restaurantList = function(req, res) {
  var user = req.user;
  console.log(user);
  //Find all stored restaurants for logged in user
  db.Restaurant.findAll({
    where: {
      UserId: user.id
    }
  }).then(function(results) {
    //Push all returned into array for front end use.
    var usersStoredRestaurants = [];
    for (var i = 1; i < results.length; i++) {
      usersStoredRestaurants.push(results[i]);
    }
    var hbsObj = {
      user: user,
      restaurants: usersStoredRestaurants
    };
    console.log(hbsObj);
    //render to handlebars
    res.render("user", hbsObj);
  });
};

//POST new restaurant
exports.saveRestaurant = function(req, res) {
  var userId = req.user.id;
  var newId = req.body.id;
  var restaurantName = req.body.name;
  console.log(req.body);
  console.log(req.user);
  db.Restaurant.create({
    yelpID: newId,
    name: restaurantName,
    UserId: userId
  }).then(function(errors) {
    if (errors) {
      throw errors;
    }
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
