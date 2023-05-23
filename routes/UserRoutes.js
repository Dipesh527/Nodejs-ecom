const express = require("express")
const { register, allUsers, deleteUser, verify } = require("../controllers/UserController")
const router = express.Router()

router.get("/users",allUsers)
router.post("/register",register)
router.get("/userverification/:id",verify)
router.delete("/deleteusers/:id",deleteUser)

module.exports= router