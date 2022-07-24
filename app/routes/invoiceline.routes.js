module.exports = app => {
    let router = require("express").Router();
    const invoicelines = require("../controllers/invoiceline.controller.js");

    router.get("/", invoicelines.findAll);
    router.get("/:idinvoiceline", invoicelines.findById);
    router.post("/", invoicelines.create);
    router.put("/", invoicelines.update);
    router.delete("/:idinvoiceline", invoicelines.delete);
    router.delete("/", invoicelines.deleteAll
    );
    
    app.use('/api/invoicelines', router);
}