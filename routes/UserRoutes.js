const express = require("express")
const { register, allUsers } = require("../controllers/UserController")
const router = express.Router()

router.get("/users",allUsers)
router.post("/register",register)

module.exports= router