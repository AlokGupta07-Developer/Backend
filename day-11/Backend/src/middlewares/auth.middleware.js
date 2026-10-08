const jwt = require("jsonwebtoken");

async function identyUser(req, res, next) {
  //Checks which user create post
  const token = req.cookies.Token;

  //User neither register or nor login then
  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
    });
  }

  //Kya ye token genuine hai aur JWT_SECRET ke according valid hai?
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  req.user = decoded;

  next()
}

module.exports = identyUser;
