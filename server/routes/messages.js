const express = require("express")
const router = express.Router({ mergeParams: true });

const { createMessage, getMessage, deleteMessage } = require("../handlers/message")

router.route("/").post(createMessage)

router.route("/:messageId")
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router;