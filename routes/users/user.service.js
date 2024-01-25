const db = require("../../models");
const ObjectId = require("mongoose").Types.ObjectId;

const constants = require("../../helpers/constants");
const common = require("../../helpers/common");

const createError = require("http-errors");

const list = async () => {
  try {
    const users = await db.User.find();

    return constants.success(users, "Users fetched successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to fetch Users",
      error
    );
  }
};

const getById = async (userId) => {
  try {
    const user = await db.User.findOne({
      _id: ObjectId(userId),
    });

    if (!user) {
      throw createError(400, "User does not exists");
    }

    return constants.success(user, "User fetched successfully");
  } catch (error) {
    return constants.error(400, error.message || "Failed to fetch User", error);
  }
};

const create = async (userData) => {
  try {
    const hashPassword = common.hashPassword(userData.password);
    // If username not passed then throw error
    if (!userData.username) {
      throw createError(400, "Username is required");
    }

    const userExists = await db.User.findOne({ username: userData.username });

    // If user exists throw error
    if (userExists) {
      throw createError(400, "User with this username already exists");
    }

    // Add user in db
    const user = new db.User();

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.username = userData.username;
    user.password = hashPassword;
    user.role = "normal";
    user.createdAt = new Date();
    await user.save();

    return constants.success(user, "User created successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to create User",
      error
    );
  }
};

const update = async (userId, userData) => {
  try {
    // Check if the user exists
    const existingUser = await db.User.findOne({ _id: ObjectId(userId) });

    if (!existingUser) {
      throw createError(400, "User does not exist");
    }

    // Update user data
    existingUser.firstName = userData.firstName || existingUser.firstName;
    existingUser.lastName = userData.lastName || existingUser.lastName;

    // If you want to update the username, make sure it's unique
    if (userData.username) {
      const usernameExists = await db.User.findOne({
        username: userData.username,
        _id: { $ne: ObjectId(userId) }, // Exclude the current user from the check
      });

      if (usernameExists) {
        throw createError(400, "Username is already taken");
      }

      existingUser.username = userData.username;
    }

    // Save the updated user
    await existingUser.save();

    return constants.success(existingUser, "User updated successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to update User",
      error
    );
  }
};

const remove = async (userId) => {
  try {
    // Check if the user exists
    const existingUser = await db.User.findOne({ _id: ObjectId(userId) });

    if (!existingUser) {
      throw createError(400, "User does not exist");
    }

    // Remove the user
    await existingUser.remove();

    return constants.success({}, "User deleted successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to delete User",
      error
    );
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
