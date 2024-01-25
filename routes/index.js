const router = require("express").Router();
const authGuard = require("../middlewares/auth-guard.middleware");

/**
 * Auth routes
 */

router.use("/auth", require("./auth/auth.controller"));

router.use(authGuard);

/**
 * User routes
 */

router.use("/users", require("./users/user.controller"));

/**
 * Group routes
 */

router.use("/groups", require("./groups/group.controller"));

/**
 * Chat routes
 */
router.use("/chats", require("./chats/chat.controller"));

module.exports = router;
