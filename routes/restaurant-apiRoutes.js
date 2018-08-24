var db = require("../models");

module.exports = function(app) {
  // Get all restaurants
  app.get("/api/restaurants", function(req, res) {
    db.Restaurant.findAll({}).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  // Create a new restaurant
  app.post("/api/restaurants", function(req, res) {
    db.Restaurant.create(req.body).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  // Delete a restaurant by id
  app.delete("/api/restaurants/:id", function(req, res) {
    db.Restaurant.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });
};
