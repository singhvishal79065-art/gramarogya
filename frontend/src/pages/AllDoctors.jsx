import { useState } from "react";
import { useLocation } from "react-router-dom";
import DoctorCard from "../components/DoctorCard"
import "./AllDoctors.css";

export default function AllDoctors() {

  // Get filter from URL
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialFilter = urlParams.get("filter") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialFilter);

  const doctors = [
    { name: "Dr. Rajesh Kumar", speciality: "Gynecologist" },
    { name: "Dr. Priya Patel", speciality: "Neurologist" },
    { name: "Dr. Amit Sharma", speciality: "General Physician" },
    { name: "Dr. Sanjay Verma", speciality: "Dermatologist" },
    { name: "Dr. Meera Singh", speciality: "Pediatrician" },
    { name: "Dr. Anjali Gupta", speciality: "Gastroenterologist" }
  ];

  const filters = [
    "All",
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ];

  const filteredDoctors =
    selectedCategory === "All"
      ? doctors
      : doctors.filter(
          (doc) => doc.speciality.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="doctor-page">

      <div className="filters">
        {filters.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? "#eef2ff" : "white",
              borderColor: selectedCategory === cat ? "#4a68ff" : "#d8d8d8",
              color: "black"
            }}
          >
            add to cart 
          </button>
        ))}
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map((doctor, i) => (
          <DoctorCard key={i} name={doctor.name} speciality={doctor.speciality} />
        ))}
      </div>

    </div>
  );
}
