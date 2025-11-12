const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/", async (req, res) => {
    const cart = await Cart.findOne({ userId: req.session.user._id }).populate("products.productId");
    res.render("cart", { cart });
});

router.post("/add/:id", async (req, res) => {
    const userId = req.session.user._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.id);
    if (productIndex > -1) {
        cart.products[productIndex].quantity++;
    } else {
        cart.products.push({ productId: req.params.id, quantity: 1 });
    }

    await cart.save();
    res.redirect("/cart");
});

module.exports = router;
