const express = require('express');
const passport = require('passport');
const router  = express.Router();
const usersController = require('../controllers/users_controller');


router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.get('/login',usersController.login);
router.post('/create',usersController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
),usersController.create_session);
router.get('/sign_out',usersController.destroy_session)
router.post('/new-post',usersController.new_post)
module.exports = router;