const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const app = express();

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization aginst NoSQL query injection
app.use(mongoSanitize());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
// our own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//middleware example
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//set security headers
app.use(helmet());

// we are using logger only for development environment.
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//limit requests form same api.
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter);

//serving static files
app.use(express.static(`${__dirname}/public`));
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server..', app: 'Nators' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('you can post to this server..');
// });

//

// app.get('/api/v1/tours/', getALLtours);
// app.post('/api/v1/tours/', addNewtour);
// app.get('/api/v1/tours/:id', getTourWithId);
// app.patch('/api/v1/tours/:id', updateTourWithId);
// app.delete('/api/v1/tours/:id', deleteTourWithId);

//mounting the router.

app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/reviews/', reviewRouter);
//handling unhandled routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

//global error handling middleware
app.use(errorController);

module.exports = app;
