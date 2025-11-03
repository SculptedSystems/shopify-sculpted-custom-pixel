// ================================================
//   Shopify Custom GTM Pixel for Customer Events
// ================================================

// ============================
// Configure Options
// ============================

const config = {
  pixel: {
    name: "demo",
    logging: true,
  },

  shopify: {
    useSKU: true,
  },

  gtm: {
    id: "GTM-PJKTL9FK",

    track: {
      pageView: true,
    },
  },
};

// ============================
// Prepare for Tracking
// ============================

// Initialize Data Layer
window.dataLayer = window.dataLayer || [];

// Initialize Google Tag Manager
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", config.gtm.id);

// Declare Helper Functions
function consoleLog(log) {
  if (config.pixel.logging) {
    console.log(`Custom Pixel "${config.pixel.name}": ${log}`);
  }
}

function dlPush(message) {
  consoleLog(
    `Pushing Message to Data Layer -> ${JSON.stringify(message, null, 2)}`,
  );
  window.dataLayer.push(message);
}

// ============================
// Push Events to Data Layer
// ============================

// page_view
if (config.gtm.track.pageView) {
  // https://support.google.com/analytics/answer/9216061#page_view
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed
  analytics.subscribe("page_viewed", (event) => {
    const eventContext = event.context?.document;

    dlPush({
      event: "page_view",
      page_location: eventContext?.location?.href,
      page_referrer: eventContext?.referrer,
      page_title: eventContext?.title,
    });
  });
}
