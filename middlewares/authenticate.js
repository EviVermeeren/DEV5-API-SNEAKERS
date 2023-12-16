const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized: Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin || false,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;
