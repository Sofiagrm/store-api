const dbconector = require("../model/db.js");

// constructor
const Product = function(product) {
    this.prodref = product.prodref;
    this.price = product.price;
    this.designation = product.designation;
    this.imgurl = product.imgurl;
    this.stock = product.stock;
    this.prodCat_fk = product.prodCat_fk;
    this.description = product.description;
 };

Product.getAll = result => {
    let query = "SELECT * FROM product;";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("product: ", res);
        result(null, res);
    });
};

Product.getAllByCatRef = (ref, result) => {
    let query = "SELECT * FROM product WHERE prodCat_fk = :prodCat_fk;";

    let values = {
        prodCat_fk: '' + ref
    };

    dbconector.query(query, values, (err, res) => {

        console.log(res);

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found product: ", res);
            result(null, res);
            return;
        }

        // not found Product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.getByProdRef = (ref, result) => {
    let query = "SELECT * FROM product WHERE prodref = :prodref;";

    let values = {
        prodref: '' + ref
    };

    dbconector.query(query, values, (err, res) => {

        console.log(res);

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.insertProduct = (new_product, result) => {
    let query = "INSERT " +
            "INTO product (designation, price, prodref, imgurl, stock, prodCat_fk, description) " +
            "VALUES ( :designation , :price , :prodref , :imgurl , :stock, :prodCat_fk, :description );";

    console.log(new_product);
    
    values = {
        prodref: new_product.prodref,
        price: new_product.price,
        designation: new_product.designation,
        imgurl: new_product.imgurl,
        stock: new_product.stock,
        prodCat_fk: new_product.prodCat_fk,
        description: new_product.description
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created product: ", { id: res.insertId, ...new_product });
        
        result(null, { id: res.insertId, ...new_product });
    });

    console.log(sql.sql);
}

Product.updateProduct = (product, result) => {
    let query = "UPDATE `store`.`product` " +
                "SET `designation` = :designation, `price` = :price, `imgurl` = :imgurl, `stock` = :stock, `prodCat_fk` = :prodCat_fk, `description` = :description " +
                "WHERE `prodref` = :prodref;";

    console.log(product);
    console.log(product.prodref);
    
    values = {
        prodref: product.prodref,
        price: product.price,
        designation: product.designation,
        imgurl: product.imgurl,
        stock: product.stock,
        prodCat_fk: product.prodCat_fk,
        description: product.description
    };

    let sql = dbconector.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
          
        if (res.affectedRows == 0) {
            // not found Product with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated product: ", { prodref: product.prodref, ...product });

        result(null, { prodref: product.prodref, ...product });
    });  

    console.log(sql.sql);
}


Product.removeProduct = (ref, result) => {
    let query = "DELETE FROM product WHERE prodref = :prodref;";

    let values = {
        prodref: '' + ref
    };

    dbconector.query(query, values, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

        if (res.affectedRows == 0) {
            // not found Prodcut with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted product with prodref: ", ref);
        result(null, res);
    });
};

Product.removeAllProducts = result => {

    let query = "DELETE FROM product";

    dbconector.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
    }

        console.log(`deleted ${res.affectedRows} products`);
        result(null, res);
    });
};

module.exports = Product;    
