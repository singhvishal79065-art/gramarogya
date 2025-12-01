const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Appointment = require('./models/Appointment');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const inspect = async () => {
    try {
        const appointments = await Appointment.find({});
        let output = `Total Appointments: ${appointments.length}\n`;
        
        for (const apt of appointments) {
            output += `\nAppointment ID: ${apt._id}\n`;
            output += `Doctor ID: ${apt.doctor}\n`;
            output += `Patient ID: ${apt.patient}\n`;
            output += `Date: ${apt.date}\n`;
            
            const doctor = await User.findById(apt.doctor);
            output += `Doctor Name: ${doctor ? doctor.name : 'NOT FOUND'}\n`;
            
            const patient = await User.findById(apt.patient);
            output += `Patient Name: ${patient ? patient.name : 'NOT FOUND'}\n`;
        }
        
        const doctors = await User.find({ role: 'doctor' });
        output += '\n--- All Doctors ---\n';
        doctors.forEach(d => {
            output += `Name: ${d.name}, ID: ${d._id}, Email: ${d.email}\n`;
        });

        fs.writeFileSync('debug_output.txt', output);
        console.log('Output written to debug_output.txt');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

inspect();
