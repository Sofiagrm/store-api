const Category = require("../model/category.model.js");


// Retrieve all categories from the database.
exports.findAll = (req, res) => {
    console.log(Category);
    Category.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        }
        else { 
            res.send(data);
        }
    });
};

// Retrieve a single category.
exports.findByCatRef = (req, res) => {
    Category.getByCatRef(req.params.catref, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with reference ${req.params.catref}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Category with reference " + req.params.catref
          });
        }
      } else {
        res.send(data);
      } 
    });
};

// create a category
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const category = new Category({
        catref: req.body.catref,
        designation: req.body.designation
    });


    console.log('controller create', req.body);
    console.log('controller create', category);

    Category.insertCategory(category, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Category."
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

    console.log(req.body);

    const category = new Category({
        catref: req.body.catref,
        designation: req.body.designation
    });

    console.log(category);

    Category.updateCategory(category, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Category."
            });

        else res.send(data);
    });
};


exports.delete = (req, res) => {
    Category.removeCategory(req.params.catref, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with reference ${req.params.catref}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Error deleting Category with reference " + req.params.catref
                });
            }
        } 
        else {
            res.send(data);
        } 
    });
};


exports.deleteAll = (req, res) => {
    Category.removeAllCategory( (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all categories."
            });
        }
        else {
            res.send({ message: `All categories were deleted successfully!` });
        }
    });
};

exports.getStockByCategory = (req, res) => {
    Category.getStockByCategory((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        }
        else { 
            res.send(data);
        }
    });
}