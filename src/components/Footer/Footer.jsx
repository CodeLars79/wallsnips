import "./Footer.css";

export default function Footer() {
  return (
    <footer className="floating-footer">
      <a href="/about" className="footer-link">About</a>
      <span className="footer-separator">•</span>
      <a href="/terms" className="footer-link">Legal</a>
      <span className="footer-separator">•</span>
      <span className="footer-text">© {new Date().getFullYear()} </span>
    </footer>
  );
}