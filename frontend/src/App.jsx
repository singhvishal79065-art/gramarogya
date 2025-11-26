// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // import only the hook (provider should be in index.js)
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookAppointment from "./pages/BookAppointment";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import MyConsultant from "./pages/MyConsultant";
import Navbar from "./components/Navbar";

/**
 * PrivateRoute component
 * - children: the element to render when allowed
 * - allowedRoles: optional array of roles allowed to view the route
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not logged in -> go to login
  if (!user) return <Navigate to="/login" replace />;

  // Role not allowed -> go to home (or a 'not authorized' page if you have one)
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/patient-dashboard"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/shopkeeper-dashboard"
          element={
            <PrivateRoute allowedRoles={["shopkeeper"]}>
              <ShopkeeperDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/book-appointment"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <BookAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/shop"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <Shop />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-consultant"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <MyConsultant />
            </PrivateRoute>
          }
        />

        {/* Default / fallback routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
