// ─── LISTINGS DATA ────────────────────────────────────────────────────────────
export const LISTINGS = [
  {
    id: 1,
    type: "Apartment",
    tenure: "Rent",
    title: "3-Bedroom Serviced Apartment",
    area: "Gwarinpa",
    city: "Abuja",
    price: "₦3,500,000",
    period: "/yr",
    gradient: "linear-gradient(135deg,#EAE4DE,#D8D0C8)",
    features: ["3 Bedrooms", "2 Bathrooms", "Parking", "24h Security", "Fitted Kitchen"],
    desc: "Spacious serviced apartment in a serene gated estate. All rooms ensuite, modern fittings, constant water and power backup.",
    available: true,
  },
  {
    id: 2,
    type: "Land",
    tenure: "Buy",
    title: "600sqm Dry Residential Plot",
    area: "Lugbe",
    city: "Abuja",
    price: "₦18,000,000",
    period: "",
    gradient: "linear-gradient(135deg,#E0D8CE,#CCC4BA)",
    features: ["600 sqm", "Dry Land", "Registered Title", "Good Road Access", "Fenced"],
    desc: "Corner-piece dry land with good road network. C of O available. Suitable for residential or commercial development.",
    available: true,
  },
  {
    id: 3,
    type: "Duplex",
    tenure: "Rent",
    title: "4-Bedroom Detached Duplex",
    area: "Wuse 2",
    city: "Abuja",
    price: "₦6,500,000",
    period: "/yr",
    gradient: "linear-gradient(135deg,#DCDACE,#C8C4BA)",
    features: ["4 Bedrooms", "4 Bathrooms", "BQ Included", "Large Compound", "CCTV"],
    desc: "Premium fully-detached duplex in prime Wuse 2 location. Walking distance to major banks, restaurants and the business district.",
    available: true,
  },
  {
    id: 4,
    type: "Self-con",
    tenure: "Rent",
    title: "Self-Contained Studio Flat",
    area: "Dutse",
    city: "Abuja",
    price: "₦350,000",
    period: "/yr",
    gradient: "linear-gradient(135deg,#E4DED8,#D0CAC4)",
    features: ["Self-contained", "Running Water", "Prepaid Meter", "Good Security"],
    desc: "Clean self-contained apartment perfect for a single occupant or young couple. Located on a tarred road.",
    available: true,
  },
  {
    id: 5,
    type: "Villa",
    tenure: "Buy",
    title: "5-Bedroom Luxury Villa",
    area: "Maitama",
    city: "Abuja",
    price: "₦280,000,000",
    period: "",
    gradient: "linear-gradient(135deg,#D8D0C8,#C4BCAF)",
    features: ["5 Bedrooms", "5 Bathrooms", "Swimming Pool", "Home Cinema", "Staff Quarters"],
    desc: "Architecturally designed luxury villa in Maitama's most exclusive enclave. Fully automated, landscaped garden, 2 BQ units.",
    available: true,
  },
  {
    id: 6,
    type: "Apartment",
    tenure: "Buy",
    title: "2-Bedroom Terrace Apartment",
    area: "Jabi",
    city: "Abuja",
    price: "₦45,000,000",
    period: "",
    gradient: "linear-gradient(135deg,#E0D8D0,#CCCAB8)",
    features: ["2 Bedrooms", "2 Bathrooms", "Rooftop Access", "Gym", "24h Power"],
    desc: "Modern apartment in a newly completed estate near Jabi Lake. Excellent finishing and strong investment value.",
    available: false,
  },
  {
    id: 7,
    type: "House",
    tenure: "Rent",
    title: "3-Bedroom Bungalow",
    area: "Galadimawa",
    city: "Abuja",
    price: "₦1,800,000",
    period: "/yr",
    gradient: "linear-gradient(135deg,#E2DAD2,#CEC8C0)",
    features: ["3 Bedrooms", "2 Bathrooms", "Big Compound", "Borehole", "Solar Backup"],
    desc: "Comfortable bungalow on a quiet residential street. Large compound suitable for families, reliable water and power.",
    available: true,
  },
  {
    id: 8,
    type: "Land",
    tenure: "Buy",
    title: "1,000sqm Commercial Plot",
    area: "Kuje",
    city: "Abuja",
    price: "₦8,500,000",
    period: "",
    gradient: "linear-gradient(135deg,#DAD2CA,#C6C0B8)",
    features: ["1,000 sqm", "Commercial Use", "Survey Plan", "Accessible Road"],
    desc: "Prime commercial land along the Kuje bypass. Suitable for warehousing, event center, or mixed-use development.",
    available: true,
  },
  {
    id: 9,
    type: "Self-con",
    tenure: "Rent",
    title: "Modern Self-Contained Unit",
    area: "Kubwa",
    city: "Abuja",
    price: "₦280,000",
    period: "/yr",
    gradient: "linear-gradient(135deg,#E6E0D8,#D2CCC4)",
    features: ["Self-contained", "Tiled Floors", "Water Heater", "Secure Estate"],
    desc: "Newly built self-contain in a clean compound. Close to Kubwa expressway and daily market.",
    available: true,
  },
];

