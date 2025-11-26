const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/userModel");

const doctorsRoutes = require('./routes/doctors');
const medicinesRoutes = require('./routes/medicines');
const appointmentsRoutes = require('./routes/appointments');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const consultationRoutes = require('./routes/consultations'); // New route
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
let mongodbDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/gram_arogya_db", {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB:", error);
    });
};

// Routes
app.get('/', (req, res) => res.send('Gram Arogya Backend is running'));
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/medicines', medicinesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/consultations', consultationRoutes); // New route

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  mongodbDB();
  console.log(`app is running on port ${port}`);
});
