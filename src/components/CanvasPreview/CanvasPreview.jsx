import { options } from "../../data/options.js";
import "./CanvasPreview.css";

export default function CanvasPreview({ selected }) {
  const width = 2480; // A4 width at 300dpi
  const height = 3508; // A4 height at 300dpi

  const getSrc = (category) =>
    options[category].find((o) => o.id === selected[category])?.src;

  return (
    <div className="canvas-wrapper">
      <div className="canvas-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width / 5}
          height={height / 5}
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* White background layer */}
          <rect width="100%" height="100%" fill="white" />

          {/* Image layers */}
          <image href={getSrc("backgrounds")} width="100%" height="100%" />
          <image href={getSrc("patterns")} width="100%" height="100%" />
          <image href={getSrc("animals")} width="100%" height="100%" />
          <image href={getSrc("fruits")} width="100%" height="100%" />
          <image href={getSrc("moods")} width="100%" height="100%" />

          {/* Centered footer text */}
          <text
            x="50%"
            y={height - 100}
            textAnchor="middle"
            fill="#a8a8a8ff"
            fontSize="60"
            fontFamily="Geist, sans-serif"
          >
            wallsnips © 2026
          </text>
        </svg>
      </div>
    </div>
  );
}
