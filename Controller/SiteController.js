const Site = require('../Model/SiteModel'); // Path to your Site model
const User = require('../Model/UserModel'); // Path to Users model
const AmenitiesMaster = require('../Model/MasterModels/AmenitiesMaster'); // Path to AmenitiesMaster model


// Create a new site
exports.createSite = async (req, res) => {
    try {
      const { name, description, address, pincode, country, state, city, latitude, longitude, owner_id, is_active, is_verified, images, site_type, amenities } = req.body;
  
      // Check if the owner exists
      const owner = await User.findById(owner_id);
      if (!owner) {
        return res.json({
          status: false,
          message: 'Owner not found',
          data: null,
          error: null,
        });
      }
  
      // Check if amenities exist
      if (amenities && amenities.length > 0) {
        const foundAmenities = await AmenitiesMaster.find({ '_id': { $in: amenities } });
        if (foundAmenities.length !== amenities.length) {
          return res.json({
            status: false,
            message: 'One or more amenities not found',
            data: null,
            error: null,
          });
        }
      }
  
      // Create a new site
      const newSite = new Site({
        name,
        description,
        address,
        pincode,
        country,
        state,
        city,
        latitude,
        longitude,
        owner_id,
        is_active,
        is_verified,
        images,
        site_type,
        created_by: owner_id, // Assuming req.user contains the logged-in user
        amenities,
      });
  
      const savedSite = await newSite.save();
  
      return res.json({
        status: true,
        message: 'Site created successfully',
        data: savedSite,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Error creating site',
        data: null,
        error: error.message,
      });
    }
  };
  
  // Get all sites
  exports.getAllSites = async (req, res) => {
    try {
      const sites = await Site.find()
        .populate('owner_id created_by amenities') // Populate references
        .exec();
  
      if (!sites.length) {
        return res.json({
          status: false,
          message: 'No sites found',
          data: null,
          error: null,
        });
      }
  
      return res.json({
        status: true,
        message: 'Sites retrieved successfully',
        data: sites,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Error retrieving sites',
        data: null,
        error: error.message,
      });
    }
  };
  
  // Get a specific site by ID
  exports.getSiteById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const site = await Site.findById(id)
        .populate('owner_id created_by amenities') // Populate references
  
      if (!site) {
        return res.json({
          status: false,
          message: 'Site not found',
          data: null,
          error: null,
        });
      }
  
      return res.json({
        status: true,
        message: 'Site retrieved successfully',
        data: site,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Error retrieving site',
        data: null,
        error: error.message,
      });
    }
  };
  
  // Update a site by ID
  exports.updateSite = async (req, res) => {
    const { id } = req.params;
    const { name, description, address, pincode, country, state, city, latitude, longitude, is_active, is_verified, images, site_type, amenities } = req.body;
  
    try {
      const updatedSite = await Site.findByIdAndUpdate(
        id,
        { name, description, address, pincode, country, state, city, latitude, longitude, is_active, is_verified, images, site_type, amenities },
        { new: true } // Return the updated document
      );
  
      if (!updatedSite) {
        return res.json({
          status: false,
          message: 'Site not found',
          data: null,
          error: null,
        });
      }
  
      return res.json({
        status: true,
        message: 'Site updated successfully',
        data: updatedSite,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Error updating site',
        data: null,
        error: error.message,
      });
    }
  };
  
  // Delete a site by ID
  exports.deleteSite = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedSite = await Site.findByIdAndDelete(id);
  
      if (!deletedSite) {
        return res.json({
          status: false,
          message: 'Site not found',
          data: null,
          error: null,
        });
      }
  
      return res.json({
        status: true,
        message: 'Site deleted successfully',
        data: deletedSite,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Error deleting site',
        data: null,
        error: error.message,
      });
    }
  };