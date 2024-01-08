const Merchant = require("../schemas/merchant");

const createMerchant = async (req, res) => {
  try {
    const newMerchant = new Merchant(req.body);
    const merchant = await newMerchant.save();

    res.status(201).json({ success: true, data: merchant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.status(200).json({ success: true, data: merchants });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMerchantById = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      return res
        .status(404)
        .json({ success: false, error: "Merchant not found" });
    }
    res.status(200).json({ success: true, data: merchant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createMerchant,
  getAllMerchants,
  getMerchantById,
};
