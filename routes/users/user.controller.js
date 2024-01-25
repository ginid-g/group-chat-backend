const router = require("express").Router();
const UserService = require("./user.service");
const apiResponse = require("../../helpers/api-response");

const adminGuard = require("../../middlewares/admin-guard.middleware");

router.get("/", list);

router.use(adminGuard);
router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;

function list(req, res) {
  UserService.list()
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function getById(req, res) {
  UserService.getById(req.params.id)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function create(req, res) {
  UserService.create(req.body)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function update(req, res) {
  UserService.update(req.params.id, req.body)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function remove(req, res) {
  UserService.remove(req.params.id)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}
