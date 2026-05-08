const multer =require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `img-${file.originalname}`)
  }
})

function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  if(file.mimetype == 'image/png' ||file.mimetype == 'image/jpg'||file.mimetype == 'image/jpeg'){
     
    cb(null, true) // To accept the file pass `true`, like so:
  }
  else{

    cb(null, false)// To reject this file pass `false`, like so:
      // You can always pass an error if something goes wrong:
    return cb(new Error('Accept only png,jpeg,jpeg..'))

  }


}

const upload=multer({

    storage,fileFilter
})


module.exports =upload