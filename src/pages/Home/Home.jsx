import { useState } from "react";
import { useLocation } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import CanvasPreview from "../../components/CanvasPreview/CanvasPreview";
import GetPrintButton from "../../components/GetPrintButton/GetPrintButton";
import { options } from "../../data/options";
import "./Home.css";

const Home = () => {
  const location = useLocation();

  const getRandomId = (category) => {
    const items = options[category];
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex].id;
  };

  // Restore artwork when navigating back
  const initialSelected =
    location.state?.selected || {
      backgrounds: getRandomId("backgrounds"),
      patterns: getRandomId("patterns"),
      moods: getRandomId("moods"),
      animals: getRandomId("animals"), // 👈 keep only animals (or fruits if you prefer)
      // ❌ remove fruits so animals+fruits never show together
    };

  const [selected, setSelected] = useState(initialSelected);

  const handleChange = (category, id) => {
    setSelected((prev) => ({
      ...prev,
      [category]: id,
    }));
  };

  return (
    <div className="main-container">
      <FilterPanel
        options={options}
        selected={selected}
        onChange={handleChange}
      />

      <div className="preview-section">
        <CanvasPreview selected={selected} />
        <GetPrintButton selected={selected} />
      </div>
    </div>
  );
};

export default Home;
