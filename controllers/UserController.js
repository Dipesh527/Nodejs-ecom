const Token = require("../models/TokenModel")
const User = require("../models/UserModel")
const crypto= require("crypto")
const sendEmail = require("../utils/sendMail")

exports.register = async(req,res)=>{
  // destructure
  const{username,email,password}=req.body
  let user1= await User.findOne({email:email})
  if(user1)
  {
    return res.status(400).json("user already exist")
  }
  let usertoregister = new User({
    username:username,
    email:email,
    password:password
  })
  usertoregister= usertoregister.save()
  if(!usertoregister){
    return res.status(400).json("something went wrong")
  }
  let token = new Token({
    token:crypto.randomBytes(16).toString('hex'),
    user: usertoregister._id,
  })
  if(!token)
  {
    res.status(400).json({error:"failed to generate"})
  }
  token =await token.save()

  const url =  `http://localhost:6000/userverification/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to:email,
    subject:"Email verification",
    text: `Click here to verify:${url}`,
    html:   `<a href=${url}>Click to verify</a>`
  })

  // if(!token)
  // {
  //   res.status({error:"token not generated"})

  // }
  // return res.status(200).json({"Token generted Successfully"})

  return res.status(200).json({success:"User created Successfully"})

}

exports.allUsers = async(req,res) =>
{
  let user = await User.find()
  if(!user)
  {
    return res.status(400).json({error:"User not found"});
  }
  return res.send(user)
}
exports.deleteUser = async(req,res)=>
{
  let user = await User.findByIdAndDelete(req.params.id)
  if(!user)
  {
    res.status(400).json({error:"something went wrong"})
  }  
  return res.status(200).json({success:"User deleted successfully"})
}
exports.verify = async(req,res)=>{
  let token = await Token.findOne({token:req.params.id})
  if(!user)
  {
    return res.status(400).json({error:"something went wrong"})
  }
  let userverify = await Token.findById(token.user)
  if(!userverify)
  {
    res.status(400).json({error:"user not found"})
  }
  // check if user is verified or not
  if(userverify.is_verified)
  {
    res.status(400).json({error:"user is already verified"})
  }
  userverify.is_verified = true
  userverify = await userverify.save()
  if(!userverify)
  {
    res.status(400).json({error:"something went wrong"})
  }
  return res.send("user is verified")
}