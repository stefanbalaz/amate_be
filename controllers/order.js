const Order = require("../schemas/order");
const Partner = require("../schemas/partner");
const Merchant = require("../schemas/merchant");
const { generateOrderNumber } = require("../modules/orderNumber");
const _ = require("lodash");

const createOrder = async (req, res) => {
  //  console.log("BODY", req.body);
  try {
    const {
      orderNumber,
      orderPartner,
      orderStatus,
      orderCreationDate,
      orderNote,
      orderPayment,
      orderDelivery,
      orderProduct,
      orderPackaging,
    } = req.body;

    const orderNumberInput = orderNumber
      ? orderNumber
      : await generateOrderNumber();

    // Fetch partner to filter active addresses
    const partner = await Partner.findById(orderPartner?.ID);

    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }

    // Retrieve internalMerchantID from the partner data
    const internalMerchantID = partner.internalMerchantID;
    // console.log("internalMerchantID", internalMerchantID);

    // Retrieve orderMerchant based on internalMerchantID
    const orderMerchant = await Merchant.findById(internalMerchantID);
    //  console.log("orderMerchant", orderMerchant);
    if (!orderMerchant) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    // Find the registration data
    // const partnerRegistration = partner.partnerRegistration;

    // Filter active delivery addresses
    const activeDeliveryAddress = partner.partnerDeliveryAddress.find(
      (address) => address.active === true
    );

    // Filter active billing addresses
    const activeBillingAddress = partner.partnerBillingAddress.find(
      (address) => address.active === true
    );

    // Filter active price
    const activePrice = partner.partnerProductPrice.find(
      (price) => price.active === true
    );

    // Filter active merchant billing address
    const activeMerchantBillingAddress =
      orderMerchant.merchantBillingAddress.find(
        (address) => address.active === true
      );

    const orderDeliveryExtended = {
      method: orderDelivery?.method,
      methodDetail: orderDelivery?.methodDetail,
      date: orderDelivery?.date,
      region: orderDelivery?.region,
      orderDeliveryAddressId: activeDeliveryAddress
        ? activeDeliveryAddress?._id
        : null,
    };

    const orderPaymentExtended = {
      method: orderPayment?.method,
      record: orderPayment?.record,
      recordIssuanceDate: orderPayment?.recordIssuanceDate,
      invoiceNumber: orderPayment?.invoiceNumber,
      dueDate: orderPayment?.dueDate,
      status: orderPayment?.status,
      orderPartnerBillingAddressId: activeBillingAddress
        ? activeBillingAddress?._id
        : null,
      partnerProductPriceId: activePrice ? activePrice._id : null,
    };

    const orderMerchantExtended = {
      ID: orderMerchant?.ID,
      merchantBillingAddressId: activeMerchantBillingAddress
        ? activeMerchantBillingAddress?._id
        : null,
    };

    const order = await Order.create({
      orderNumber: orderNumberInput,
      orderPartner: {
        ID: orderPartner?.ID,
        externalOrderNumber: orderPartner?.externalOrderNumber,
      },
      orderStatus,
      orderCreationDate,
      orderNote,
      orderPayment: orderPaymentExtended,
      orderDelivery: orderDeliveryExtended,
      orderProduct,
      orderPackaging,
      orderMerchant: orderMerchantExtended,
    });

    if (order) {
      await Partner.findByIdAndUpdate(orderPartner?.ID, {
        $push: { partnerOrders: order?._id },
      });

      //      console.log("controller partner", partner);
      //      console.log("controller order", order);
      res.status(201).json(order);
    } else {
      res.status(400).json({ error: "Failed to create order" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Assuming the route parameter is named "orderId"
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updateFields = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updateNestedFields = (obj, fieldsToUpdate) => {
      for (const key in fieldsToUpdate) {
        if (typeof fieldsToUpdate[key] === "object" && obj[key]) {
          updateNestedFields(obj[key], fieldsToUpdate[key]);
        } else if (obj[key] !== undefined) {
          obj[key] = fieldsToUpdate[key];
        }
      }
    };

    // console.log("Received updateFields:", updateFields);

    // Update orderStatus
    if (updateFields.orderStatus) {
      order.orderStatus = updateFields.orderStatus;
    }

    // Update orderPayment.status specifically
    if (updateFields.orderPayment && updateFields.orderPayment.status) {
      order.orderPayment.status = updateFields.orderPayment.status;
    }

    // Update invoiceNumber specifically
    if (
      updateFields.orderPayment &&
      updateFields.orderPayment.invoiceNumber !== undefined
    ) {
      order.orderPayment.invoiceNumber =
        updateFields.orderPayment.invoiceNumber;
    } else if (
      updateFields.orderPayment &&
      updateFields.orderPayment.invoiceNumber === ""
    ) {
      // If the invoiceNumber is explicitly set to an empty string, you can set it to null or handle it as needed
      order.orderPayment.invoiceNumber = null;
    }

    // Update other nested properties if needed
    updateNestedFields(order.orderPayment, updateFields);

    // console.log("Updated order:", order);
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error during order update:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
};
