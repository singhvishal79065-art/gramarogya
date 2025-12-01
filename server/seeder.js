const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin',
                isApproved: true
            },
            {
                name: 'Dr. John Doe',
                email: 'doctor@gmail.com',
                password: hashedPassword,
                role: 'doctor',
                specialization: 'Cardiologist',
                experience: 10,
                fees: 1000,
                address: 'City Hospital, Mumbai',
                isApproved: true
            },
            {
                name: 'Dr. Sarah Smith',
                email: 'sarah@gmail.com',
                password: hashedPassword,
                role: 'doctor',
                specialization: 'Dentist',
                experience: 5,
                fees: 500,
                address: 'Smile Clinic, Delhi',
                isApproved: true
            },
            {
                name: 'Dr. Amit Patel',
                email: 'amit@gmail.com',
                password: hashedPassword,
                role: 'doctor',
                specialization: 'Dermatologist',
                experience: 8,
                fees: 800,
                address: 'Skin Care Center, Bangalore',
                isApproved: false // Pending approval
            },
            {
                name: 'Patient User',
                email: 'patient@gmail.com',
                password: hashedPassword,
                role: 'patient',
                address: '123 Main St, Mumbai',
                phone: '9876543210'
            },
            {
                name: 'Rahul Kumar',
                email: 'shop@gmail.com',
                password: hashedPassword,
                role: 'shopkeeper',
                shopName: 'Rahul Medicos',
                address: 'Market Road, Pune',
                isApproved: true
            }
        ];

        const createdUsers = await User.insertMany(users);
        const shopkeeper = createdUsers.find(u => u.role === 'shopkeeper');

        const products = [
            {
                name: 'Paracetamol',
                description: 'Fever and pain relief',
                price: 20,
                quantity: 100,
                shopkeeper: shopkeeper._id,
                image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/VK/FQ/EG/25828886/paracetamol-tablet-ip-500mg.jpg'
            },
            {
                name: 'Cough Syrup',
                description: 'Relief from dry cough',
                price: 85,
                quantity: 50,
                shopkeeper: shopkeeper._id,
                image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/326752003/OW/QZ/GL/193279169/100-ml-ambroxol-hydrochloride-terbutaline-sulphate-guaiphenesin-and-menthol-syrup.jpg'
            },
            {
                name: 'Vitamin C',
                description: 'Immunity booster supplements',
                price: 150,
                quantity: 200,
                shopkeeper: shopkeeper._id,
                image: 'https://m.media-amazon.com/images/I/71X8NdnCsvL.jpg'
            }
        ];

        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
