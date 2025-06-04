const usermiddleware = require("../middleware/usermiddleware")

const router = require("express").Router()

router.use("/auth", require("./auth"))
router.use("/user", require("./user"))
router.use("/message",usermiddleware ,require("./message"))

module.exports = router