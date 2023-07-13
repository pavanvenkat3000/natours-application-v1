const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

const filterObject = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// exports.getALLUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find();
//   res.status(200).json({
//     //requestedAt: req.requestTime,
//     status: 'success',
//     results: users.length,
//     data: users,
//   });
// });

exports.addNewUser = (req, res) => {
  // not used instead we use sign in
  res.status(500).json({
    status: 'err',
    message: 'this route is not yet handled',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// exports.getUserWithId = (req, res) => {
//   res.status(500).json({
//     status: 'err',
//     message: 'this route is not yet handled',
//   });
// };
// exports.updateUserWithId = (req, res) => {
//   res.status(500).json({
//     status: 'err',
//     message: 'this route is not yet handled',
//   });
// };
// exports.deleteUserWithId = (req, res) => {
//   res.status(500).json({
//     status: 'err',
//     message: 'this route is not yet handled',
//   });
// };

exports.getALLUsers = factory.getAll(User);
exports.getUserWithId = factory.getOne(User);
exports.updateUserWithId = factory.updateOne(User); // Do not update passwords with this.
exports.deleteUserWithId = factory.deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)create error if user POSTs password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. please use /updateMyPassword',
        400
      )
    );
  }

  //2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email');

  //3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
