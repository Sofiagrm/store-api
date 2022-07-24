const express = require("express");
const cors = require("cors");

// inicialize de aplication
const store_api_server = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

// configurations that allow requests from origin 
store_api_server.use(cors(corsOptions));

// parse requests of content-type - application/json
store_api_server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
store_api_server.use(express.urlencoded({ extended: true }));

// simple route
store_api_server.get("/", (req, res) => {

    let data = {
        message: "welcome to my store!"
    }

    res.json(data);
});
  

require("./app/routes/product.routes.js")(store_api_server);
require("./app/routes/category.routes.js")(store_api_server);
require("./app/routes/invoice.routes.js")(store_api_server);
require("./app/routes/invoiceline.routes.js")(store_api_server);

// set port, listen for requests
const PORT = process.env.PORT || 8081;

// start server listener
store_api_server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
