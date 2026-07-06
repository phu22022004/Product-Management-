const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// const storageMulti = require("../../helper/storageMulter");
const upload = multer();
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", productController.index);
router.patch("/change-status/:status/:id", productController.changeStatus);
router.patch("/change-multi", productController.changeMulti);
router.delete("/delete/:id", productController.deleteItem);
router.get("/create", productController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  productController.createPost,
);
router.get("/edit/:id", productController.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  productController.editPatch,
);
module.exports = router;

router.get("/detail/:id", productController.detail);
