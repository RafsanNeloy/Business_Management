const mongoose = require('mongoose');
// done

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  product_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Ensure index on productId to enforce uniqueness
productSchema.index({ productId: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
