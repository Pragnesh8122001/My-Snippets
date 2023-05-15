// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');

// const indexRouter = require('./routes/index');

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/', indexRouter);

// app.use(cookieParser());
// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

//main branch
class App {
  constructor() {
    this.express = require('express');
    this.bodyparser = require('body-parser');
    this.mongoose = require('mongoose');
    this.dotenv = require('dotenv');
    this.path = require('path');
    this.cookieParser = require('cookie-parser');
    this.session = require('express-session');

    this.indexRouter = require('./routes/index');
    this.database = require('./database/database');
    this.port = process.env.PORT || 3000;

    this.app = this.express();

    this.app.use(this.express.json());
    this.app.use(this.express.urlencoded({ extended: true }));
    this.app.use(this.cookieParser());
    this.app.use(
      this.session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true,
      })
    );

    this.app.use('/', this.indexRouter);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
const app = new App();

module.exports = app.app;
