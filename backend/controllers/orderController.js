const Order = require('../model/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;
        const order = new Order({ user, items, totalAmount, status: 'completed' }); // Mock payment success
        await order.save();
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const { userId, role } = req.query;
        let query = {};
        if (role === 'patient') {
            query = { user: userId };
        }
        // Shopkeeper/Admin sees all orders or filter logic can be added
        const orders = await Order.find(query).populate('user', 'name').populate('items.medicine', 'name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
