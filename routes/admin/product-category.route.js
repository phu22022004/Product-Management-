const express = require("express");
const multer = require("multer");
const router = express.Router();
const productCategoryController = require("../../controllers/admin/product-category.controller");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product-category.validate");

router.get("/", productCategoryController.index);
router.get("/create", productCategoryController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  productCategoryController.createPost,
);
module.exports = router;
