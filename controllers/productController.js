const Product = require('../models/Product');

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = await Product.create({ name, price, quantity });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding product', error });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Update product (price, quantity, etc.)
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body; // { price: 200, quantity: 10, name: 'X' }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error });
  }
};
