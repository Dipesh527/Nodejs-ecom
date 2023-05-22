const multer = require("multer")
const fs = require("fs")
const path = require("path")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "public/uploads"
    if(!fs.existsSync(dest))
    {
      fs.mkdirSync(dest,{recursive:true})
    }
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    let basename = path.basename(file.originalname,ext)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let filename = basename + uniqueSuffix + ext
    cb(null, filename)
  }
})
const myFileFilter = (req,file,cb)=>{
  if(!file.originalname.match(/\.(jpeg|JPEG|PNG|png|gif|GIF|jpg|JPG)/)){
    return cb (new Error ("You can only choose image",true))
  }
  cb (null,true)
}

const upload = multer({ storage: storage,
fileFilter:myFileFilter,
limit:2000000 })

module.exports = upload