import { useState, useEffect, useRef } from "react";
import PersonalizationInput from "../PersonalizationInput/PersonalizationInput";
import "./FilterPanel.css";

export default function FilterPanel({
  options,
  selected,
  onChange,
  customText,
  setCustomText,
  selectedFont,
  setSelectedFont,
}) {
  const [openCategory, setOpenCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const panelRef = useRef(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconPaths = {
    backgrounds: {
      default: "/assets/icons/bg.svg",
      hover: "/assets/icons/bg_invert.svg",
    },
    patterns: {
      default: "/assets/icons/pattern.svg",
      hover: "/assets/icons/pattern_invert.svg",
    },
    moods: {
      default: "/assets/icons/moods.svg",
      hover: "/assets/icons/moods_invert.svg",
    },
    animals: {
      default: "/assets/icons/animals.svg",
      hover: "/assets/icons/animals_invert.svg",
    },
    fruits: {
      default: "/assets/icons/fruits.svg",
      hover: "/assets/icons/fruits_invert.svg",
    },
  };

  const handleSurpriseMe = () => {
    setOpenCategory(null);

    const newSelection = {};
    Object.keys(options).forEach((category) => {
      const items = options[category];
      const randomIndex = Math.floor(Math.random() * items.length);
      newSelection[category] = items[randomIndex].id;
    });

    // Prevent fruits + animals at same time
    if (newSelection.animals && newSelection.fruits) {
      if (Math.random() < 0.5) newSelection.animals = null;
      else newSelection.fruits = null;
    }

    Object.keys(newSelection).forEach((category) => {
      onChange(category, newSelection[category]);
    });
  };

  return (
    <div className="filter-panel" ref={panelRef}>
      <h2 className="filter-panel-title">
        Mix your artwork
      </h2>

      {/* Category Buttons */}
      {Object.keys(options).map((category) => {
        const iconData =
          iconPaths[category.toLowerCase()] || iconPaths.default;

        const iconSrc =
          hoveredCategory === category || openCategory === category
            ? iconData.hover
            : iconData.default;

        return (
          <div key={category} className="filter-button-group">
            <button
              className={`filter-main-btn ${
                openCategory === category ? "active" : ""
              }`}
              onClick={() => toggleCategory(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <img
                src={iconSrc}
                alt={`${category} icon`}
                className="filter-icon"
              />
              <span className="filter-text">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>

            {openCategory === category && (
              <div className="filter-dropdown">
                {options[category].map((opt) => (
                  <button
                    key={opt.id}
                    className={`filter-option-btn ${
                      selected[category] === opt.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      // Prevent fruits + animals conflict
                      if (category === "fruits" && selected.animals) {
                        onChange("animals", null);
                      }
                      if (category === "animals" && selected.fruits) {
                        onChange("fruits", null);
                      }

                      onChange(category, opt.id);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* 🎉 Surprise Me */}
      <div className="filter-button-group">
        <button className="filter-main-btn" onClick={handleSurpriseMe}>
          <img
            src="/assets/icons/stars_2.svg"
            alt="Surprise icon"
            className="filter-icon"
          />
          <span className="filter-text">Surprise me</span>
        </button>
      </div>

      {/* ✨ Personalization Input */}
      <div className="filter-personalization">
        <PersonalizationInput
          value={customText}
          onChange={setCustomText}
        />
      </div>

      {/* ✨ Font Selector */}
      <div className="font-selector">
        <h4>Choose font style</h4>
        <div className="font-buttons">
          <button
            className={selectedFont === "geist" ? "active" : ""}
            onClick={() => setSelectedFont("geist")}
          >
            Modern
          </button>

          <button
            className={selectedFont === "handwritten" ? "active" : ""}
            onClick={() => setSelectedFont("handwritten")}
            style={{ fontFamily: "var(--font-family-handwritten)" }}
          >
            Handwritten
          </button>

          <button
            className={selectedFont === "typewriter" ? "active" : ""}
            onClick={() => setSelectedFont("typewriter")}
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Typewriter
          </button>
        </div>
      </div>
    </div>
  );
}