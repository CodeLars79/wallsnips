import { useNavigate, useLocation } from "react-router-dom";
import { options } from "../../data/options";
import "./DownloadPage.css";

export default function DownloadPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selected = state?.selected;
  const customText = state?.customText;
  const selectedFont = state?.selectedFont || "geist";

  if (!selected) {
    return (
      <div className="download-page">
        Invalid print — return to homepage.
      </div>
    );
  }

  const width = 2480;
  const height = 3508;

  const getSrc = (category) =>
    options[category]?.find((o) => o.id === selected[category])?.src;

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

  /* -----------------------------
     FREE DOWNLOAD FUNCTION
  ----------------------------- */

const handleFreeDownload = async () => {
  const previewScale = 1 / 5; // same as preview SVG
  const canvasWidth = 2480 * previewScale; // 496
  const canvasHeight = 3508 * previewScale; // 702

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // Fill background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const categories = ["backgrounds", "patterns", "animals", "fruits", "moods"];

  // Helper to load images
  const loadImage = (src) =>
    new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });

  // Draw artwork layers
  for (const category of categories) {
    const src = getSrc(category);
    if (!src) continue;
    const img = await loadImage(src);
    if (img) ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  }

  // Draw custom text (scaled)
  if (customText) {
    let fontFamily = "Geist";
    switch (selectedFont) {
      case "handwritten":
        fontFamily = "cursive";
        break;
      case "typewriter":
        fontFamily = "Courier New";
        break;
      case "modern":
        fontFamily = "Poppins";
        break;
    }

    ctx.fillStyle = "#222";
    ctx.font = `600 ${140 * previewScale}px ${fontFamily}`; // scale font
    ctx.textAlign = "center";
    ctx.fillText(customText, canvasWidth / 2, (3508 - 220) * previewScale); // scale y
  }

  // Watermark (scaled)
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate(-Math.PI / 4); // -45 degrees
  ctx.fillStyle = "rgba(53,53,53,0.12)";
  ctx.font = `${300 * previewScale}px Geist, Arial, sans-serif`; // scaled
  ctx.textAlign = "center";
  ctx.fillText("wallsnips.com", 0, 0);
  ctx.restore();

  // Export JPG
  const jpgUrl = canvas.toDataURL("image/jpeg", 0.7);
  const link = document.createElement("a");
  link.href = jpgUrl;
  link.download = "wallsnip-free.jpg";
  link.click();
};

  return (
    <div className="download-page">
      <div className="download-container">

        {/* Poster Preview */}

        <div className="poster-preview">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width / 5}
            height={height / 5}
            viewBox={`0 0 ${width} ${height}`}
          >

            <rect width="100%" height="100%" fill="white" />

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

            {customText && (
              <text
                x="50%"
                y={height - 220}
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
    {/* Preview Watermark */}

<text
  x="55%"
  y="50%"
  textAnchor="middle"
  fill="rgb(53, 53, 53, 0.1)"
  fontSize="300"
  fontFamily="'Geist', sans-serif"
  letterSpacing="40"
  transform={`rotate(-45 ${width / 2} ${height / 2})`}
>
  wallsnips.com
</text>
          </svg>
        </div>

        {/* Download Options */}

        <div className="download-menu">

          <button
            className="back-button"
            onClick={() =>
              navigate("/", {
                state: { selected, customText, selectedFont },
              })
            }
          >
            <img src="/assets/icons/arrow_back.svg" alt="Back" />
            <span className="back-tooltip">Back</span>
          </button>

          <h1>Your Wallsnip</h1>

          {/* FREE OPTION */}

          <div className="download-option free">

            <h2>Free Download</h2>
            

            <ul className="poster-features">
              <li>Low-res JPG</li>
              <li>Watermark</li>
              <li>Personal use</li>
              <li>Quick download</li>
            </ul>

            <button
              className="free-download-btn"
              onClick={handleFreeDownload}
            >
              Download
              <span className="btn-icon">
                <img src="/assets/icons/arrow_outward.svg" alt="" className="icon-upward" />
                <img src="/assets/icons/arrow_forward.svg" alt="" className="icon-forward" />
              </span>
            </button>

          </div>

          {/* PREMIUM OPTION */}

          <div className="download-option premium">

            <h2>Premium Download - $4.99</h2>

            <ul className="poster-features">
              <li>Commercial license</li>
              <li>NO watermark</li>
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
    </div>
  );
}