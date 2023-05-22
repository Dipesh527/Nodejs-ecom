const express = require("express")
const { helloFunction } = require("../controllers/HelloController")
const router = express.Router()

router.get("/hello1",helloFunction)
module.exports = router