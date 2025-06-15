const router = require("express").Router()
const userController = require("../controllers/user.controller")

router.get("/profile/:id", userController.getProfile)
router.get("/getall", userController.getUsers)
router.post("/delete/:id", userController.deleteUser)


module.exports = router