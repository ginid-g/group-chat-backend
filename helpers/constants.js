const success = (data, message) => {
  return {
    success: true,
    data: data,
    code: 200,
    message: message,
    error: null,
  };
};

const error = (code, message, error) => {
  return {
    success: false,
    data: null,
    code: code,
    message: message,
    error: error,
  };
};

module.exports = {
  success,
  error,
};
