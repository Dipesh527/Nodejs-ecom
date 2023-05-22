const mongoose = require("mongoose")
const uuidv1 = require("uuidv1")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  hashed_password:{
    type:String,
    required:true
  },
  is_verified:{
    type:Boolean,
    default:false
  },
  role:{
    type:Number,
    default:0
  },
  salt:String
},{
  timestamps:true
})

userSchema.virtual("password")
.set(function(password){
  //create a temporarly variable password
  this._password=password,
  // generate a timestamps
  this.salt= uuidv1(),
  this.hashed_password= this.encryptPassword(this._password)
  console.log(this)
})

  userSchema.methods = {
    encryptPassword:function(password)  {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt) 
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};
module.exports = mongoose.model("user",userSchema)