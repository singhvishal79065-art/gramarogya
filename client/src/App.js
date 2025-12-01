import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PatientDashboard from './pages/Patient/Dashboard';
import FindDoctors from './pages/Patient/FindDoctors';
import DoctorProfile from './pages/Patient/DoctorProfile';
import DoctorDashboard from './pages/Doctor/Dashboard';
import DoctorAppointments from './pages/Doctor/Appointments';
import DoctorPatients from './pages/Doctor/Patients';
import ShopkeeperDashboard from './pages/Shopkeeper/Dashboard';
import Inventory from './pages/Shopkeeper/Inventory';
import ShopOrders from './pages/Shopkeeper/Orders';
import MedicineShop from './pages/Patient/MedicineShop';
import MedicalHistory from './pages/Patient/MedicalHistory';
import AdminDashboard from './pages/Admin/Dashboard';
import UserApprovals from './pages/Admin/UserApprovals';
import Reports from './pages/Admin/Reports';
import Chat from './pages/Chat/Chat';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/doctors" element={<FindDoctors />} />
          <Route path="/patient/doctors/:id" element={<DoctorProfile />} />
          <Route path="/patient/medicines" element={<MedicineShop />} />
          <Route path="/patient/history" element={<MedicalHistory />} />
          
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />

          <Route path="/shopkeeper/dashboard" element={<ShopkeeperDashboard />} />
          <Route path="/shopkeeper/inventory" element={<Inventory />} />
          <Route path="/shopkeeper/orders" element={<ShopOrders />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserApprovals />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
