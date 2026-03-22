// cookieConsent.js
export function canUseNonEssentialCookies() {
  return localStorage.getItem("cookiesConsent") === "accepted";
}

// Example: initialize analytics only if consent
export function initAnalytics() {
  if (!canUseNonEssentialCookies()) return;

  // Example: Google Analytics
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){dataLayer.push(arguments);}
  // gtag('js', new Date());
  // gtag('config', 'GA_MEASUREMENT_ID');

  console.log("Analytics initialized because user accepted cookies");
}