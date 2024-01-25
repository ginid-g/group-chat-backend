const router = require("express").Router();
const AuthService = require("./auth.service");

const apiResponse = require("../../helpers/api-response");

router.post("/", auth);

module.exports = router;

function auth(req, res) {
  AuthService.auth(req.body)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}
