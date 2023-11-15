const Partner = require("../schemas/partner");

const createPartner = async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    const partner = await newPartner.save();

    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPartner,
};
