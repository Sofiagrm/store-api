module.exports = app => {
    let router = require("express").Router();
    const invoices = require("../controllers/invoice.controller.js");

    // Retrieve all product
    router.get("/", invoices.findAll);
    router.get("/invoicelines/:invoicenumber", invoices.getInvoiceLinesForInvoice);
    router.get("/:invoicenumber", invoices.findByInvoiceNumber);
    router.post("/", invoices.create);
    router.put("/", invoices.update);
    router.delete("/:invoicenumber", invoices.delete);
    router.delete("/", invoices.deleteAll
    );
    
    app.use('/api/invoices', router);
}