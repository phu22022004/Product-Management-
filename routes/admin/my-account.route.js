const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const myAccountController = require("../../controllers/admin/my-account.controller.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",myAccountController.index);
router.get("/edit",myAccountController.edit);
router.patch(
    "/edit",
    upload.single("avatar"),
    uploadCloud.upload,
    myAccountController.editPatch)
module.exports = router;