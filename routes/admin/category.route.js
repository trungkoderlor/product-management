const express = require('express');
const router= express.Router();
const Controller = require("../../controllers/admin/category.controller");
const multer = require('multer');
const upload = multer();
const uploadCloud= require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/category.validate")
router.get('/',Controller.index);
router.get('/create',Controller.create);
router.post('/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  Controller.createPost);
router.patch('/change-status/:status/:id',Controller.changeStatus);
router.patch('/change-multi',Controller.changeMulti);
module.exports = router;
