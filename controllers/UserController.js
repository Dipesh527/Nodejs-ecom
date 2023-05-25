const Token = require("../models/TokenModel")
const User = require("../models/User")
const crypto = require("crypto")
const sendEmail = require("../utils/sendMail")
const jwt = require("jsonwebtoken")
exports.register = async(req,res)=>{
  let user = await User.findOne({email:req.body.email})
  if(user){
    res.status(400).json({error:"user already existed"})
  }
  let newuser = new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  })
  newuser = await newuser.save()
  if(!newuser){
    res.status(400).json({error:"Something went wrong"})
  }
  let token = new Token({
    token:crypto.randomBytes(16).toString('hex'),
    user: newuser._id
  })
  token = await token.save()
  if(!token)
  {
    res.status(400).json({error:"something went wrong"})
  }
  const url = `http://localhost:6000/userverification/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to: req.body.email,
    subject:"Email verification",
    text: `click here to verify:${url}`,
    html:`<a href=${url}>Click to verify</a>`
    
  })

  return res.send(newuser)
}
exports.verify = async(req,res)=>{
  let token = await Token.findOne({token:req.params.id})
  if(!token)
  {
    res.status(400).json({error:"Something went wrong"})
  }
  let user = await User.findById(token.user);
  if(!user)
  {
    res.status(400).json({error:"user cannot find"})
  }
  if(user.is_verified)
  {
    res.status(400).json({error:"user is already verified"})
  }
   user.is_verified= true
   user = await user.save()
  if(!user)
  {
    res.status(400).json({error:"something went wrong"});
  } 
  return res.status(200).json({success:"User verified Succesfulyy"})
}

exports.resendverification = async(req,res)=>
{
  let user = await User.findOne({email:req.body.email})
  if(!user)
  {
    res.status(400).json({error:"user not found"})
  }
  let token = new Token({
    token: crypto.randomBytes(16).toString('hex'),
    user:user._id
  })
  token = await token.save()
  if(!token)
  {
    res.status(400).json({error:"Failed to  generate"})
  }
  const url = `http://localhost:6000/userverification/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to:req.body.email,
    subject:"email verification",
    text:`click here to verify ${url}}`,
    html:`<a href=${url}>click here to verify</a>`
  })
  return res.status(200).json({success:"resend verification send"})
}
exports.forgetPassword = async(req,res)=>
{
  let user = await User.findOne({email:req.body.email})
  if(!user)
  {
    res.status(400).json({error:"user not found"})
  }
  let token = new Token({
    token: crypto.randomBytes(16).toString('hex'),
    user:user._id
  }) 
  if(!token)
  {
    res.status(400).json({error:"token not found"})
  }
  const url = `http://localhost:6000/resetpassword/${token.token}`
  sendEmail({
    from:"noreply@gmail.com",
    to:req.body.email,
    subjet:"reset password",
    text:`click here to reset password:${url}`,
    html:`<a href=${url}>click to reset</a>`
  })
  res.send(user);
}

exports.resetPassword = async(req,res)=>
{
  let token = await Token.findOne({token:req.params.id})
  if(!token)
  {
    res.status(400).json({error:"Token not found"})
  }
  let user = await User.findById(token.user)
  if(!user)
  {
    res.status(400).json({error:"User not found"})
  }
  user.password = req.body.password
  user= await user.save()
  if(!user)
  {
    res.status(400).json({error:"user not found"})
  }
  res.status(200).json({message:"Password updated Succesfully"})

}

exports.signin = async(req,res)=>
{
  const{email,password}= req.body
  let user = await User.findOne({email:email})
  if(!user)
  {
    res.status(400).json({error:"user not found"})
  }
  if(!user.authenticate(password))
  {
    res.status(200).json({error:"password do not match"})
  }
  if(!user.is_verified)
  {
    res.status(400).json({error:"user is not verified"})
  }
  var token = jwt.sign({user:user._id , role:user.role }, 'dipesh123');
  res.cookie("mycookies",token ,{expire:Date.now() + 86400})
  res.send({token,user:
    {
    _id:user._id,
    username:user.username,
    role:user.role
  }})
}