const db = require("../../models");
const ObjectId = require("mongoose").Types.ObjectId;

const constants = require("../../helpers/constants");

const list = async (id) => {
  try {
    const chat = await db.Chat.aggregate([
      {
        $match: {
          groupId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          message: "$message",
          createdBy: "$createdBy",
          user: {
            firstName: "$userDetails.firstName",
            lastName: "$userDetails.lastName",
          },
        },
      },
    ]);

    return constants.success(chat, "Chat fetched successfully");
  } catch (error) {
    return constants.error(400, error.message || "Failed to fetch Chat", error);
  }
};

const create = async (userId, data) => {
  try {
    const chat = new db.Chat();
    chat.message = data.message;
    chat.groupId = data.groupId;
    chat.createdBy = userId;
    chat.createdAt = new Date();
    await chat.save();

    return constants.success(chat, "Chat created successfully");
  } catch (error) {
    return constants.error(
      400,
      error.message || "Failed to create Chat",
      error
    );
  }
};

module.exports = {
  list,
  create,
};
