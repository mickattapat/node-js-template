var multer = require('multer')
var moment = require('moment')
var shell = require('shelljs')

// UPLOAD FILE (BANNER)
const imgFromData = (path) => {
  var storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
      // const uploadImgFromData = imgFromData('banner')
      const dir = `uploads/${path}/${moment().format('YYYYMM')}`
      shell.mkdir('-p', dir)
      cb(null, dir)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname)
    },
  })
  var uploadProfileImage = multer(
    {
      storage: storageFile,
      limits: { fileSize: 1024 * 1024 * 4 },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
          const err = new Error()
          err.message = 'File types allowed .jpeg, .jpg .png!'
          err.status = 400
          return cb(err)
        }
        cb(null, true)
      }
    }
  )
  return uploadProfileImage
}

module.exports = {
  imgFromData: imgFromData,
}