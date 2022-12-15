const { resetWatchers } = require("nodemon/lib/monitor/watch");
const Product = require("../models/Product");
function add_product(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var price = req.body.price;
    var img = req.body.img;
    var description = req.body.description;
    var color = req.body.color;
    if (description == null || img == null || color == null || price == null || name == null) {
        res.status(400).send("You did not enter all the needed parameters :( Please try again")
    } else {
        const product = new Product({
            price: price,
            name: name,
            color: color,
            img: img,
            description: description
        });
        product.save().then(res.status(200).send('success'))
    }
}
function get_products(req, res) {
    Product.find().then(results => {
        res.json(results)
    });
}
function getByname(req, res) {
    Product.find({
        "name": req.params.name
    })
        .then(results => {
            res.json(results)
        });
}

function deleteproduct(req, res) {
    Product.findByIdAndDelete(req.params.id).then(() => res.send('success')).catch(() => res.send('Failure'));
}
function updateproduct(req, res) {
    console.log(req.session)
    Product.findByIdAndUpdate(req.params.id, req.body,
        function (err, r) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(r);
            }
        })
}
module.exports = {
    add_product,
    get_products,
    getByname,
    deleteproduct,
    updateproduct
}