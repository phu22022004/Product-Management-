const express = require("express");
const multer = require("multer");
const storageMulti = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulti() });
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
  validate.createPost,
  productController.createPost,
);
module.exports = router;
