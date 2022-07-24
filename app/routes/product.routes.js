module.exports = app => {
    let router = require("express").Router();
    const products = require("../controllers/product.controller.js");

    // Retrieve all product
    router.get("/", products.findAll);
    router.get("/cat/:catref", products.findAllByCatRef);
    router.get("/:prodref", products.findByProdRef);
    router.post("/", products.create);
    router.put("/", products.update);
    router.delete("/:prodref", products.delete);
    router.delete("/", products.deleteAll
    );
    
    app.use('/api/products', router);
}

