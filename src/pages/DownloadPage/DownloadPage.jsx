import { useNavigate, useLocation } from "react-router-dom";
import { options } from "../../data/options";
import "./DownloadPage.css";

export default function DownloadPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  

  const selected = state?.selected;

  // If user enters URL manually without state
  if (!selected) {
    return <div className="download-page">Invalid print — return to homepage.</div>;
  }

  const width = 2480;
  const height = 3508;

  const getSrc = (category) =>
    options[category].find((o) => o.id === selected[category])?.src;

  return (
    <div className="download-page">
      <div className="download-container">

        {/* Art Preview */}
        <div className="poster-preview">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width / 5}
            height={height / 5}
            viewBox={`0 0 ${width} ${height}`}
          >
            <rect width="100%" height="100%" fill="white" />

            <image href={getSrc("backgrounds")} width="100%" height="100%" />
            <image href={getSrc("patterns")} width="100%" height="100%" />
            <image href={getSrc("animals")} width="100%" height="100%" />
            <image href={getSrc("fruits")} width="100%" height="100%" />
            <image href={getSrc("moods")} width="100%" height="100%" />

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

        {/* Purchase Menu */}
        <div className="download-menu">
          <button
  className="back-button"
  onClick={() => navigate("/", { state: { selected } })}
>
            <img src="/assets/icons/arrow_back.svg" alt="Back" />
            <span className="back-tooltip">Back</span>
          </button>

          <h1>Your Wallsnip</h1>
          <p>Single purchase $4.99</p>

          <h2 className="h2-title">
            <img src="/assets/icons/check.svg" alt="" />
            What you get:
          </h2>

          <ul className="poster-features">
            <li>Commercial license</li>
            <li>High-res JPG</li>
            <li>Editable SVG</li>
            <li>Unlimited use</li>
            <li>Supports wallsnips ❤️</li>
          </ul>

          <button className="get-print-btn">
            Get this print
            <span className="btn-icon">
              <img src="/assets/icons/arrow_outward.svg" alt="" className="icon-upward" />
              <img src="/assets/icons/arrow_forward.svg" alt="" className="icon-forward" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
