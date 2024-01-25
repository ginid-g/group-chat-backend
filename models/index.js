const mongoose = require("mongoose");
const common = require("../helpers/common");

mongoose.connect(process.env.MONGODB_URI);

mongoose.Promise = global.Promise;

const database = mongoose.connection;

/**
 * Database failed to connect
 */

database.on("error", (error) => {
  console.log(error);
});

/**
 * Database connected successfully
 */

database.once("connected", () => {
  console.log("Database Connected");
  seedAdminUser();
});

const db = {
  User: require("./users.model"),
  Group: require("./groups.model"),
  Chat: require("./chats.mode"),
};

const seedAdminUser = async () => {
  const adminUser = await db.User.findOne({
    role: "admin",
  });

  if (!adminUser) {
    const user = new db.User();
    user.firstName = "admin";
    user.lastName = "user";
    user.username = "admin";
    user.password = common.hashPassword("12345678");
    user.role = "admin";

    await user.save();
  }
};

module.exports = db;
