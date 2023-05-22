// const Category = require("../models/Category")
const Product = require("../models/Product")
exports.addProduct = async(req,res)=>{
  let addproduct = new Product({
    product_name:req.body.product_name,
    price:req.body.price,
    image:req.file.path,
    description:req.body.description,
    stock:req.body.stock,
    category:req.body.category,
  })
  addproduct = await addproduct.save()
  if(!addproduct){
    res.send({error:"Something went wrong"})
  }
  res.status(200).json({success:"Product added Successfully"})
}
exports.getProducts= async(req,res)=>{
  let product = await Product.find()
  if(!product){
    res.status(400).json({error:"something went wrong"})
  }
  return res.send(product)
}
exports.updateProducts = async(req,res)=>{
  let updateproduct = await Product.findByIdAndUpdate(req.params.id,{
    product_name:req.body.product_name,
    price:req.body.price,
    image:req.file.path,
    description:req.body.description,
    stock:req.body.stock,
    category:req.body.category,
  },{new:true})
  if(!updateproduct)
  {
    return res.status(400).json({error:"Something went wrong"})
  }
  return res.send(updateproduct)
}
exports.deleteProduct= async(req,res)=>{
  let deleteproduct = await Product.findByIdAndDelete(req.params.id)
  if(!deleteproduct)
  {
    res.status(400).json({error:"something went wrong"})
  }
  return res.status(200).json({success:"product deleted successfully"})
}