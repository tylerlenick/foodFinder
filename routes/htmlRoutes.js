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
  // app.get("/user/:id", function(req, res) {
  //   db.User.findOne({ where: { id: req.params.id } }).then(function(user) {
  //     console.log(user);
  //     res.render("user", {
  //       user: user
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
