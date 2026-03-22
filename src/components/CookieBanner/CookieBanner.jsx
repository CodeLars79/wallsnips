import { useState, useEffect } from "react";
import "./CookieBanner.css";
import CookieIcon from "/assets/icons/cookie.svg";
import { initAnalytics } from "../../utils/cookieConsent";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesConsent");
    if (!consent) {
      setShowBanner(true);
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    } else {
      if (consent === "accepted") initAnalytics(); // initialize on page load
      setShowButton(true);
    }
  }, []);

  const handleClose = (consentValue) => {
    localStorage.setItem("cookiesConsent", consentValue);
    if (consentValue === "accepted") initAnalytics(); // only init if accepted

    setVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      setShowButton(true);
    }, 400);
  };

  const handleManageClick = () => {
    setShowBanner(true);
    setVisible(true);
  };

  return (
    <>
      {showBanner && (
        <div className={`cookie-banner ${visible ? "slide-up" : "slide-down"}`}>
          <p>
            We use cookies to improve your experience and analyze site usage.{" "}
            <a href="/terms" style={{ color: "var(--color-text)", textDecoration: "underline" }}>
              Learn more
            </a>.
          </p>
          <div className="cookie-buttons">
            <button onClick={() => handleClose("accepted")}>Accept</button>
            <button onClick={() => handleClose("rejected")}>Reject</button>
          </div>
        </div>
      )}

      {showButton && !showBanner && (
        <button className="manage-cookies-btn" onClick={handleManageClick}>
          <img src={CookieIcon} alt="Manage Cookies" />
        </button>
      )}
    </>
  );
}