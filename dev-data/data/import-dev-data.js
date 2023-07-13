const fs = require('fs');
const Tour = require(`${__dirname}/../../models/tourModel`);
const User = require(`${__dirname}/../../models/userModel`);
const Review = require(`${__dirname}/../../models/reviewModel`);

const dotenv = require('dotenv');
dotenv.config({ path: './../../config.env' });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const mongoose = require('mongoose');

console.log(process.env.DATABASE_STRING);

const db = process.env.DATABASE_STRING.replace(
  '<password>',
  process.env.DATA_BASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('connection found');
  });

// import all the data
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('data added successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete all the data
const deleteData = async () => {
  //console.log('insided delete method');
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
console.log(process.argv);
