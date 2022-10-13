const UserAuthController = require('../../controllers/index').UserAuthController;
const express = require('express');
const router = express.Router();
const passport = require('passport');
require('./../../middlewares/passport')(passport);

//singnUp Only user //
router.post('/signup', UserAuthController.signup);
router.post('/login', UserAuthController.loginUser);
//Update Password // 
router.post('/completeProfile', passport.authenticate('jwt', { session: false }), UserAuthController.CompleteProfile);
router.post('/updateProfile', passport.authenticate('jwt', { session: false }), UserAuthController.updateProfile);
router.get('/getProfile', passport.authenticate('jwt', { session: false }), UserAuthController.getProfile);
module.exports = router;