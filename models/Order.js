const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    _id: { type: mongoose.ObjectId, auto: true },
    products: {
        type: [String],
        required: true,
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Order", Order);
