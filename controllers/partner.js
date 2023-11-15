const Partner = require("../schemas/partner");

const createPartner = async (req, res) => {
  try {
    const {
      partnerRegistration,
      partnerDisplayName,
      partnerRole,
      partnerRelationType,
      partnerBusinessType,
      partnerNote,
      partnerProductPrice,
      partnerDeliveryAddress,
      partnerBillingAddress,
    } = req.body;

    const partner = await Partner.create({
      partnerRegistration,
      partnerDisplayName,
      partnerRole,
      partnerRelationType,
      partnerBusinessType,
      partnerNote,
      partnerProductPrice,
      partnerDeliveryAddress,
      partnerBillingAddress,
    });

    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPartner,
};
