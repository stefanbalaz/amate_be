const bcrypt = require("bcrypt");
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

/* const registerPartner = async (req, res) => {
  try {
    const { userName, email, password } = req.body.partnerRegistration;
    const newPartner = new Partner({
      partnerRegistration: {
        userName,
        email,
        password,
      },
      partnerRole: "customer",
      partnerRelationType: "private",
    });

    const partner = await newPartner.save();

    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; */

const registerPartner = async (req, res) => {
  try {
    const { userName, email, password } = req.body.partnerRegistration;

    // Check if the username or email already exists
    const existingUser = await Partner.findOne({
      $or: [
        { "partnerRegistration.userName": userName },
        { "partnerRegistration.email": email },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new Partner({
      partnerRegistration: {
        userName,
        email,
        password: hashedPassword,
      },
      partnerRole: "customer",
      partnerRelationType: "private",
    });

    const partner = await newPartner.save();

    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const loginPartner = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by userName or email and check the password
    const user = await Partner.findOne({
      $or: [
        { "partnerRegistration.userName": userName },
        { "partnerRegistration.email": userName },
      ],
      "partnerRegistration.password": password,
    });

    if (user) {
      // User found, handle successful login
      res.status(200).json({ success: true, data: "Login successful" });
    } else {
      // User not found or password incorrect, handle login failure
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, error: "Partner not found" });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPartner,
  registerPartner,
  loginPartner,
  getAllPartners,
  getPartnerById,
};
