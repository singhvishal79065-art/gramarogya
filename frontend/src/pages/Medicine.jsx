import MedicineCard from "../components/MedicineCard";
import "./Medicine.css";

export default function Medicine() {
  const meds = [
    { name: "Paracetamol 500mg", desc: "Pain Reliever" },
    { name: "Amoxicillin 500mg", desc: "Antibiotic" },
    { name: "Vitamin C 1000mg", desc: "Immunity Booster" },
    { name: "Cough Syrup", desc: "Cough Suppressant" }
  ];

  return (
    <div className="medicine-page">
      <h1>Medicines</h1>

      <div className="medicine-grid">
        {meds.map((m, i) => (
          <MedicineCard key={i} name={m.name} desc={m.desc} />
        ))}
      </div>
    </div>
  );
}
