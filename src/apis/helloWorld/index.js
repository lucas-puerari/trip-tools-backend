const express = require('express');

const getHandler = require('./get/handler');

const router = express.Router();

router.get('/', getHandler);

module.exports = router;
