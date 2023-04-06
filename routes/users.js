const express = require('express');
const passport = require('passport');
const router  = express.Router();
const usersController = require('../controllers/users_controller');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.get('/login',usersController.login);
router.post('/create',usersController.create);
router.get('/home',usersController.users_home);
router.post('/update/:id',usersController.update);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
),usersController.create_session);
router.get('/sign_out',usersController.destroy_session);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signup'}),usersController.create_session);


module.exports = router;