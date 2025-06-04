const router = require("express").Router()
const userController = require("../controllers/user.controller")

router.get("/profile/:id", userController.getProfile)
router.get("/getall", userController.getUsers)


module.exports = router