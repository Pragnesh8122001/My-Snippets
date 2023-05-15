class IndexRouter {
  constructor() {
    this.mongoose = require('mongoose');
    this.router = require('express').Router();
    this.BaseController = require('../controller/index.controller');
    this.userData = require('../model/user.model');
    this.middleware = require('../middleware/middleware');
    this.setRoutes();
  }

  setRoutes() {
    this.router.get('/', this.BaseController.getLogin);
    this.router.post('/sign-up', this.BaseController.addUser);
    this.router.post('/login', this.BaseController.loginUser);
    this.router.post('/logout', this.BaseController.logoutUser);
    this.router.get(
      '/dashboard',
      this.middleware.authMiddleware,
      this.BaseController.getDashboard
    );
  }
}

const router = new IndexRouter();
module.exports = router.router;
