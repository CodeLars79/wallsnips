import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/icons/logo_fox.svg";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
    window.location.reload(); // forces full reload
  };

  return (
    <header className="header">
      <Link to="/" onClick={handleClick} className="logo">
        <img src={logo} alt="Wallsnips logo" className="logo-icon" />
        <h1>wallsnips</h1>
      </Link>
    </header>
  );
}
