const mongoose = require('mongoose');
// done
const billSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bill_id: {
    type: String,
    required: true,
    unique: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  total_bill: {
    type: Number,
    required: true
  },
  is_paid: {
    type: Boolean,
    default: false
  },
  bill_details: [
    {
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
     less: {
        type: Number,
        default: 0
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
});

billSchema.index({ bill_id: 1 }, { unique: true });

module.exports = mongoose.model('Bill', billSchema);

