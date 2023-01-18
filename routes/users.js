const express = require('express');
const router  = express.Router();
const userController = require('../controllers/users_controller');


router.get('/profile',userController.profile);
router.get('/signup',userController.signup);
router.get('/login',userController.login);
router.post('/create',userController.create);


module.exports = router;