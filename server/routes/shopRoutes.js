const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @route   GET /api/shop/products
// @desc    Get all products
// @access  Public
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({}).populate('shopkeeper', 'shopName');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/shop/products
// @desc    Add a product
// @access  Private (Shopkeeper only)
router.post('/products', protect, authorize('shopkeeper'), async (req, res) => {
    try {
        const { name, description, price, quantity, image } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            quantity,
            image,
            shopkeeper: req.user._id
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/shop/orders
// @desc    Create an order
// @access  Private (Patient only)
router.post('/orders', protect, authorize('patient'), async (req, res) => {
    try {
        const { shopkeeperId, products, totalAmount } = req.body;

        const order = await Order.create({
            patient: req.user._id,
            shopkeeper: shopkeeperId,
            products,
            totalAmount
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/shop/orders
// @desc    Get shopkeeper orders
// @access  Private (Shopkeeper only)
router.get('/orders', protect, authorize('shopkeeper'), async (req, res) => {
    try {
        const orders = await Order.find({ shopkeeper: req.user._id })
            .populate('patient', 'name address phone')
            .populate('products.product', 'name price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
