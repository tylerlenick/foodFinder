var db = require("../models");
var keys = require("../public/js/keys");
var yelp = require("yelp-fusion");
var client = yelp.client(keys.yelp);
console.log(client);

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load map page
  app.get("/map", function(req, res) {
    res.render("map");
  });

  app.post("/map", function(req, res) {
    console.log(
      "======================== HTML ROUTES POST METHOD ================================="
    );
    console.log(req.body);
    res.json({ ok: true });
  });
  // Load signup page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load example page and pass in an example by id
  app.get("/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(user) {
      console.log(user);
      res.render("user", {
        user: user
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
