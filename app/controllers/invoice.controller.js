const { getInvoiceLinesOfInvoice } = require("../model/invoice.model.js");
const Invoice = require("../model/invoice.model.js");


// Retrieve all invoices from the database.
exports.findAll = (req, res) => {
    Invoice.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving invoices."
            });
        }
        else { 
            res.send(data);
        }
    });
};

// Retrieve a single invoice.
exports.findByInvoiceNumber = (req, res) => {
    Invoice.getByInvoiceNumber(req.params.invoicenumber, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found invoice with number ${req.params.invoicenumber}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving invoice with number ${req.params.invoicenumber}.`
                });
            }
        } else {
            res.send(data);
        } 
    });
};

// create a invocie
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const invoice = new Invoice({
        totalcost: req.body.totalcost,
        invoicedate: req.body.invoicedate,
        invoicenumber: req.body.invoicenumber
    });


    console.log('controller create', req.body);
    console.log('controller create', invoice);

    Invoice.insertInvoice(invoice, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Invoice."
            });

        else res.send(data);
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const invoice = new Invoice({
        totalcost: req.body.totalcost,
        invoicedate: req.body.invoicedate,
        invoicenumber: req.body.invoicenumber
    });

    Invoice.updateInvoice(invoice, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Invoice."
            });

        else res.send(data);
    });
};


exports.delete = (req, res) => {
    Invoice.removeInvoice(req.params.invoicenumber, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Invoice with reference ${req.params.invoicenumber}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error deleting Invoice with reference " + req.params.invoicenumber
                });
            }
        } 
        else {
            res.send(data);
        } 
    });
};

exports.deleteAll = (req, res) => {
    Invoice.removeAllInvoices( (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all invoices."
            });
        }
        else {
            res.send({ message: `All invoices were deleted successfully!` });
        }
    });
};


exports.getInvoiceLinesForInvoice = (req, res) => {
    Invoice.getInvoiceLinesOfInvoice(req.params.invoicenumber, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all invoices."
            });
        }
        else {
            res.send(data);
        }
    });
};