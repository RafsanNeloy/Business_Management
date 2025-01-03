const Customer = require('../models/Customer');

// Add customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const customer = await Customer.create({ name, phone, address });
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding customer', error });
  }
};

// Delete customer (admin only)
exports.deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Customer deleted', customer });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting customer', error });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const updates = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updates, {
      new: true
    });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(updatedCustomer);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating customer', error });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching customers', error });
  }
};
