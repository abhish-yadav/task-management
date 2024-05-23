const jwt = require("jsonwebtoken");
const { status, response, messages } = require("../utils/common");
const { User } = require("../models/user.Model");
const key = process.env.JWT_SECRET;

// Middleware function for bearer token authorization
const authorizeToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader)
      return response({
        res,
        status: status.badRequest,
        message: messages.badRequest + " / Token is mandatory",
      });
    const bearer = bearerHeader.split(" ")[1];
    try {
      const data = jwt.verify(bearer, key);
      const findUser = await User.findOne(
        {
          _id: data?.userId,
        },
        { password: 0 }
      );
      req.user = findUser;

      return next();
    } catch (error) {
      console.log({ error });
      let statusCode;
      let messageStatus;
      // Handling the error code
      switch (error.message) {
        case "jwt malformed":
        case "secret or public key must be provided":
          statusCode = status.badRequest;
          messageStatus = "Token does not have valid components";
          break;
        case "invalid signature":
          statusCode = status.badRequest;
          messageStatus = "Token is not valid";
          break;
        case "jwt expired":
          statusCode = status.unauthorized;
          messageStatus = "Token is expired";
          break;
        default:
          statusCode = status.internalServerError;
          messageStatus =
            "something went wrong in authentication / " + `${error.message}`;
          break;
      }
      return response({
        res: res,
        status: statusCode,
        message: messageStatus,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizeToken };
