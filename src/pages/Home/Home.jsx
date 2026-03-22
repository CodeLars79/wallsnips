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

  // Restore artwork + text when navigating back
  const initialSelected =
    location.state?.selected || {
      backgrounds: getRandomId("backgrounds"),
      patterns: getRandomId("patterns"),
      moods: getRandomId("moods"),
      animals: getRandomId("animals"),
      fruits: null,
    };

  const initialCustomText = location.state?.customText || "";
  const initialFont = location.state?.selectedFont || "geist";

  // ✅ Use setter for customText
  const [selected, setSelected] = useState(initialSelected);
  const [customText, setCustomText] = useState(initialCustomText);
  const [selectedFont, setSelectedFont] = useState(initialFont);

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
        customText={customText}        // pass current text
        setCustomText={setCustomText}  // ✅ pass setter for live updates
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
      />

      <div className="preview-section">
        {/* Poster Preview */}
        <CanvasPreview
          selected={selected}
          customText={customText}
          selectedFont={selectedFont}
        />

        {/* Download Button */}
        <GetPrintButton
          selected={selected}
          customText={customText}
          selectedFont={selectedFont}
        />
      </div>
    </div>
  );
};

export default Home;