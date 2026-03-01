import { useNavigate } from "react-router-dom";
import "./GetPrintButton.css";

export default function GetPrintButton({ selected }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const layers = ["backgrounds", "patterns", "animals", "fruits", "moods"];
    
    // Only include layers that are not null/undefined
    const comboId = layers
      .map((layer) => selected[layer])
      .filter(Boolean) // removes null or undefined
      .join("-");

    navigate(`/download/${comboId}`, {
      state: { selected }, // send selected layers
    });
  };

  return (
    <div className="getprint-btn-container">
  <button className="getprint-btn" onClick={handleClick}>
    Get this print <span className="btn-icon">
              <img src="/assets/icons/arrow_outward.svg" alt="" className="icon-upward" />
              <img src="/assets/icons/arrow_forward.svg" alt="" className="icon-forward" />
            </span>
  </button>
</div>
  );
}

