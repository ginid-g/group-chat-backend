const db = require("../../models");

const constants = require("../../helpers/constants");
const common = require("../../helpers/common");
const createError = require("http-errors");

const auth = async (data) => {
  try {
    const user = await db.User.findOne({
      username: data.username,
    });

    if (!user) {
      throw createError(400, "Invalid username or password");
    }

    if (!common.comparePassword(data.password, user.password)) {
      throw createError(400, "Invalid username or password");
    }

    const token = common.createToken(user._id);

    user.password = undefined;

    const userData = {
      user: user,
      auth: token,
    };

    return constants.success(userData, "Login successfully");
  } catch (error) {
    return constants.error(
      error.status || 500,
      error.message || "Failed to authenticate user",
      error
    );
  }
};

module.exports = { auth };
