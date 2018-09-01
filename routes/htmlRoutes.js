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
  app.get("/user/:id", function(req, res) {
    console.log("testing user route");
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Restaurant,
          where: {
            UserId: req.params.id
          }
        }
      ]
    }).then(function(results) {
      console.log("html routes::::::", results.dataValues.Restaurants);
      var userInfo = results.dataValues;
      var hbsObject = {
        fname: userInfo.fname,
        lname: userInfo.lname,
        email: userInfo.email,
        Restaurants: userInfo.Restaurants
      };
      res.render("user", {
        hbsObject: hbsObject
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
