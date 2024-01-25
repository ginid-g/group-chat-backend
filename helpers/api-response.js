const apiResponse = async (req, res, payload) => {
  res.status(payload.code).send({
    success: payload.success,
    data: payload.data,
    message: payload.message,
  });
};

module.exports = apiResponse;
