class DataBase {
  constructor() {
    this.config = require('../config/config');
    this.mongoose = require('mongoose');
    this.mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log('Database connected successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
module.exports = new DataBase();
