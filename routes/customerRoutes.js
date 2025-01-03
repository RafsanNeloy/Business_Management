const express = require('express');
const router = express.Router();
const { protect, adminOnly, userOrAdmin } = require('../middlewares/authMiddleware');
const {
  addCustomer,
  deleteCustomer,
  updateCustomer,
  getAllCustomers
} = require('../controllers/customerController');

// user/admin can add a customer
router.post('/', protect, userOrAdmin, addCustomer);
// admin can delete a customer
router.delete('/:customerId', protect, adminOnly, deleteCustomer);
// user/admin can update a customer
router.patch('/:customerId', protect, userOrAdmin, updateCustomer);
// user/admin can get all customers
router.get('/', protect, userOrAdmin, getAllCustomers);

module.exports = router;
