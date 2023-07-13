const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true }); // get access to the parameters in parent routes also.

router.use(authController.protect);
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourAndUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReviewWithId)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReviewWithId
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReviewWithId
  );

module.exports = router;
