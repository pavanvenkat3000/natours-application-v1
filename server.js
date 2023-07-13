const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaught Exception!  shutting down');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

//console.log(process.env);
const db = process.env.DATABASE_STRING.replace(
  '<password>',
  process.env.DATA_BASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // suggested by command line
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('DB connection found');
  })
  .catch((error) => console.log(error.message));

// const testTour = new Tour({
//   name: 'hii station',
//   price: 247,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}........`);
});

process.on('unhandledException', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled Rejection!  shutting down');
  server.close(() => {
    process.exit(1);
  });
});
