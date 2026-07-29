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
router.get("/edit/:id", productCategoryController.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  productCategoryController.editPatch,
);
module.exports = router;
