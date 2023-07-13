class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    //advance filtering, greaterthan or equal
    let querystr = JSON.stringify(queryObj);
    //console.log(querystr);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(querystr));
    queryObj = JSON.parse(querystr);
    this.query = this.query.find(queryObj);
    //console.log('filetered!');
    return this;
  }

  sort() {
    //console.log('sort started');
    if (this.queryString.sort) {
      // console.log('inside sort if');
      // this.query = this.query.sort(this.queryString.sort);
      // if we want to sort based on more than one field.
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //console.log('inside sort else');
      this.query = this.query.sort('-createdAt');
    }
    //console.log('Sorted!');
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    //console.log('limited!');
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // if (this.queryString.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('this page doenot exist');
    // }
    //console.log('paginated!');
    return this;
  }
}

module.exports = APIFeatures;
