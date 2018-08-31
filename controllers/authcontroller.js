var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  var hbsObject = {
    message: "This is error message"
  };
  res.render("index", hbsObject);
};

exports.dashboard = function(req, res) {
  res.render("dashboard");
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
  console.log("User signed out.");
};