// ─── FILTER OPTIONS ───────────────────────────────────────────────────────────
export const PROPERTY_TYPES = ["All", "Apartment", "House", "Duplex", "Villa", "Self-Contained", "Land"];
export const TENURE_OPTIONS  = ["All", "Rent", "Buy"];

// ─── PRICE SLIDER RANGES ──────────────────────────────────────────────────────
export const TENURE_PRICE_RANGES = {
  Rent: { min: 100_000,   max: 20_000_000 },
  Buy:  { min: 5_000_000, max: 2_000_000_000 },
  Both: { min: 100_000,   max: 2_000_000_000 },
};

// ─── HERO SEARCH TAGS ────────────────────────────────────────────────────────
export const HERO_SEARCH_TAGS = [
  "2 bed in Gwarinpa",
  "Land in Lugbe",
  "Self-con in Dutse",
  "Office in Wuse 2",
  "Villa in Maitama",
];

// ─── HOW IT WORKS STEPS ──────────────────────────────────────────────────────
export const HOW_STEPS = [
  { n: "01", h: "Submit Your Request",    p: "Tell us exactly what you're looking for — size, location, budget, and any specific needs." },
  { n: "02", h: "We Source for You",      p: "Our team manually searches our verified network of agents and landlords across Abuja." },
  { n: "03", h: "Receive Curated Options",p: "Within 24–48 hours, we send you the best matching properties — verified and ready to view." },
];

// ─── TRUST CARDS ─────────────────────────────────────────────────────────────
export const TRUST_CARDS = [
  { iconKey: "Magnify", h: "Manual Sourcing",  p: "We personally vet each property before sending it to you. No automated listings." },
  { iconKey: "Shield",  h: "Verified Agents",  p: "All agents in our network are vetted, licensed, and accountable." },
  { iconKey: "Zap",     h: "Fast Turnaround",  p: "Most requests are matched within 24–48 hours of submission." },
  { iconKey: "Lock",    h: "No Hidden Fees",   p: "Our service is free to users. We work with agents on a transparent commission basis." },
];

// ─── ABOUT — TEAM ─────────────────────────────────────────────────────────────
export const TEAM_MEMBERS = [
  { name: "Amina Usman",      role: "Founder & CEO",    cls: "tav1", bio: "Former real estate lawyer with 10 years in Abuja's property sector. Founded PropertyHub after experiencing the market's inefficiencies first-hand." },
  { name: "Chukwuemeka Eze",  role: "Head of Sourcing", cls: "tav2", bio: "Ex-property consultant with an extensive network of landlords and agents across all of Abuja's major districts and satellite towns." },
  { name: "Fatima Al-Hassan", role: "Client Relations", cls: "tav3", bio: "Passionate about helping people settle comfortably. Manages all client requests personally and ensures every response is timely and thorough." },
];

// ─── ABOUT — VALUES ───────────────────────────────────────────────────────────
export const CORE_VALUES = [
  { l: "Value 01", h: "Transparency",    p: "No hidden charges, no fake listings, no inflated prices. What you see is what you get." },
  { l: "Value 02", h: "Speed",           p: "We respect your time. Requests are treated urgently and matched within 24–48 hours." },
  { l: "Value 03", h: "Human Touch",     p: "Unlike portals, we're real people matching real needs. You'll always speak to a human." },
  { l: "Value 04", h: "Accountability",  p: "Every agent and property in our network is verified and held to a high standard." },
  { l: "Value 05", h: "Local Knowledge", p: "We know Abuja deeply — every neighbourhood, price range, and landlord quirk." },
  { l: "Value 06", h: "Client-First",    p: "We work for the person looking for a property, not for the agent trying to sell one." },
];

// ─── CONTACT INFO ITEMS ───────────────────────────────────────────────────────
export const CONTACT_INFO_ITEMS = [
  { iconKey: "Phone",     label: "Phone",         value: "+234 800 000 0000" },
  { iconKey: "Mail",      label: "Email",         value: "info@propertyhub.ng" },
  { iconKey: "MsgCircle", label: "WhatsApp",      value: "+234 800 000 0000" },
  { iconKey: "Location",  label: "Base Location", value: "Abuja, FCT, Nigeria" },
];

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { id: "home",     label: "Home" },
  { id: "listings", label: "Properties" },
  { id: "about",    label: "About" },
  { id: "contact",  label: "Contact" },
];

// ─── FOOTER LOCATION LINKS ────────────────────────────────────────────────────
export const FOOTER_LOCATION_LINKS = ["Gwarinpa", "Wuse 2", "Lugbe", "Maitama", "Jabi", "Kubwa"];
