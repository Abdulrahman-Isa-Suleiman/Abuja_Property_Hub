// ─── SEARCH QUERY PARSER ─────────────────────────────────────────────────────
export function parseQuery(q) {
  if (!q) return {};
  const r = {}, l = q.toLowerCase();

  const typeMap = {
    apartment: "Apartment", flat: "Apartment", duplex: "Duplex",
    house: "House", bungalow: "House", land: "Land", plot: "Land",
    villa: "Villa", "self-con": "Self-Contained", selfcon: "Self-Contained", studio: "Apartment",
  };
  for (const [keyword, value] of Object.entries(typeMap)) {
    if (l.includes(keyword)) { r.propertyType = value; break; }
  }

  if      (l.includes("buy") || l.includes("purchase")) r.tenure = "Buy";
  else if (l.includes("rent"))                           r.tenure = "Rent";

  const knownAreas = [
    "garki","maitama","wuse","jabi","gwarinpa","lugbe","wuse 2",
    "dutse","kubwa","kuje","galadimawa","asokoro","gudu","lifecamp",
    "life camp","katampe","utako","mpape","dawaki",
  ];
  for (const area of knownAreas) {
    if (l.includes(area)) { r.location = area.replace(/\b\w/g, c => c.toUpperCase()); break; }
  }
  if (!r.location) {
    const m = q.match(/(?:\bin\b|\bat\b|\baround\b)\s+([A-Za-z][A-Za-z0-9\s\-]{1,28})/i);
    if (m) r.location = m[1].trim().replace(/\b\w/g, c => c.toUpperCase());
  }

  const bedMatch = l.match(/(\d+)\s*[-–]?\s*(?:bed(?:room)?s?|br\b)/);
  if (bedMatch) r.bedrooms = Math.min(10, parseInt(bedMatch[1], 10));

  return r;
}

// ─── PRICE SLIDER HELPERS ─────────────────────────────────────────────────────
export function posToPrice(pos, min, max) {
  return Math.round(Math.exp(Math.log(min) + (pos / 1000) * (Math.log(max) - Math.log(min))));
}

export function formatPrice(v) {
  if (v >= 1_000_000_000) return `₦${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000)     return `₦${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`;
  if (v >= 1_000)         return `₦${(v / 1_000).toFixed(0)}K`;
  return `₦${v}`;
}
