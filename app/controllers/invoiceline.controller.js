const InvoiceLine = require("../model/invoiceline.model.js");


// Retrieve all invoicelines from the database.
exports.findAll = (req, res) => {
    InvoiceLine.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving invoice lines."
            });
        }
        else { 
            res.send(data);
        }
    });
};

// Retrieve all invoice lines from the database by invoice number.
exports.findById = (req, res) => {
    InvoiceLine.getById(req.params.idinvoiceline, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        }
        else { 
            res.send(data);
        }
    });
};

// create a invoice line
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const line = new InvoiceLine({
        cost: req.body.cost,
        prodref_fk: req.body.prodref_fk,
        invoicenumber_fk: req.body.invoicenumber_fk,
        prodamount: req.body.prodamount
    });

    InvoiceLine.insertInvoiceLine(line, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the invoice line."
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

    const line = new InvoiceLine({
        cost: req.body.cost,
        prodref_fk: req.body.prodref_fk,
        invoicenumber_fk: req.body.invoicenumber_fk,
        prodamount: req.body.prodamount,
        idinvoiceline: req.body.idinvoiceline
    });

    console.log(line);

    InvoiceLine.updateInvoiceLine(line, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while updating the invoice line."
            });

        else res.send(data);
    });
};


exports.delete = (req, res) => {
    InvoiceLine.removeInvoiceLine(req.params.idinvoiceline, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found invoice line with reference ${req.params.idinvoiceline}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error deleting invoice line with reference " + req.params.idinvoiceline
                });
            }
        } 
        else {
            res.send(data);
        } 
    });
};


exports.deleteAll = (req, res) => {
    InvoiceLine.removeAllInvoiceLines( (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all invoice lines."
            });
        }
        else {
            res.send({ message: `All invoice lines were deleted successfully!` });
        }
    });
};