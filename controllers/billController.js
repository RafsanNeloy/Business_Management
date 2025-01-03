const Bill = require('../models/Bill');
const Customer = require('../models/Customer');

// Create Bill
exports.createBill = async (req, res) => {
  try {
    const { billId, amount, pdfLink, customerId } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newBill = await Bill.create({
      billId,
      amount,
      pdfLink,
      customer: customer._id
    });
    return res.status(201).json(newBill);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating bill', error });
  }
};

// Update Bill
exports.updateBill = async (req, res) => {
  try {
    const { billId } = req.params;
    const updates = req.body;
    const updatedBill = await Bill.findOneAndUpdate({ billId }, updates, {
      new: true
    });
    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    return res.status(200).json(updatedBill);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating bill', error });
  }
};

// Delete Bill (admin only)
exports.deleteBill = async (req, res) => {
  try {
    const { billId } = req.params;
    const bill = await Bill.findOneAndDelete({ billId });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    return res.status(200).json({ message: 'Bill deleted', bill });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting bill', error });
  }
};

// Get all Bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('customer');
    return res.status(200).json(bills);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching bills', error });
  }
};
