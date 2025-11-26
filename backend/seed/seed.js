require('dotenv').config();
const connectDB = require('../config/db');
const Doctor = require('../model/Doctor');
const Medicine = require('../models/Medicine');

const sampleDoctors = [
  { name: 'Dr. Rahul Sharma', specialty: 'General Physician', phone: '9876543210', email: 'rahul@example.com', experienceYears: 8, fees: 300 },
  { name: 'Dr. Priya Mehta', specialty: 'Pediatrics', phone: '9123456780', email: 'priya@example.com', experienceYears: 6, fees: 350 }
];

const sampleMedicines = [
  { name: 'Paracetamol', brand: 'Acme', description: 'Pain reliever', price: 20, stock: 200, prescriptionRequired: false },
  { name: 'Amoxicillin 500mg', brand: 'HealthCorp', description: 'Antibiotic', price: 60, stock: 100, prescriptionRequired: true }
];

const run = async () => {
  try {
    await connectDB();
    console.log('Seeding data...');

    await Doctor.deleteMany({});
    await Medicine.deleteMany({});

    const docs = await Doctor.insertMany(sampleDoctors);
    const meds = await Medicine.insertMany(sampleMedicines);

    console.log('Inserted doctors:', docs.length);
    console.log('Inserted medicines:', meds.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
