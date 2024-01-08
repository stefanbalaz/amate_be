const Order = require("../schemas/order");

// Function to generate a random number between a range
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate a unique order number
const generateOrderNumber = async () => {
  const prefix = "AMT-";
  let isUnique = false;
  let orderNumberInput;

  while (!isUnique) {
    const randomNumber1 = generateRandomNumber(100, 999);
    const randomNumber2 = generateRandomNumber(100, 999);

    orderNumberInput = `${prefix}${randomNumber1}-${randomNumber2}`;

    // Check if the generated order number already exists in the database
    const existingOrder = await Order.findOne({
      orderNumber: orderNumberInput,
    });

    if (!existingOrder) {
      isUnique = true;
    }
  }

  return orderNumberInput;
};

module.exports = { generateOrderNumber };
