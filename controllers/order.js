const Order = require("../schemas/order");
const Partner = require("../schemas/partner");

const createOrder = async (req, res) => {
  console.log("BODY", req.body);
  try {
    const {
      orderPartner,
      orderStatus,
      orderCreationDate,
      orderNote,
      orderPayment,
      orderDelivery,
      orderProduct,
      orderPackaging,
    } = req.body;

    const order = await Order.create({
      orderPartner,
      orderStatus,
      orderCreationDate,
      orderNote,
      orderPayment,
      orderDelivery,
      orderProduct,
      orderPackaging,
    });

    if (order) {
      const partnerId = orderPartner.ID;
      const partner = await Partner.findByIdAndUpdate(partnerId, {
        $push: { partnerOrders: order._id },
      });

      if (partner) {
        console.log("controller partner", partner);
        console.log("controller order", order);
        res.status(201).json(order);
      } else {
        res.status(404).json({ error: "Partner not found" });
      }
    } else {
      res.status(400).json({ error: "Failed to create order" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
};
