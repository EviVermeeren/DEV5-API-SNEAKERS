const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
});

const createShoeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message:
    "Too many new shoe creation attempts from this IP, please try again later.",
});

module.exports = {
  loginLimiter,
  createShoeLimiter,
};
