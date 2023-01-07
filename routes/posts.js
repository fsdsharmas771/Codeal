const express = require('express');
const router = express.Router();
const posts_Controller = require('../controllers/posts_controller');

router.get('/newpost',posts_Controller.newpost);


module.exports = router;