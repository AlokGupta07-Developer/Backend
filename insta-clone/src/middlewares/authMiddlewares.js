
const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  try {
    const token = req.cookies?.Token;
    // console.log("Cookies:", req.cookies);
    // console.log("Token:", req.cookies?.Token);

    if (!token) {
      return res.status(401).json({
        message: "Token not provided, please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    return next();
  } catch (error) {
    console.error("Auth error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = identifyUser;
