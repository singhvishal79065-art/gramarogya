import "./MedicineCard.css";

export default function MedicineCard({ name, desc }) {
  return (
    <div className="medicine-card">
      <h3>{name}</h3>
      <p>{desc}</p>
      <button>Add to Cart</button>
    </div>
  );
}