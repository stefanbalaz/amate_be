const fs = require("fs");
const http = require("http");

const filePath = "./a.csv"; // Replace this with your CSV file path
const endpoint = "http://localhost:8000/partner"; // Replace this with your endpoint

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    const postData = {
      partnerRegistration: {
        gender: currentLine[0].trim(),
        forename: currentLine[1].trim(),
        // Add other partnerRegistration properties here based on their column index
      },
      partnerProductPrice: [
        {
          drinkNet: currentLine[15].trim(),
          VAT: currentLine[16].trim(),
          // Add other partnerProductPrice properties here based on their column index
        },
      ],
      partnerDeliveryAddress: [
        {
          gender: currentLine[17].trim(),
          streetNameNumber: currentLine[18].trim(),
          // Add other partnerDeliveryAddress properties here based on their column index
        },
      ],
      // Add other nested structures similarly
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(endpoint, options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        console.log(`Successfully posted data for row ${i}:`, responseBody);
      });
    });

    req.on("error", (error) => {
      console.error(`Failed to post data for row ${i}:`, error.message);
    });

    req.write(JSON.stringify(postData));
    req.end();
  }
});
