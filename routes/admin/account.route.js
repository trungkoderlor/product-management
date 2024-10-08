const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/admin/account.controller");
const multer = require('multer');
const upload = multer();

const uploadCloud= require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate")
router.get('/',Controller.index) ;
router.get('/create',Controller.create) ;
router.post(
    '/create',
    upload.single("avatar"),
    uploadCloud.upload,
    validate.createPost,
    Controller.createPost
) ;
module.exports = router;