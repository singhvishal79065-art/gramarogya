const Medicine = require('../model/medicineModel');

exports.addMedicine = async (req, res) => {
    try {
        const { name, description, price, stock, image } = req.body;
        const medicine = new Medicine({ name, description, price, stock, image });
        await medicine.save();
        res.status(201).json({ message: "Medicine added successfully", medicine });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
