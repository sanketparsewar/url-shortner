const { getUser } = require("../service/auth");

// authentication
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  console.log(tokenCookie);
  req.user = null;
  if (!tokenCookie) return next();
  
  const token = tokenCookie;
  const user = getUser(token);
  console.log(user);
  req.user = user;
  return next();
}

// authorization
//admin or user. here we have roles as array
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
