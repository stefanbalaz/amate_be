const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerSchema = new Schema({
  partnerRegistration: {
    _id: false,
    gender: {
      type: String,
      enum: ["female", "male", "undefined"],
    },
    salutation: {
      type: String,
    },
    forename: {
      type: String,
    },
    surname: {
      type: String,
    },
    userName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    web: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  partnerDisplayName: {
    type: String,
  },
  partnerRole: {
    type: String,
    enum: ["admin", "customer", "employee"],
    default: "customer",
    /* required: true, */
  },
  partnerRelationType: {
    type: String,
    enum: ["private", "business"],
    /* required: true, */
  },
  partnerBusinessType: {
    type: String,
    enum: [
      "establishment",
      "distributor",
      "store",
      "end_customer",
      "office",
      "festival",
      "fulfillment",
    ],
  },
  partnerNote: {
    type: String,
  },
  partnerProductPrice: [
    {
      // _id: false,
      drinkNet: {
        type: Number,
        required: true,
      },
      drinkReducedNet: {
        type: Number,
      },
      VAT: {
        type: Number,
        default: 0.2,
        required: true,
      },
      depositGlass: {
        type: Number,
        default: 0.13,
        required: true,
      },
      depositPET: {
        type: Number,
        default: 0.15,
        required: true,
      },
      depositCardboard: {
        type: Number,
        default: 0,
        required: true,
      },
      depositCrate: {
        type: Number,
        default: 1.66,
        required: true,
      },
      depositPalette: {
        type: Number,
        default: 7,
        required: true,
      },
      currency: {
        type: String,
        default: "€",
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  partnerDeliveryAddress: [
    {
      // _id: false,
      gender: {
        type: String,
        enum: ["female", "male", "undefined"],
      },
      salutation: {
        type: String,
      },
      forename: {
        type: String,
      },
      surname: {
        type: String,
      },
      companyName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
      },
      streetNameNumber: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  partnerBillingAddress: [
    {
      // _id: false,
      gender: {
        type: String,
        enum: ["female", "male", "undefined"],
      },
      salutation: {
        type: String,
      },
      forename: {
        type: String,
      },
      surname: {
        type: String,
      },
      companyName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
      },
      streetNameNumber: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      active: {
        type: Boolean,
        default: true,
      },
      taxID: {
        type: String,
      }, // DIČ
      VATRegNo: {
        type: String,
      }, // IČ-DPH
      businessID: {
        type: String,
      }, // IČO
      bankName: {
        type: String,
      },
      IBAN: {
        type: String,
      },
      BIC: {
        type: String,
      },
    },
  ],
  internalMerchantID: {
    type: String,
  },
  partnerOrders: [
    {
      _id: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("Partner", partnerSchema);
