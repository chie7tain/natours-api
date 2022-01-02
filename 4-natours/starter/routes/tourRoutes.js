const express = require('express');

const tourRouter = express.Router();
const tourController = require('../controllers/tourController');

// check Id
tourRouter.param('id', tourController.checkID);
// get all tours
// post a new tour
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
// get a single tour
// update a tour
// delete a tour
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
