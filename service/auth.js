// initially we were  using uuid and stored in cookie to maintain state now we are using the jsonwebtoken which is stateless authentication
const jwt = require("jsonwebtoken");
const secret = "Sanket$2001$";
// this will create tokens
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role:user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
module.exports = { setUser, getUser };
