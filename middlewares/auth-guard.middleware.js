const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

const common = require("../helpers/common");
const constants = require("../helpers/constants");
const apiResponse = require("../helpers/api-response");

const authGuard = async (req, res, next) => {
  const authorization = req.header("Authorization");
  let isAuthorizedUser = false;

  /**
   * Decode JWT token
   */

  if (authorization) {
    await common.decodeToken(authorization, async (err, decoded) => {
      if (decoded) {
        const userId = decoded.data._id;
        const user = await db.User.findOne({
          _id: ObjectId(userId),
        });

        if (user) {
          isAuthorizedUser = true;
          req.user = user; // Fix the variable name from loggedInUser to user
        }
      }
    });
  }

  /**
   * If token is not valid or user does not exist, throw error Unauthorized user
   */

  if (!isAuthorizedUser) {
    const payload = constants.error(401, "Unauthorized user", {});
    await apiResponse(req, res, payload);
    return;
  }

  next();
};

module.exports = authGuard;
