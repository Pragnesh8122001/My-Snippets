const mongoose = require('mongoose');
// make user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, { versionKey : false });
// export user model
module.exports = mongoose.model('User', userSchema);
