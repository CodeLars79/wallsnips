import { useNavigate } from "react-router-dom";
import "./GetPrintButton.css";

export default function GetPrintButton({ selected, customText, selectedFont, }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const layers = ["backgrounds", "patterns", "animals", "fruits", "moods"];

    // Only include layers that exist
    const comboId = layers
      .map((layer) => selected[layer])
      .filter(Boolean)
      .join("-");

    navigate(`/download/${comboId}`, {
      state: {
        selected,
        customText, // ✨ pass personalization
        selectedFont,
      },
    });
  };

  return (
    <div className="getprint-btn-container">
      <button className="getprint-btn" onClick={handleClick}>
        Download
        <span className="btn-icon">
          <img
            src="/assets/icons/arrow_outward.svg"
            alt=""
            className="icon-upward"
          />
          <img
            src="/assets/icons/arrow_forward.svg"
            alt=""
            className="icon-forward"
          />
        </span>
      </button>
    </div>
  );
}