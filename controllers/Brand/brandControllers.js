var { api: loggerApi, apiOutPut: loggerOut } = require("../../utils/logger")
const { validationResult } = require("express-validator")
const { ErrorBadRequest, ErrorNotfound, FormatErr } = require("../../utils/appError");
const { baseImageUrl, removeImage } = require("../../utils/all");
const { BrandImage } = require("../../db/index");
const { BrandTitle } = require("../../db/index");

//  IMAGE
exports.findAllBrandImage = ((req, res, next) => {
  BrandImage.findAll().then(data => {
    loggerOut.info()
    res.status(200).send(data[0]);
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(404).send(ErrorNotfound(error.message))
  })
})

exports.uploadBrandImage = ((req, res, next) => {
  const data = req.body
  if (req.file !== undefined && req.file !== null) {
    data.image = baseImageUrl + req.file.path;
    BrandImage.create(data).then(data => {
      loggerOut.info()
      res.status(200).send(data)
    }).catch((err) => {
      const error = FormatErr(err)
      loggerOut.error()
      res.status(400).send(ErrorBadRequest(error.message))
    })
  } else {
    loggerOut.error()
    res.status(400).send(ErrorBadRequest('bad request !'))
  }
})

exports.updateBrandImage = ((req, res, next) => {
  const data = req.body
  if (req.file !== undefined && req.file !== null) {
    data.image = baseImageUrl + req.file.path
  }
  BrandImage.update(data, { where: { uid: req.params.id } }).then(data => {
    if (data[0] > 0) {
      BrandImage.findByPk(req.params.id).then(data => {
        loggerOut.info()
        res.status(200).send({ success: { msg: "updated successfully." } })
      })
    } else {
      loggerOut.error()
      res.status(404).send(ErrorNotfound('data not found !'))
    }
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(400).send(ErrorBadRequest(error.message))
  })
})

exports.deleteBrandImage = ((req, res, next) => {
  BrandImage.findByPk(req.params.id).then(data => {
    if (data != null) {
      removeImage(data)
      data.destroy().then(result => {
        loggerOut.info()
        res.status(200).send({ success: { msg: "deleted successfully.", result: data } })
      })
    } else {
      loggerOut.error()
      res.status(404).send(ErrorNotfound('data not found !'))
    }
  })
})


// TITLE ##################################################################################################
exports.findAllBrandTitle = ((req, res, next) => {
  BrandTitle.findAll().then(data => {
    loggerOut.info()
    res.status(200).send(data);
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(404).send(ErrorNotfound(error.message))
  })
})

exports.createBrandTitle = ((req, res, next) => {
  const data = req.body
  BrandTitle.create(data).then(data => {
    loggerOut.info()
    res.status(200).send(data)
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(400).send(ErrorBadRequest(error.message))
  })
})

exports.updateBrandTitle = ((req, res, next) => {
  const data = req.body
  BrandTitle.update(data, { where: { uid: req.params.id } }).then(data => {
    if (data[0] > 0) {
      BrandTitle.findByPk(req.params.id).then(data => {
        loggerOut.info()
        res.status(200).send({ success: { msg: "updated successfully." } })
      })
    } else {
      loggerOut.error()
      res.status(404).send(ErrorNotfound('data not found !'))
    }
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(400).send(ErrorBadRequest(error.message))
  })
})

exports.deleteBrandTitle = ((req, res, next) => {
  BrandTitle.findByPk(req.params.id).then(data => {
    if (data != null) {
      data.destroy().then(result => {
        loggerOut.info()
        res.status(200).send({ success: { msg: "deleted successfully.", result: data } })
      })
    } else {
      loggerOut.error()
      res.status(404).send(ErrorNotfound('data not found !'))
    }
  })
})

// SHOW FOR HOME ########################################################################################

exports.getBrand = ((req, res, next) => {
  let brandTitle = []
  let brandImage = []
  BrandTitle.findAll({ raw: true }).then(datatitle => {
    brandTitle = datatitle
    if (brandTitle.length) {
      BrandImage.findAll({ raw: true }).then(dataimages => {
        brandImage = dataimages
        const lastBrandTitle = brandTitle[brandTitle.length - 1]
        const data = {
          images: brandImage,
          title_text: lastBrandTitle.title_text,
          title_text_color: lastBrandTitle.title_text_color,
          title_text_hover_color: lastBrandTitle.title_text_hover_color
        }
        loggerOut.info()
        res.status(200).send(data)
      }).catch((err) => {
        const error = FormatErr(err)
        loggerOut.error()
        res.status(404).send(ErrorNotfound(error.message))
      })
    } else {
      loggerOut.error()
      res.status(404).send(ErrorNotfound('brand title not found !'))
    }
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(404).send(ErrorNotfound(error.message))
  })
})
