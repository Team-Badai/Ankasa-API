const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next({
        status: 401,
        message: "Unauthorized account! Please login to verify your identity."
      });
    }
    const verifyOptions = {
      issuer: "zwallet"
    };
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey, verifyOptions);
    if (decoded.role !== "admin") {
      next(createError(400, "You are not authorized to continue"));
    } else {
      req.decoded = decoded;
      next();
    }
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const userTokenVerification = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next({
        status: 401,
        message: "Unauthorized account! Please login to verify your identity."
      });
    }
    const verifyOptions = {
      issuer: "zwallet"
    };
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey, verifyOptions);
    req.decoded = decoded;
    next();
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({ status: 400, message: "Token Expired!" });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

module.exports = {
  isAdmin,
  userTokenVerification
};
