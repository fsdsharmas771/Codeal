const express = require('express');
const router  = express.Router();
const profile_Controller = require('../controllers/profile_controller');

router.get('/',profile_Controller.profilepage);

module.exports = router;