const User = require('../model/userModel');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, specialization } = req.body;
        const user = new User({ name, email, password, role, specialization });
        await user.save();
        res.status(201).json({ message: "User created successfully", user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ 
                message: "Login successful", 
                user: { 
                    _id: user._id, 
                    name: user.name, 
                    email: user.email, 
                    role: user.role,
                    specialization: user.specialization
                } 
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
