const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodeToken = jwt.verify(
      token,
      "i bet you know in you can't even guess it so go lay down and play with yourself"
    );
    req.userInformation = {
      userId: decodeToken.userId,
      email: decodeToken.email
    };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "you have no auth to requrest this http"
    });
  }
};
