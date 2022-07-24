const Product = require("../model/product.model.js");


// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
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

// Retrieve all products from the database byu category.
exports.findAllByCatRef = (req, res) => {
    Product.getAllByCatRef(req.params.catref, (err, data) => {
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

// Retrieve a single product.
exports.findByProdRef = (req, res) => {
    Product.getByProdRef(req.params.prodref, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Products with category reference ${req.params.catref}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Products with category reference ${req.params.catref}.`
                });
            }
        } else {
            res.send(data);
        } 
    });
};

// create a product
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const product = new Product({
        prodref: req.body.prodref,
        price: req.body.price,
        designation: req.body.designation,
        imgurl: req.body.imgurl,
        stock: req.body.stock,
        prodCat_fk: req.body.prodCat_fk,
        description: req.body.description
    });


    console.log('controller create', req.body);
    console.log('controller create', product);

    Product.insertProduct(product, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Product."
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

    const product = new Product({
        prodref: req.body.prodref,
        price: req.body.price,
        designation: req.body.designation,
        imgurl: req.body.imgurl,
        stock: req.body.stock,
        prodCat_fk: req.body.prodCat_fk,
        description: req.body.description
    });

    Product.updateProduct(product, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Product."
            });

        else res.send(data);
    });
};


exports.delete = (req, res) => {
    Product.removeProduct(req.params.prodref, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with reference ${req.params.prodref}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error deleting Product with reference " + req.params.prodref
                });
            }
        } 
        else {
            res.send(data);
        } 
    });
};


exports.deleteAll = (req, res) => {
    Product.removeAllProducts( (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all products."
            });
        }
        else {
            res.send({ message: `All products were deleted successfully!` });
        }
    });
};