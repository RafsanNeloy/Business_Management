const mongoose = require('mongoose');
// done
const productDetailsSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
    },
   
  billHistory: [
    {
      data_insert_date: {
        type: Date,
        required: true
      },
      bill_id: {
        type: String,
        required: true
      },
      remains: {
        type: Number,
        default: 0
      },
      calang_id: {
          type: Number,
          required: true,
      },
      add_item: [
        {
          calang_id: {
            type: Number,
            required: true,
        }
      },
      ],
      deliveries: [
        {
          delivery_date: {
            type: Date,
            required: true
          },
        quantity: {
                type: Number,
                required: true
           },
        
        }
    ]
    }
  ]  
});

// Ensure index on product_id to enforce uniqueness
productDetailsSchema.index({ product_id: 1 }, { unique: true });

module.exports = mongoose.model('ProductDetails', productDetailsSchema);
