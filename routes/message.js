const router = require("express").Router()
const messageController = require("../controllers/message.controller")


router.post("/create", messageController.create)
router.get("/mymessages", messageController.getMyMessage)
router.get("/messages", messageController.getMessage)
router.post("/comment", messageController.wtireComment)
router.post("/change-status", messageController.changeStatus)
router.get("/comments", messageController.getComments)
router.get("/statistic", messageController.getStatistics)



module.exports = router