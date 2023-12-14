const express = require('express');
const router = express.Router();
const s3 = require('../../services/s3');


router.route('/')
    .get(s3.listImages)
    .get(s3.downloadImages);
module.exports = router;