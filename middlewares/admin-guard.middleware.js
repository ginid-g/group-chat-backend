const constants = require("../helpers/constants");
const apiResponse = require("../helpers/api-response");

const adminGuard = async (req, res, next) => {
  if (req.user.role != "admin") {
    const payload = constants.error(401, "Access Denied", {});
    await apiResponse(req, res, payload);
    return;
  }
  next();
};

module.exports = adminGuard;
