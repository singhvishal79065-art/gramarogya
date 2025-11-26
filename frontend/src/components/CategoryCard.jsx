import "./CategoryCard.css";

export default function CategoryCard({ name, icon }) {
  return (
    <div className="category-card">
      <img src={icon} alt={name} />
      <p>{name}</p>
    </div>
  );
}
