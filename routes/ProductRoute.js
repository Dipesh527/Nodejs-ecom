const express = require("express")
const { addProduct, getProducts, updateProducts, deleteProduct } = require("../controllers/ProductController")
const router= express.Router()
const upload = require("../utils/fileupload")

router.post("/addproduct",upload.single("image"),addProduct)
router.get("/getproduct",getProducts)
router.put("/updateproduct/:id",updateProducts)
router.delete("/deleteproduct/:id",deleteProduct)
module.exports= router