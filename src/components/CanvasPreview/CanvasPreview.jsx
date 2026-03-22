// CanvasPreview.jsx
import { options } from "../../data/options.js";
import "./CanvasPreview.css";

export default function CanvasPreview({ selected, customText, selectedFont }) {
  const width = 2480;
  const height = 3508;

  const getSrc = (category) =>
    options[category]?.find((o) => o.id === selected[category])?.src;

  // Map font key to actual font-family
  const getFontFamily = (font) => {
    switch (font) {
      case "handwritten":
        return "var(--font-family-handwritten)";
      case "typewriter":
        return "'Courier New', monospace";
      case "modern":
        return "'Poppins', sans-serif";
      default:
        return "'Geist', sans-serif";
    }
  };

  return (
    <div className="canvas-wrapper">
      <div className="canvas-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width / 5}
          height={height / 5}
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* Base */}
          <rect width="100%" height="100%" fill="white" />

          {/* Artwork Layers */}
          {getSrc("backgrounds") && (
            <image href={getSrc("backgrounds")} width="100%" height="100%" />
          )}
          {getSrc("patterns") && (
            <image href={getSrc("patterns")} width="100%" height="100%" />
          )}
          {getSrc("animals") && (
            <image href={getSrc("animals")} width="100%" height="100%" />
          )}
          {getSrc("fruits") && (
            <image href={getSrc("fruits")} width="100%" height="100%" />
          )}
          {getSrc("moods") && (
            <image href={getSrc("moods")} width="100%" height="100%" />
          )}

          {/* ✨ Personalized Text */}
          {customText && (
            <text
              x="50%"
              y={height - 220} // same as download page
              textAnchor="middle"
              fill="#222"
              fontSize="140"
              fontFamily={getFontFamily(selectedFont)}
              fontWeight="600"
              letterSpacing="6"
            >
              {customText}
            </text>
          )}

         
       
        </svg>
      </div>
    </div>
  );
}