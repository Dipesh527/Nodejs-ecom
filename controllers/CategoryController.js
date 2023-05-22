const Category = require("../models/Category")
exports.addCategory = async(req,res)=>{
  let category = new Category({
    category_name:req.body.category_name
  })
  category = await category.save()
  if(!category){
    res.status(400).json({error:"Something went wrong"})
  }
  res.send(category)
}

exports.getAllCategory = async(req,res)=>{
  let category= await Category.find();
  if(!category){
    res.status(400).json({error:"Something went wrong"});
  }
  return res.send(category)
}
exports.updateCategory = async(req,res)=>{
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    {
    category_name:req.body.category_name,
    }
    ,
    {new:true}
    )
  if(!category){
    return res.status(400).json({error:"Something went wrong"})
  }
  return res.send(category)
}
exports.deleteCategory = async(req,res)=>{
  let category = await Category.findByIdAndDelete(req.params.id);
  if(!category)
  {
    return res.status(400).json({error:"something went wrong"})
  }
  return res.status(200).json({success:"category deleted successfully"})
}