const db = require("../../models");
const ObjectId = require("mongoose").Types.ObjectId;

const constants = require("../../helpers/constants");
const common = require("../../helpers/common");

const createError = require("http-errors");

const list = async () => {
  try {
    const groups = await db.Group.find();

    return constants.success(groups, "Groups fetched successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to fetch Groups",
      error
    );
  }
};

const getById = async (id) => {
  try {
    const group = await db.Group.findOne({
      _id: ObjectId(id),
    });

    if (!group) {
      throw createError(400, "group does not exists");
    }

    return constants.success(group, "group fetched successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to fetch group",
      error
    );
  }
};

const create = async (data) => {
  try {
    const group = new db.Group();
    group.name = data.name;
    group.members = data.members;
    group.createdAt = new Date();
    await group.save();

    return constants.success(group, "Group created successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to create Group",
      error
    );
  }
};

const update = async (id, data) => {
  try {
    // Check if the group exists
    const existingGroup = await db.Group.findOne({ _id: ObjectId(id) });

    if (!existingGroup) {
      throw createError(400, "Group does not exist");
    }

    // Update group data
    existingGroup.name = data.name || existingGroup.name;
    existingGroup.members = data.members || existingGroup.members;

    // Save the updated group
    await existingGroup.save();

    return constants.success(existingGroup, "Group updated successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to update Group",
      error
    );
  }
};

const remove = async (groupId) => {
  try {
    // Check if the group exists
    const existingGroup = await db.Group.findOne({ _id: ObjectId(groupId) });

    if (!existingGroup) {
      throw createError(400, "Group does not exist");
    }

    // Remove the group
    await existingGroup.remove();

    return constants.success({}, "Group deleted successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to delete Group",
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
