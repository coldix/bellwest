// bellwest.au — explore page Leaflet map
(function () {
  const mapEl = document.getElementById("region-map");
  if (!mapEl || typeof L === "undefined") return;

  const places = [
    {
      name: "Barwon Heads",
      lat: -38.2764,
      lng: 144.4882,
      blurb: "Bellarine Peninsula — river mouth, bridge & lagoon",
      href: "barwon-heads.html",
      color: "#c4a035",
    },
    {
      name: "Geelong",
      lat: -38.1499,
      lng: 144.3617,
      blurb: "Gateway city to the Bellarine",
      href: "explore.html",
      color: "#134e6f",
    },
    {
      name: "Torquay",
      lat: -38.3338,
      lng: 144.3262,
      blurb: "Surf Coast — beaches & Fisherman's Beach",
      href: "index.html#region-showcase",
      color: "#2d8a6e",
    },
    {
      name: "Bells Beach",
      lat: -38.3672,
      lng: 144.285,
      blurb: "Iconic surf coast & Winki Pop",
      href: "index.html#region-showcase",
      color: "#6b4fa0",
    },
    {
      name: "Lorne",
      lat: -38.5419,
      lng: 143.9787,
      blurb: "Great Ocean Road — Otways gateway",
      href: "explore.html",
      color: "#1a6b8a",
    },
  ];

  const map = L.map("region-map", {
    scrollWheelZoom: false,
  }).setView([-38.32, 144.35], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  places.forEach((place) => {
    const marker = L.circleMarker([place.lat, place.lng], {
      radius: 9,
      color: "#fff",
      weight: 2,
      fillColor: place.color,
      fillOpacity: 0.95,
    }).addTo(map);

    const popup = place.href
      ? `<strong>${place.name}</strong><br>${place.blurb}<br><a href="${place.href}">View &rarr;</a>`
      : `<strong>${place.name}</strong><br>${place.blurb}`;

    marker.bindPopup(popup);
  });

  map.on("click", () => map.scrollWheelZoom.enable());
  map.on("mouseout", () => map.scrollWheelZoom.disable());
})();