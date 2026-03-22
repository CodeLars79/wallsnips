import "./PersonalizationInput.css";

export default function PersonalizationInput({ value, onChange }) {
  return (
    <div className="personalization-container">
      <h3>Add your own text</h3>
      <input
        type="text"
        maxLength={40}
        placeholder="Dream big, Emma"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      </div>
  );
}