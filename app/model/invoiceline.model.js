const dbconector = require("./db.js");

// constructor
const InvoiceLine = function(line) {
    this.idinvoiceline = line.idinvoiceline;
    this.cost = line.cost;
    this.prodref_fk = line.prodref_fk;
    this.invoicenumber_fk = line.invoicenumber_fk;
    this.prodamount = line.prodamount;
};

InvoiceLine.getAll = result => {
    let query = "SELECT * FROM invoiceline;";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("invoiceline: ", res);
        result(null, res);
    });
};

InvoiceLine.getById = (idinvoiceline, result) => {
    let query = "SELECT * FROM invoiceline WHERE idinvoiceline = :idinvoiceline;";

    let values = {
        idinvoiceline: idinvoiceline
    };

    dbconector.query(query, values, (err, res) => {

        console.log(res);

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found invoiceline: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found invoiceline with the id
        result({ kind: "not_found" }, null);
    });
};

InvoiceLine.insertInvoiceLine = (new_line, result) => {
    let query = "INSERT " +
            "INTO invoiceline (cost, prodref_fk, invoicenumber_fk, prodamount) " +
            "VALUES ( :cost, :prodref_fk, :invoicenumber_fk, :prodamount );";

    console.log(new_line);
    
    values = {
        cost: new_line.cost,
        prodref_fk: new_line.prodref_fk,
        invoicenumber_fk: new_line.invoicenumber_fk,
        prodamount: new_line.prodamount
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created invoiceline: ", { id: res.idinvoiceline, ...new_line });
        
        result(null, { id: res.idinvoiceline, ...new_line });
    });
}

InvoiceLine.updateInvoiceLine = (line, result) => {
    let query = "UPDATE `store`.`invoiceline` " +
                "SET `cost` = :cost, `prodref_fk` = :prodref_fk, `invoicenumber_fk` = :invoicenumber_fk, `prodamount` = :prodamount " +
                "WHERE `idinvoiceline` = :idinvoiceline;";

    console.log(line);

    values = {
        cost: line.cost,
        prodref_fk: line.prodref_fk,
        invoicenumber_fk: line.invoicenumber_fk,
        prodamount: line.prodamount,
        idinvoiceline: line.idinvoiceline
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
          
        if (res.affectedRows == 0) {
            // not found invoice line with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated invoice line: ", { id: line.idinvoiceline, ...line });

        result(null, { id: line.idinvoiceline, ...line });
    });

    console.log(sql.sql);
}


InvoiceLine.removeInvoiceLine = (idinvoiceline, result) => {
    let query = "DELETE FROM invoiceline WHERE idinvoiceline = :idinvoiceline;";

    let values = {
        idinvoiceline: idinvoiceline
    };

    dbconector.query(query, values, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

        if (res.affectedRows == 0) {
            // not found invoice line with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted invoice line with idinvoiceline: ", idinvoiceline);
        result(null, res);
    });
};

InvoiceLine.removeAllInvoiceLines = result => {

    let query = "DELETE FROM invoiceline";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
    }

        console.log(`deleted ${res.affectedRows} invoicelines`);
        result(null, res);
    });
};

module.exports = InvoiceLine;    
