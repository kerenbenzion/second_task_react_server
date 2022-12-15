const { resetWatchers } = require("nodemon/lib/monitor/watch");
const Product = require("../models/Product");
function form(req, res) {
    Product.find({}).then(results => {
        res.render('../views/all_products', { products: results, username: req.session.username });
    })

}
function add_product_page(req, res) {
    res.render('../views/add_product.ejs', { username: req.session.username })
}
function add_product(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var price = req.body.price;
    var color = req.body.color;
    var preview_img = req.body.preview_img;
    var hover_img = req.body.hover_img;
    var description = req.body.description;
    var size = req.body.size;
    var type = req.body.type;
    if (size == null || description == null || hover_img == null || preview_img == null || color == null || price == null || name == null) {
        res.status(400).send("You did not enter all the needed parameters :( Please try again")
    } else {
        const product = new Product({
            price: price,
            name: name,
            color: color,
            preview_img: preview_img,
            hover_img: hover_img,
            type: type,
            description: description,
            size: size
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
    form,
    add_product,
    get_products,
    getByname,
    deleteproduct,
    updateproduct,
    add_product_page
}