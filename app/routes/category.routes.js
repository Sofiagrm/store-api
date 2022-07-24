module.exports = app => {
    let router = require("express").Router();
    const categories = require("../controllers/category.controller.js");

    // Retrieve all product
    router.get("/", categories.findAll);
    router.get("/:catref", categories.findByCatRef);
    router.get("/stocks/bycat", categories.getStockByCategory);
    router.post("/", categories.create);
    router.put("/", categories.update);
    router.delete("/:catref", categories.delete);
    router.delete("/", categories.deleteAll
    );
    
    app.use('/api/categories', router);
}