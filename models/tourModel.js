const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const Review = require('./reviewModel');

const tourschema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: [true, 'A tour must have a name'],
      maxlength: [40, 'not more than 40 characters'],
      minlength: [10, 'not less than 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'invalid difficulty',
      },
    },
    ratingsAverage: {
      type: Number,
      require: true,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date], // dates at which tour starts
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      //GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        //GeoJSON
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//tourschema.indexes({ price: 1 });
tourschema.indexes({ price: 1, ratingsAverage: -1 });
tourschema.indexes({ slug: 1 });

tourschema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

// Virtual populate
tourschema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

//Document Middleware : runs before .save() and .create())
tourschema.pre('save', function (next) {
  //console.log(this);
  this.slug = slugify(this.name, { lower: true, upper: true });
  next();
});

// tourschema.pre('save', function (next) {
//   console.log('will save the document........');
//   next();
// });

// tourschema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//Query Middleware
tourschema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourschema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

tourschema.post(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

//Aggreation Middleware
tourschema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourschema);

module.exports = Tour;
