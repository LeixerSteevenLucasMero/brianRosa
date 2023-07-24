const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

