const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  password: { type: String, default: null },
  role: {
    type: String,
    enum: ["admin", "normal"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

module.exports = mongoose.model("User", schema);
