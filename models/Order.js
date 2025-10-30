const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: String,
            price: Number,
            qty: Number
        }
    ],
    amount: { type: Number, required: true }, // in rupees (or smallest unit you prefer)
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
