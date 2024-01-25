const router = require("express").Router();
const GroupService = require("./group.service");
const apiResponse = require("../../helpers/api-response");

router.get("/", list);

router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;

function list(req, res) {
  GroupService.list()
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function getById(req, res) {
  GroupService.getById(req.params.id)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function create(req, res) {
  GroupService.create(req.body)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function update(req, res) {
  GroupService.update(req.params.id, req.body)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function remove(req, res) {
  GroupService.remove(req.params.id)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}
