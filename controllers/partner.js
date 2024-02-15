const bcrypt = require("bcrypt");
const Partner = require("../schemas/partner");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

/* GENERATE TOKEN */

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    userName: user.partnerRegistration.userName,
    email: user.partnerRegistration.email,
    // Add other user-related information as needed
  };

  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

/* CREATE PARTNER */

const createPartner = async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    const partner = await newPartner.save();

    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* REGISTER PARTNER */

const registerPartner = async (req, res) => {
  try {
    const { userName, email, password } = req.body || {};

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request payload" });
    }

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

    // Generate a token for the new partner
    const token = generateToken(partner);
    console.log("token", token);
    // Create the modified response object with the token
    const responseData = {
      token,
      user: {
        userName: partner.partnerRegistration.userName,
        authority: ["USER"],
        avatar: "",
        email: partner.partnerRegistration.email,
      },
    };

    // res.status(201).json({ success: true, data: responseData });
    res.status(201).json({ success: true, ...responseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* LOGIN PARTNER */

const loginPartner = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by userName or email
    const user = await Partner.findOne({
      $or: [
        { "partnerRegistration.userName": userName },
        { "partnerRegistration.email": userName },
      ],
    });

    if (user) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(
        password,
        user.partnerRegistration.password
      );

      if (passwordMatch) {
        // Passwords match, handle successful login
        const token = generateToken(user);
        const responseData = {
          token,
          user: {
            userName: user.partnerRegistration.userName,
            authority: ["USER"],
            avatar: "",
            email: user.partnerRegistration.email,
          },
        };
        res.status(200).json({ success: true, ...responseData });
      } else {
        // Password incorrect, handle login failure
        res.status(401).json({ success: false, error: "Invalid credentials" });
      }
    } else {
      // User not found, handle login failure
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* GET ALL PARTNERS */

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
  generateToken,
  createPartner,
  registerPartner,
  loginPartner,
  getAllPartners,
  getPartnerById,
};
