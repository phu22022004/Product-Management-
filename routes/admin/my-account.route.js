const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const myAccountController = require("../../controllers/admin/my-account.controller.js");
const validate = require("../../validates/admin/account.validate");

router.get("/", myAccountController.index);
router.get("/edit", myAccountController.edit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPatch,
  myAccountController.editPatch,
);

module.exports = router;