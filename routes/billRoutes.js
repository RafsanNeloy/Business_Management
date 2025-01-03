const express = require('express');
const router = express.Router();
const { protect, adminOnly, userOrAdmin } = require('../middlewares/authMiddleware');
const {
  createBill,
  updateBill,
  deleteBill,
  getAllBills
} = require('../controllers/billController');

// user/admin can create bill
router.post('/', protect, userOrAdmin, createBill);
// user/admin can update bill
router.patch('/:billId', protect, userOrAdmin, updateBill);
// admin can delete bill
router.delete('/:billId', protect, adminOnly, deleteBill);
// user/admin can get all bills
router.get('/', protect, userOrAdmin, getAllBills);

module.exports = router;
