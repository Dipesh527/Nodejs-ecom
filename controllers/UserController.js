const User = require("../models/UserModel")

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