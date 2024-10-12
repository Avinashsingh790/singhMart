const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/singhMart')
  .then(() => console.log('db connected'))
  .catch(err => console.log('Connection error:', err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
