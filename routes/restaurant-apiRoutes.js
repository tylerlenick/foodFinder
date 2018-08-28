var db = require("../models");
// YELP API
var keys = require("../public/js/keys");
var yelp = require("yelp-fusion");
var client = yelp.client(keys.yelp.apiKey);

module.exports = function(app) {
  // Get all restaurants
  app.get("/api/restaurants", function(req, res) {
    db.Restaurant.findAll({}).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  app.get("/api/yelp", function(req, res) {
    res.json();
  });

  app.post("/api/yelp", function(req, res) {
    console.log(
      "======================== HTML ROUTES POST METHOD ================================="
    );
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    var searchRequest = {
      term: "restaurants",
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      radius: 10000,
      limit: 10,
      open_now: true
    };
    client
      .search(searchRequest)
      .then(function(response) {
        var firstResult = response.jsonBody.businesses[0];
        var prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
        res.json(response.jsonBody.businesses);
      })
      .catch(function(error) {
        console.log(error);
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
