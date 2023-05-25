const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema
const tokenSchema = new mongoose.Schema({
  token:{
    type:String,
    required:true
  },
  user:{
    type:ObjectId,
    required:true
  },
  created_at:{
    type:Date,
    default:Date.now(),
    required:true
  }
})
module.exports = mongoose.model("token",tokenSchema)