const mongoose = require('mongoose');
// done
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },  
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },  
  role: {
    type: String,
    enum: ['admin', 'user', 'customer'],
    default: 'user'
  }
});

// Ensure index on userId to enforce uniqueness
userSchema.index({ userId: 1 }, { unique: true });  

module.exports = mongoose.model('User', userSchema);
