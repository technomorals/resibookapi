const Sales = require('../Model/SalesModel'); // Path to your Sales model
const Site = require('../Model/SiteModel'); // Path to Site model
const Property = require('../Model/PropertyModel'); // Path to Property model
const PaymentStatusMaster = require('../Model/MasterModels/PaymentStatusMaster'); // Path to PaymentStatusMaster model
const PropertyStatusMaster = require('../Model/MasterModels/PropertyStatusMaster'); // Path to PropertyStatusMaster model
const User = require('../Model/UserModel'); // Path to Users model

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const { site_id, property_id, buyer_id, seller_id, sale_price, total_paid, remaining_balance, payment_status, sale_status, documents, remarks } = req.body;

    // Check if the site exists
    const site = await Site.findById(site_id);
    if (!site) {
      return res.json({
        status: false,
        message: 'Site not found',
        data: null,
        error: null,
      });
    }

    // Check if the property exists
    const property = await Property.findById(property_id);
    if (!property) {
      return res.json({
        status: false,
        message: 'Property not found',
        data: null,
        error: null,
      });
    }

    // Check if the buyer exists
    const buyer = await User.findById(buyer_id);
    if (!buyer) {
      return res.json({
        status: false,
        message: 'Buyer not found',
        data: null,
        error: null,
      });
    }

    // Check if the seller exists
    const seller = await User.findById(seller_id);
    if (!seller) {
      return res.json({
        status: false,
        message: 'Seller not found',
        data: null,
        error: null,
      });
    }

    // Check if PaymentStatusMaster exists
    const paymentStatusDoc = await PaymentStatusMaster.findById(payment_status);
    if (!paymentStatusDoc) {
      return res.json({
        status: false,
        message: 'Payment status not found',
        data: null,
        error: null,
      });
    }

    // Check if PropertyStatusMaster exists
    const saleStatusDoc = await PropertyStatusMaster.findById(sale_status);
    if (!saleStatusDoc) {
      return res.json({
        status: false,
        message: 'Sale status not found',
        data: null,
        error: null,
      });
    }

    // Create a new sale
    const newSale = new Sales({
      site_id,
      property_id,
      buyer_id,
      seller_id,
      sale_price,
      total_paid,
      remaining_balance,
      payment_status,
      sale_status,
      documents,
      remarks,
      created_by: req.user._id, // Assuming req.user is populated with the logged-in user
    });

    const savedSale = await newSale.save();

    return res.json({
      status: true,
      message: 'Sale created successfully',
      data: savedSale,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error creating Sale',
      data: null,
      error: error.message,
    });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find()
      .populate('site_id property_id buyer_id seller_id payment_status sale_status documents.created_by') // Populate related fields
      .exec();

    if (!sales.length) {
      return res.json({
        status: false,
        message: 'No sales found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Sales retrieved successfully',
      data: sales,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving sales',
      data: null,
      error: error.message,
    });
  }
};

// Get a specific sale by ID
exports.getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await Sales.findById(id)
      .populate('site_id property_id buyer_id seller_id payment_status sale_status documents.created_by'); // Populate related fields

    if (!sale) {
      return res.json({
        status: false,
        message: 'Sale not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Sale retrieved successfully',
      data: sale,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error retrieving sale',
      data: null,
      error: error.message,
    });
  }
};

// Update a sale by ID
exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const { sale_price, total_paid, remaining_balance, payment_status, sale_status, documents, remarks } = req.body;

  try {
    const updatedSale = await Sales.findByIdAndUpdate(
      id,
      { sale_price, total_paid, remaining_balance, payment_status, sale_status, documents, remarks },
      { new: true } // Return the updated document
    );

    if (!updatedSale) {
      return res.json({
        status: false,
        message: 'Sale not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Sale updated successfully',
      data: updatedSale,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error updating Sale',
      data: null,
      error: error.message,
    });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await Sales.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.json({
        status: false,
        message: 'Sale not found',
        data: null,
        error: null,
      });
    }

    return res.json({
      status: true,
      message: 'Sale deleted successfully',
      data: deletedSale,
      error: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'Error deleting Sale',
      data: null,
      error: error.message,
    });
  }
};
