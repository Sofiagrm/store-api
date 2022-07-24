const dbconector = require("../model/db.js");

// constructor
const Category = function(category) {
    this.catref = category.catref;
    this.designation = category.designation;
 };

Category.getAll = result => {
    let query = "SELECT * FROM category;";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("category: ", res);
        result(null, res);
    });
};

Category.getByCatRef = (ref, result) => {
    let query = "SELECT * FROM category WHERE catref = :catref;";

    let values = {
        catref: '' + ref
    };

    dbconector.query(query, values, (err, res) => {

        console.log(res);

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Category with the id
        result({ kind: "not_found" }, null);
    });
};

Category.insertCategory = (new_category, result) => {
    let query = "INSERT " +
            "INTO category (designation, catref) " +
            "VALUES ( :designation , :catref );";

    console.log(new_category);
    
    values = {
        catref: new_category.catref,
        designation: new_category.designation,
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created category: ", { id: res.idcategory, ...new_category });
        
        result(null, { id: res.idcategory, ...new_category });
    });

    console.log(sql.sql);
}

Category.updateCategory = (category, result) => {
    let query = "UPDATE `store`.`category` " +
                "SET `designation` = :designation " +
                "WHERE `catref` = :catref;";

    console.log(category);
    console.log(category.catref);
    console.log(category.designation);
    
    values = {
        catref: category.catref,
        designation: category.designation
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
          
        if (res.affectedRows == 0) {
            // not found Category with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated category: ", { catref: category.catref, ...category });

        result(null, { catref: category.catref, ...category });
    });  

    console.log(sql.sql);
}


Category.removeCategory = (ref, result) => {
    let query = "DELETE FROM category WHERE catref = :catref;";

    let values = {
        catref: '' + ref
    };

    dbconector.query(query, values, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

        if (res.affectedRows == 0) {
            // not found Category with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted category with catref: ", ref);
        result(null, res);
    });
};

Category.removeAllCategories = result => {

    let query = "DELETE FROM category";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
    }

        console.log(`deleted ${res.affectedRows} categories`);
        result(null, res);
    });
};

Category.getStockByCategory = result => {
    let query = "SELECT prodCat_fk, SUM(product.stock) as stock " + 
                "FROM store.product AS product, store.category AS category " +
                "WHERE product.prodCat_fk = category.catref " +
                "GROUP BY prodCat_fk;";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("getStockByCategory: ", res);
        result(null, res);
    });
};

module.exports = Category;    
