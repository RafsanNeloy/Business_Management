const mongoose = require('mongoose');

const customerDetailsSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  billHistory: [
    {
      data_insert_date: {
        type: Date,
        required: true,
        default: Date.now
      },
      bill_id: {
        type: String,
        required: true
      },
      total_bill: {
        type: Number,
        required: true,
        min: 0
      },
      rejected: {
        type: Number,
        default: 0,
        min: 0
      },
      less: {
        type: Number,
        default: 0
      },
      given_date: {
        type: Date,
        required: true,
        default: Date.now
      },
      given: {
        type: Number,
        default: 0
      },
      remains: {
        type: Number,
        default: 0
      }
    }
  ]  
}, {
  timestamps: true,
  strict: true,
  validateBeforeSave: true
});

customerDetailsSchema.index({ 'billHistory.bill_id': 1 });
customerDetailsSchema.index({ 'billHistory.given_date': 1 });

module.exports = mongoose.model('CustomerDetail', customerDetailsSchema);
