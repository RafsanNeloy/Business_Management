const express = require('express');
const router = express.Router();
const { protect, adminOnly, userOrAdmin } = require('../middlewares/authMiddleware');
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts
} = require('../controllers/productController');

// Everyone who is either user or admin can add, update, delete products
router.post('/', protect, userOrAdmin, addProduct);
router.delete('/:productId', protect, userOrAdmin, deleteProduct);
router.patch('/:productId', protect, userOrAdmin, updateProduct);
router.get('/', protect, getAllProducts);

module.exports = router;
