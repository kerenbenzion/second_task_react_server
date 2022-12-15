const Order = require("../models/Order");

function create_order(req, res) {
    var products = req.body.products;
    var total = req.body.total;
    if (products == null) {
        res.status(400).send("You did not enter all the needed parameters :( Please try again")
    } else {
        const order = new Order({
            products: products,
            total: total
        });
        order.save().then(res.status(200).send('success'))
    }
}

function get_orders(req, res) {
    Order.find().then(results => {
        res.json(results)
    });
}
function getorder(req, res) {
    let id = req.params.id
    Order.findById(id, function (err, response) {
        console.log(response)
        if (response != null) {
            res.status(200).json(response)
        }
        else {
            res.status(400).send("order not found in db")
        }
    })
}
function getorderspage(req, res) {
    if (req.session.username != "admin") {
        res.render('../views/404.ejs')
    } else {
        res.render('../views/orders.ejs', { username: req.session.username });
    }

}
function deletebyusername(req, res) {
    Order.findOne({
        "username": req.params.username
    })
        .then(results => {
            Order.findByIdAndDelete(results.id).then(() => res.send('success')).catch(() => res.send('Failure'));
        });
}
function getByname(req, res) {
    Order.find({
        "username": req.params.username
    })
        .then(results => {
            res.json(results)
        });
}


function updatebyid(req, res) {
    Order.findByIdAndUpdate(req.params.id, req.body,
        function (err, r) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(r);
            }
        });

}

function deleteorder(req, res) {
    let id = req.params.id
    Order.findByIdAndDelete(id, function (err, response) {
        console.log(response)
        if (response != null) {
            res.send("success")
        }
        else {
            res.status(400).send("order not found in db")
        }
    })

}
module.exports = {
    create_order,
    get_orders,
    getByname,
    deletebyusername,
    updatebyid,
    getorderspage,
    deleteorder,
    getorder
}