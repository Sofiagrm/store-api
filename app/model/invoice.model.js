const dbconector = require("../model/db.js");

// constructor
const Invoice = function(invoice) {
    this.totalcost = invoice.totalcost;
    this.invoicenumber = invoice.invoicenumber;
    this.invoicedate = invoice.invoicedate;
 };

Invoice.getAll = result => {
    let query = "SELECT * FROM invoice;";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("invoice: ", res);
        result(null, res);
    });
};

Invoice.getByInvoiceNumber = (invoicenumber, result) => {
    let query = "SELECT * FROM invoice WHERE invoicenumber = :invoicenumber;";

    let values = {
        invoicenumber: invoicenumber
    };

    dbconector.query(query, values, (err, res) => {

        console.log(res);

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found invoice: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Invoice with the id
        result({ kind: "not_found" }, null);
    });
};

Invoice.insertInvoice = (new_invoice, result) => {
    let query = "INSERT " +
            "INTO invoice (invoicenumber, invoicedate, totalcost) " +
            "VALUES ( :invoicenumber , :invoicedate, :totalcost );";

    console.log(new_invoice);
    
    values = {
        totalcost: new_invoice.totalcost,
        invoicedate: new_invoice.invoicedate,
        invoicenumber: new_invoice.invoicenumber
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created invoice: ", { id: res.idinvoice, ...new_invoice });
        
        result(null, { id: res.idinvoice, ...new_invoice });
    });
}

Invoice.updateInvoice = (invoice, result) => {
    let query = "UPDATE `store`.`invoice` " +
                "SET `invoicedate` = :invoicedate, `totalcost` = :totalcost " +
                "WHERE `invoicenumber` = :invoicenumber;";

    values = {
        invoicedate: invoice.invoicedate,
        totalcost: invoice.totalcost,
        invoicenumber: invoice.invoicenumber
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
          
        if (res.affectedRows == 0) {
            // not found Invoice with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated Invoice: ", { invoicenumber: invoice.invoicenumber, ...invoice });

        result(null, { invoicenumber: invoice.invoicenumber, ...invoice });
    });  
}


Invoice.removeInvoice = (invoicenumber, result) => {
    let query = "DELETE FROM invoice WHERE invoicenumber = :invoicenumber;";

    let values = {
        invoicenumber: invoicenumber
    };

    dbconector.query(query, values, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

        if (res.affectedRows == 0) {
            // not found Invoice with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted invoice with number: ", invoicenumber);
        result(null, res);
    });
};

Invoice.removeAllInvoices = result => {

    let query = "DELETE FROM invoice";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
    }

        console.log(`deleted ${res.affectedRows} invoices`);
        result(null, res);
    });
};

Invoice.getInvoiceLinesOfInvoice = (invoicenumber, result) => {
    let query = "SELECT * " + 
                "FROM store.invoiceline AS invoiceline, store.invoice AS invoice " +
                "WHERE invoice.invoicenumber = invoiceline.invoicenumber_fk " + 
                "AND invoice.invoicenumber = :invoicenumber;";

    values = {
        invoicenumber: invoicenumber
    }

    dbconector.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("getInvoiceLinesOfInvoice: ", res);
        result(null, res);
    });
};

module.exports = Invoice;    
