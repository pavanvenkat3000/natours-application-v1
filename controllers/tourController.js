// const fs = require('fs');

const Tour = require('../models/tourModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
//const APIFeatures = require('../utils/APIFeatures');
// const appError = require('./../utils/appError');

// for file system.
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// exports.checkId = (req, res, next, value) => {
//   if (req.params.id * 1 > tours.length) {
//     console.log(`parameter here is ${value}`);
//     return res.status(404).json({
//       status: 'failure',
//       message: 'tour with id provided not found!',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'failure',
//       message: 'bad request!',
//     });
//   }
//   next();
// };

// exports.getALLtours = async (req, res) => {
//   try {
//     //querying type 1
//     // const tours = await Tour.find({
//     //   duration: 5,
//     //   difficulty: 'easy',
//     // });

//     //querying type 2
//     // const tours = await Tour.find()
//     //   .where('duration')
//     //   .equals(5)
//     //   .where('difficulty')
//     //   .equals('easy');

//     //console.log(req.query);

//     // //excluding special fields
//     // let queryObj = { ...req.query };
//     // const excludeFields = ['page', 'sort', 'limit', 'fields'];
//     // excludeFields.forEach((el) => delete queryObj[el]);

//     // //advance filtering, greaterthan or equal
//     // let querystr = JSON.stringify(queryObj);
//     // //console.log(querystr);
//     // querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     // //console.log(JSON.parse(querystr));
//     // queryObj = JSON.parse(querystr);
//     // let query = Tour.find(queryObj);

//     // //sorting;
//     // if (req.query.sort) {
//     //   //query = query.sort(req.query.sort);
//     //   // if we want to sort based on morethan on field.
//     //   const sortBy = req.query.sort.split(',').join(' ');
//     //   query = query.sort(sortBy);
//     // }

//     // //limiting;
//     // if (req.query.fields) {
//     //   const fields = req.query.fields.split(',').join(' ');
//     //   query = query.select(fields);
//     // } else {
//     //   query = query.select('-__v');
//     // }

//     // //pagination;
//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 10;
//     // const skip = (page - 1) * limit;
//     // query = query.skip(skip).limit(limit);
//     // if (req.query.page) {
//     //   const numTours = await Tour.countDocuments();
//     //   if (skip >= numTours) throw new Error('this page doenot exist');
//     // }

//     //Execute query
//     const features = new APIFeatures(Tour.find(), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .pagination();
//     const tours = await features.query;
//     //const tours = await query;
//     // SEND RESPONSE
//     res.status(200).json({
//       //requestedAt: req.requestTime,
//       status: 'success',
//       results: tours.length,
//       data: tours,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'failed',
//       message: err.message,
//     });
//   }
// };

// exports.getALLtours = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .pagination();
//   const tours = await features.query;
//   //const tours = await query;
//   // SEND RESPONSE
//   res.status(200).json({
//     //requestedAt: req.requestTime,
//     status: 'success',
//     results: tours.length,
//     data: tours,
//   });
// });

// exports.addNewtour = async (req, res) => {
//   // const newid = tours[tours.length - 1].id + 1;
//   // const newtour = Object.assign({ id: newid }, req.body);
//   // //console.log(req.body);
//   // tours.push(newtour);
//   // fs.writeFile(
//   //   `${__dirname}/dev-data/data/tours-simple.json`,
//   //   JSON.stringify(tours),
//   //   (err) => {
//   //     res.status(201).json({
//   //       status: 'success',
//   //       data: newtour,
//   //     });
//   //   }
//   // );

//   try {
//     const newTour = await Tour.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: newTour,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.addNewtour = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: newTour,
//   });
// });

// exports.getTourWithId = async (req, res) => {
//   //console.log(req.params);
//   // const id = req.params.id * 1;
//   // const tour = tours.find((el) => el.id === id);

//   try {
//     const tour = await Tour.findById(req.params.id);
//     res.status(200).json({
//       status: 'success',
//       data: tour,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.getTourWithId = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   if (!tour) {
//     return next(new appError(`Tour not found`, 404));
//   }
//   //console.log(tour.reviews);
//   res.status(200).json({
//     status: 'success',
//     data: tour,
//     // reviews: tour.reviews, /////////////////////////////////////
//   });
// });

// exports.updateTourWithId = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: tour,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.updateTourWithId = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!tour) {
//     return next(new appError(`Tour not found`, 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: tour,
//   });
// });

// exports.deleteTourWithId = async (req, res) => {
//   try {
//     await Tour.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: '<updated successfully..>',
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err,
//     });
//   }
// };

// exports.deleteTourWithId = catchAsync(async (req, res, next) => {
//   await Tour.findByIdAndDelete(req.params.id);
//   res.status(204).json({
//     status: 'success',
//     data: '<updated successfully..>',
//   });
// });
exports.getTourWithId = factory.getOne(Tour, 'reviews');

exports.addNewtour = factory.createOne(Tour);

exports.updateTourWithId = factory.updateOne(Tour);

exports.deleteTourWithId = factory.deleteOne(Tour);

exports.getALLtours = factory.getAll(Tour);

exports.alias5TopTours = (req, res, next) => {
  console.log('alias5TopTours');
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

//aggregation pipeline , match, group,

// exports.getTourStats = async (req, res) => {
//   try {
//     const stats = await Tour.aggregate([
//       {
//         $match: {
//           ratingsAverage: { $gte: 4.5 },
//         },
//       },
//       {
//         $group: {
//           _id: '$difficulty',
//           numTours: { $sum: 1 },
//           numRatings: { $sum: '$ratingsQuantity' },
//           averageRating: { $avg: '$ratingsAverage' },
//           averagePrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         },
//       },
//       {
//         $sort: { averagePrice: 1 },
//       },
//       // {
//       //   $match: {
//       //     _id: { $ne: 'easy' },
//       //   },
//       // },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: stats,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err.message,
//     });
//   }
// };

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        averageRating: { $avg: '$ratingsAverage' },
        averagePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { averagePrice: 1 },
    },
    // {
    //   $match: {
    //     _id: { $ne: 'easy' },
    //   },
    // },
  ]);
  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = req.params.year;

//     const plan = await Tour.aggregate([
//       {
//         $unwind: '$startDates',
//       },
//       {
//         $match: {
//           startDates: {
//             $gte: new Date(year, 0, 1),
//             $lte: new Date(year, 11, 31),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: '$startDates' }, //extracting month from startDates
//           numToursStarts: { $sum: 1 },
//           tours: { $push: '$name' }, // adding name column of the document to  the array.
//         },
//       },
//       {
//         $addFields: {
//           month: '$_id',
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//         },
//       },
//       {
//         $sort: { numToursStarts: -1 },
//       },
//       {
//         $limit: 12,
//       },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: plan,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err.message,
//     });
//   }
// };

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' }, //extracting month from startDates
        numToursStarts: { $sum: 1 },
        tours: { $push: '$name' }, // adding name column of the document to  the array.
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numToursStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: plan,
  });
});
