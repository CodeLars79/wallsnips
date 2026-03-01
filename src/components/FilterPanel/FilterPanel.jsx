import { useState, useEffect, useRef } from "react";
import "./FilterPanel.css";

export default function FilterPanel({ options, selected, onChange }) {
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

  return (
    <div className="filter-panel" ref={panelRef}>
      <h2 className="filter-panel-title">Mix and download<br />your cute artwork!</h2>
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
                      // 🧠 Auto-clear logic: prevent fruits + animals being active together
                      if (category === "fruits" && selected.animals) {
                        onChange("animals", null); 
                      }
                      if (category === "animals" && selected.fruits) {
                        onChange("fruits", null); 
                      }

                      // Apply current selection
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
    </div>
  );
}
