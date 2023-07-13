const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
//const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoute');

//router.param('id', tourController.checkId);

// POST /tours/:tourId/reviews
// GET /tours/:tourId/reviews
// GET /tours/:tourId/reviews/:reviewId
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.alias5TopTours, tourController.getALLtours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );
router
  .route('/')
  .get(tourController.getALLtours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.addNewtour
  );
router
  .route('/:id')
  .get(tourController.getTourWithId)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTourWithId
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTourWithId
  );

// POST /tours/:tourId/reviews
// GET /tours/:tourId/reviews
// GET /tours/:tourId/reviews/:reviewId

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
