class Config {
  constructor() {
    this.dotenv = require('dotenv');
    this.path = require('path');
    this.environment = process.env.NODE_ENV || 'development';
    this.env_file_name = '../.env';
    this.dotenv.config({ path: this.path.join(__dirname, this.env_file_name) });

    this.port = process.env.PORT;
    this.mongo_url = process.env.MONGO_URL;
  }
}

const config = new Config();
module.exports = config;
