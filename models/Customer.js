const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: String,
  address: String
});

module.exports = mongoose.model('Customer', customerSchema);