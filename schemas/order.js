const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  orderPartner: {
    ID: {
      type: Schema.Types.ObjectId,
      ref: "Partner",
    },
    externalOrderNumber: {
      type: String,
    },
    /*     partnerRegistration: {
      type: Schema.Types.Mixed,
      ref: "Partner.partnerRegistration",
    }, */
  },
  orderStatus: {
    type: String,
    default: "preliminary_order",
    enum: [
      "preliminary_order",
      "confirmed_order",
      "goods_in_preparation",
      "goods_prepared",
      "goods_in_delivery",
      "goods_delivered",
      "issue_invoice",
      "invoice_issued",
      "processed_order",
      "entered_in_fulfillment_system",
      "pick_up_bottles",
      "bottles_picked_up",
      "deliver_samples",
      "samples_delivered",
    ],
  },
  orderCreationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  orderNote: {
    type: String,
  },
  orderPayment: {
    method: {
      type: String,
      enum: ["bank_transfer", "cash", "free_of_charge", "internal_transaction"],
    },
    record: {
      type: String,
      enum: [
        "invoice",
        "cash_receipt",
        "promotion",
        "missing_document",
        "internal_transaction",
      ],
    },
    recordIssuanceDate: {
      type: Date,
    },
    invoiceNumber: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "unpaid",
      enum: [
        "paid",
        "unpaid",
        "free",
        "long_term_debt",
        "first_reminder_sent",
        "second_reminder_sent",
        "internal_transaction",
      ],
    },
    reminderSentDate: {
      type: Date,
    },
    receivedDate: {
      type: Date,
    },
    orderPartnerBillingAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Partner.partnerBillingAddress",
    },
    partnerProductPriceId: {
      type: Schema.Types.ObjectId,
      ref: "Partner.partnerProductPrice",
    },
  },
  orderDelivery: {
    method: {
      type: String,
      enum: [
        "manufacturer_delivery",
        "warehouse_pickup",
        "manufacturer_shop",
        "external_carrier",
      ],
    },
    methodDetail: {
      type: String,
      enum: [
        "warehouse_ba",
        "warehouse_zm",
        "warehouse_po",
        "bike_courier",
        "rf_pack",
        "foxlog",
      ],
    },
    date: {
      type: Date,
    },
    region: {
      type: String,
      enum: ["BA", "PO"],
    },
    orderDeliveryAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Partner.partnerDeliveryAddress",
    },
  },
  orderProduct: [
    {
      _id: false,
      ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 0,
        required: true,
      },
      batchID: {
        type: String,
      },
      volume: {
        type: Number,
        default: 0.3,
        required: true,
      },
    },
  ],
  orderPackaging: {
    containerMedium: {
      type: String,
      enum: ["glass", "plastic"],
      default: "glass",
      required: true,
    },
    containerMediumReceiptAmount: {
      type: Number,
    },
    transportMedium: {
      type: String,
      enum: ["crate", "cardboard"],
    },
    unitsPerTransportMedium: {
      type: Number,
    },
    transportMediumIssuanceAmount: {
      type: Number,
    },
    transportMediumReceiptAmount: {
      type: Number,
    },
    palletIssuanceAmount: {
      type: Number,
    },
    palletReceiptAmount: {
      type: Number,
    },
  },
  orderMerchant: {
    ID: {
      type: Schema.Types.ObjectId,
      ref: "Merchant",
    },
    /*     merchantRegistration: {
      type: Schema.Types.Mixed,
      ref: "Merchant.merchantRegistration",
    }, */
    merchantBillingAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Merchant.merchantBillingAddress",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
