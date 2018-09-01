var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load map page
  app.get("/map", function(req, res) {
    res.render("map");
  });

  // Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load example page and pass in an example by id
  app.get("/user", function(req, res) {
    res.render("user");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
