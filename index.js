const express = require("express")
const app = express()
var bodyParser = require('body-parser')

require('dotenv').config()
require("./database/connection")
port = process.env.PORT
const router= require("./routes/TestRoute")
const category= require("./routes/CategoryRoute")
const product = require("./routes/ProductRoute")
const user = require("./routes/UserRoutes")
app.use(bodyParser.json())

app.use("",category)
app.use("",product)
app.use("",user)


app.listen(port,(req,res)=>{
  console.log(`sarver started at ${port}`)
})