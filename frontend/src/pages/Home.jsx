import CategoryCard from "../components/CategoryCard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "General Physician", icon: "/icons/physician.png" },
    { name: "Gynecologist", icon: "/icons/gyno.png" },
    { name: "Dermatologist", icon: "/icons/derma.png" },
    { name: "Pediatrician", icon: "/icons/baby.png" },
    { name: "Neurologist", icon: "/icons/brain.png" },
    { name: "Gastroenterologist", icon: "/icons/stomach.png" }
  ];

  const handleCategoryClick = (cat) => {
    navigate(`/doctors?filter=${cat}`);
  };

  return (
    <div className="home">
      <h1>Find by Speciality</h1>
      <p>Browse trusted doctors & schedule your appointment.</p>

      <div className="category-grid">
        {categories.map((c, i) => (
          <div key={i} onClick={() => handleCategoryClick(c.name)}>
            <CategoryCard name={c.name} icon={c.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
