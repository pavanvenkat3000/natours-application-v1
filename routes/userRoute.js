const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotpassword);
router.patch('/resetPassword/:token', authController.resetpassword);

//Protect all routes after this middleware.
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.route('/me').get(userController.getMe, userController.getUserWithId);

// restrice all routes to admins after this middleware
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getALLUsers)
  .post(userController.addNewUser);
router
  .route('/:id')
  .get(userController.getUserWithId)
  .patch(userController.updateUserWithId)
  .delete(userController.deleteUserWithId);

module.exports = router;
