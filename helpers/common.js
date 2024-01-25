const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
  const token = jwt.sign(
    {
      data: {
        _id: userId,
      },
    },
    secret,
    { expiresIn: "8h" }
  );
  return {
    token,
    createdAt: new Date().toISOString(),
  };
};

const decodeToken = (token, callbackFn) => {
  return jwt.verify(token, secret, callbackFn);
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  createToken,
  decodeToken,
  hashPassword,
  comparePassword,
};
