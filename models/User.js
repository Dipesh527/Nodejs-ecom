const mongoose = require("mongoose")
const uuidv1 = require("uuidv1")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  hashed_password:{
    type:String,
    required:true
  },
  role:{
    type:Number,
    default:0
  },
  is_verified:{
    type:Boolean,
    default:false
  },
  salt:String

},{
  timestamps:true
})

userSchema.virtual("password").set(function(password){
  this._password= password,
  this.salt = uuidv1(),
  this.hashed_password = this.encrpt(this._password)
})
userSchema.methods = {
  encrpt:function(password) {
    if(password="")
    {
      return null
    }
    try {
      return crypto.createHmac("sha256",this.salt).update(password).digest('hex')
    }
    catch{
      return null
    }
  },
  authenticate:function(password) {
  return this.hashed_password == this.encrpt(password)
  }
}
module.exports =  mongoose.model("user",userSchema)