var db = require("../models");
// YELP API
var keys = require("../public/js/keys");
var yelp = require("yelp-fusion");
var client = yelp.client(keys.yelp.apiKey);
var restaurantController = require("../controllers/restaurantControllers");

module.exports = function(app) {
  //Get YELP
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
        //console.log(prettyJson);
        res.json(response.jsonBody.businesses);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  /*----------- Routes for storing and viewing saved restaurants--------*/

  // Get all restaurants
  app.get("/api/restaurants", restaurantController.restaurantList);

  // Create a new restaurant
  app.post("/api/restaurants", isLoggedIn, restaurantController.saveRestaurant);

  // Delete a restaurant by id
  app.delete(
    "/api/restaurants/:id",
    isLoggedIn,
    restaurantController.deleteRestaurant
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};