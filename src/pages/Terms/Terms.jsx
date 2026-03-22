import { useState } from "react";
import "./Terms.css";

import terms from "../../data/terms";
import privacy from "../../data/privacy";
import cookies from "../../data/cookies";

export default function Terms() {
  const [activeTab, setActiveTab] = useState("terms");

  const dataMap = {
    terms,
    privacy,
    cookies,
  };

  const data = dataMap[activeTab] || [];

  return (
    <div className="terms-page">
      <h1>Legal</h1>
      <p className="update-date">Last updated: April, 2026</p>

      <div className="terms-nav">
        <button
          className={activeTab === "terms" ? "active" : ""}
          onClick={() => setActiveTab("terms")}
        >
          Terms
        </button>
        <button
          className={activeTab === "privacy" ? "active" : ""}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy
        </button>
        <button
          className={activeTab === "cookies" ? "active" : ""}
          onClick={() => setActiveTab("cookies")}
        >
          Cookies
        </button>
      </div>

      {data.length > 0 ? (
        data.map((section, index) => (
          <section key={index}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))
      ) : (
        <p>No content available.</p>
      )}

      <div className="footer-note">
        <p>© {new Date().getFullYear()} wallsnips. All rights reserved.</p>
      </div>
    </div>
  );
}