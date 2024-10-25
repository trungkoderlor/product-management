const express = require("express");
const multer = require('multer');
const router = express.Router();
const Controller = require("../../controllers/admin/setting.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
router.get('/general',Controller.general) ;
router.patch(
  '/general',
  upload.single("logo"),
  uploadCloud.upload,
  Controller.generalPatch) ;
module.exports = router;