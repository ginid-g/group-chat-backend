const router = require("express").Router();
const ChatService = require("./chat.service");
const apiResponse = require("../../helpers/api-response");

router.get("/:groupId", list);

router.post("/", create);

module.exports = router;

function list(req, res) {
  ChatService.list(req.params.groupId)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}

function create(req, res) {
  ChatService.create(req?.user?._id, req.body)
    .then(async (result) => await apiResponse(req, res, result))
    .catch(async (error) => await apiResponse(req, res, error));
}
