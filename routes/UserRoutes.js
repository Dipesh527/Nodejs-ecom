const express = require("express")
const { register, verify, resendverification, forgetPassword, resetPassword, signin } = require("../controllers/UserController")
const router = express.Router()

router.post("/register",register)
router.get("/userverification/:id",verify)
router.post("/resendverification",resendverification)
router.post("/forgetpassword",forgetPassword)
router.post("/resetpassword/:id",resetPassword)
router.post("/signin",signin)

module.exports = router
