class userController {
  constructor() {
    this.userData = require('../model/user.model');
    this.mongoose = require('mongoose');
    this.jwt = require('jsonwebtoken');
    this.bcrypt = require('bcrypt');
    this.session = require('express-session');
  }

  getLogin = async (req, res) => {
    console.log('log in page');
    res.send('log in page');
  };
  addUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      let isUserExist = false;
      // check if user already exist
      let userData = await this.userData.find({ email }).then((user) => {
        if (user.length) {
          isUserExist = true;
        }
      });
      if (isUserExist)
        return res.json({ status: 403, message: 'user already exists' });
      // hashedn password
      const hashedPassword = await this.bcrypt.hash(password, 10);
      // ...signup logic
      const token = this.jwt.sign({ email }, 'your-secret-key');
      // create user
      const user = new this.userData({ email, password: hashedPassword });
      // save user
      await user.save();
      // set token in cookie
      req.session.token = token;
      res.cookie('token', token, { httpOnly: true });
      console.log(`token set in cookie: ${token}`);
      res.status(200).json({ message: 'Sign up successful', user });
    } catch (err) {
      console.error('Error signing up:', err);
      res.status(500).json({ error: 'Sign up failed' });
    }
  };
  loginUser = async (req, res) => {
    // req cookies
    const { email, password } = req.body;
    try {
      let user = await this.userData.findOne({ email });
      if (!user || !(await this.bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Generate a token for authentication
      const token = this.jwt.sign({ email: user.email }, 'your-secret-key');

      // Store the token in the session and/or a cookie
      req.session.token = token;
      console.log(req.session);
      res.cookie('token', token, { httpOnly: true });

      res.json({
        status: 200,
        message: 'login successful',
      });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Login failed' });
    }
  };
  logoutUser = async (req, res) => {
    req.session.destroy();
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  };

  getDashboard = async (req, res) => {
    res.send('<h1>HELLO USER</h1>');
  };
}

const userControl = new userController();
module.exports = userControl;
