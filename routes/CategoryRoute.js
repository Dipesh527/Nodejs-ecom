const express = require("express")
const { addCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/CategoryController")
const router = express.Router()

router.post("/addcategory",addCategory)
router.get("/getcategory",getAllCategory)
router.put("/updatecategory/:id",updateCategory)
router.delete("/deletecategory/:id",deleteCategory)
module.exports= router