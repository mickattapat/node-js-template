const express = require('express')
const brandControllers = require('../../controllers/Brand/brandControllers')
const { body } = require('express-validator');
const { imgFromData, imgBase64 } = require('../../middleware/uploadFile');

const router = express.Router();
const uploadImgFromBrand = imgFromData('brand_img')
// Auth
const passport = require('passport')
const requireJwt = passport.authenticate('jwt', { session: false })

// BRAND IMG
router
  .route('/image')
  .get(requireJwt, brandControllers.findAllBrandImage)
  .post(requireJwt, uploadImgFromBrand.single('image'), brandControllers.uploadBrandImage)
router
  .route('/image/:id')
  .patch(requireJwt, uploadImgFromBrand.single('image'), brandControllers.updateBrandImage)
  .delete(requireJwt, brandControllers.deleteBrandImage)

// BRAND TITLE
router
  .route('/title')
  .get(requireJwt, brandControllers.findAllBrandTitle)
  .post(requireJwt, brandControllers.createBrandTitle)
router
  .route('/title/:id')
  .patch(requireJwt, brandControllers.updateBrandTitle)
  .delete(requireJwt, brandControllers.deleteBrandTitle)

// BRAND SHOW
router
  .route('/show')
  .get(brandControllers.getBrand)
module.exports = router
