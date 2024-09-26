const express = require("express");
const router = express.Router();
const aboutController = require("../../controllers/client/about.controller");

router.get('/',aboutController.index) ;
module.exports = router;