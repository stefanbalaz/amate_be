const mongoose = require("mongoose");
const { Schema } = mongoose;

const merchantSchema = new Schema({
  merchantRegistration: {
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
  merchantDisplayName: {
    type: String,
  },
  merchantRelationType: {
    type: String,
    enum: ["private", "business"],
    required: true,
  },
  merchantNote: {
    type: String,
  },
  merchantBillingAddress: [
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
});

module.exports = mongoose.model("merchant", merchantSchema);
