const mongoose = require('mongoose');
// done
const customerSchema = new mongoose.Schema({
    customerId: {
    type: Number,
    required: true,
    unique: true
  },  
  customername: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  } 
});

// Ensure index on userId to enforce uniqueness
customerSchema.index({ customerId: 1 }, { unique: true });  

module.exports = mongoose.model('Customer', customerSchema);
