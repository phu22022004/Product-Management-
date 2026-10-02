const express = require("express");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const router = express.Router();
const settingController = require("../../controllers/admin/setting.controller.js");

router.get("/general", settingController.general);
router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  settingController.generalPatch,
);

module.exports = router;
