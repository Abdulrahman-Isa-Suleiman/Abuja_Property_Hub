// ─── LISTINGS DATA ────────────────────────────────────────────────────────────
// sqm: floor area for built properties, plot size for land
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
    sqm: 185,
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
    sqm: 600,
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
    sqm: 320,
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
    sqm: 38,
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
    sqm: 650,
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
    sqm: 110,
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
    sqm: 210,
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
    sqm: 1000,
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
    sqm: 42,
    gradient: "linear-gradient(135deg,#E6E0D8,#D2CCC4)",
    features: ["Self-contained", "Tiled Floors", "Water Heater", "Secure Estate"],
    desc: "Newly built self-contain in a clean compound. Close to Kubwa expressway and daily market.",
    available: true,
  },
];

// ─── FILTER OPTIONS ───────────────────────────────────────────────────────────
export const PROPERTY_TYPES   = ["All", "Apartment", "House", "Duplex", "Villa", "Self-Contained", "Land"];
export const TENURE_OPTIONS   = ["All", "Rent", "Buy"];
export const LOCATION_OPTIONS = ["All", "Gwarinpa", "Wuse 2", "Maitama", "Jabi", "Lugbe", "Dutse", "Galadimawa", "Kuje", "Kubwa"];

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
  { id: "home",      label: "Home" },
  { id: "listings",  label: "Properties" },
  { id: "locations", label: "Locations" },
  { id: "about",     label: "About" },
  { id: "contact",   label: "Contact" },
];

// ─── FOOTER LOCATION LINKS ────────────────────────────────────────────────────
export const FOOTER_LOCATION_LINKS = ["Maitama", "Wuse 2", "Garki", "Jabi", "Gwarinpa", "Asokoro"];

// ─── ABUJA DISTRICT GUIDES ────────────────────────────────────────────────────
export const DISTRICTS = [
  {
    id: "maitama",
    name: "Maitama",
    tagline: "Abuja's most prestigious address",
    gradient: "linear-gradient(135deg,#D8D0C8,#C4BCAF)",
    iconKey: "Diamond",
    desc: "Maitama is the crown jewel of Abuja's residential districts. Home to ambassadors, top government officials, and captains of industry, it offers wide, tree-lined boulevards, world-class restaurants, and some of the city's finest architecture. Properties here command a premium but deliver unmatched prestige and security.",
    stats: [
      { label: "Avg Rent (3-bed)", value: "₦8M–₦15M/yr" },
      { label: "Avg Buy (5-bed)", value: "₦250M–₦500M" },
      { label: "Property Types", value: "Villas, Duplexes" },
      { label: "Best For", value: "Executives, Diplomats" },
    ],
  },
  {
    id: "wuse2",
    name: "Wuse 2",
    tagline: "The beating heart of Abuja business",
    gradient: "linear-gradient(135deg,#DCDACE,#C8C4BA)",
    iconKey: "Building",
    desc: "Wuse 2 is Abuja's most commercially vibrant neighbourhood, blending upscale residential living with the city's densest concentration of banks, embassies, restaurants, and boutique shops. It's the go-to district for professionals who want to live close to work without sacrificing quality of life. Short-let demand is consistently high.",
    stats: [
      { label: "Avg Rent (3-bed)", value: "₦5M–₦9M/yr" },
      { label: "Avg Buy (flat)", value: "₦40M–₦120M" },
      { label: "Property Types", value: "Apts, Duplexes" },
      { label: "Best For", value: "Professionals, Investors" },
    ],
  },
  {
    id: "garki",
    name: "Garki",
    tagline: "Historic core, central convenience",
    gradient: "linear-gradient(135deg,#E0D8CE,#CCC4BA)",
    iconKey: "MapPin",
    desc: "Garki is one of Abuja's oldest and most centrally located districts, divided into Areas 1 through 11. It hosts key government ministries, major hospitals, and some of the city's busiest commercial corridors. A great choice for those who need fast access to the CBD. Rents are more competitive than neighbouring Maitama or Wuse 2.",
    stats: [
      { label: "Avg Rent (3-bed)", value: "₦3M–₦6M/yr" },
      { label: "Avg Buy (plot)", value: "₦25M–₦80M" },
      { label: "Property Types", value: "Flats, Offices, Land" },
      { label: "Best For", value: "Civil Servants, SMEs" },
    ],
  },
  {
    id: "jabi",
    name: "Jabi",
    tagline: "Lakeside living, modern amenities",
    gradient: "linear-gradient(135deg,#E2DAD2,#CEC8C0)",
    iconKey: "Droplet",
    desc: "Jabi has emerged as one of Abuja's most desirable mid-to-upscale residential areas, anchored by the scenic Jabi Lake Mall and its waterside promenade. The district offers a relaxed, almost resort-like atmosphere with excellent access to supermarkets, gyms, cinemas, and dining. Newly developed estates here are popular with young professionals and returning diaspora.",
    stats: [
      { label: "Avg Rent (2-bed)", value: "₦2.5M–₦5M/yr" },
      { label: "Avg Buy (2-bed)", value: "₦35M–₦80M" },
      { label: "Property Types", value: "Apts, Terraces" },
      { label: "Best For", value: "Young Professionals, Diaspora" },
    ],
  },
  {
    id: "gwarinpa",
    name: "Gwarinpa",
    tagline: "Africa's largest housing estate",
    gradient: "linear-gradient(135deg,#EAE4DE,#D8D0C8)",
    iconKey: "Home",
    desc: "Gwarinpa is Abuja's most densely populated residential district and is often cited as the largest purpose-built housing estate in Africa. It offers a wide variety of property options — from modest self-contained flats to generous 4-bedroom duplexes — at price points that are accessible to a broader market. Strong rental demand makes it a reliable investment zone.",
    stats: [
      { label: "Avg Rent (3-bed)", value: "₦1.8M–₦4M/yr" },
      { label: "Avg Buy (duplex)", value: "₦30M–₦65M" },
      { label: "Property Types", value: "Duplexes, Flats, Self-con" },
      { label: "Best For", value: "Families, First-time Buyers" },
    ],
  },
  {
    id: "katampe",
    name: "Katampe",
    tagline: "Elevated views, growing prestige",
    gradient: "linear-gradient(135deg,#D8D0C8,#C6BEB5)",
    iconKey: "TrendingUp",
    desc: "Katampe — particularly Katampe Extension — is one of Abuja's fastest-appreciating neighbourhoods. Perched on elevated terrain with sweeping views of the city, it attracts a growing mix of affluent residents, embassies, and international schools. Infrastructure has improved significantly and land values have risen sharply over the past five years, making early entry very rewarding.",
    stats: [
      { label: "Avg Rent (4-bed)", value: "₦4M–₦8M/yr" },
      { label: "Avg Buy (plot)", value: "₦30M–₦90M" },
      { label: "Property Types", value: "Villas, Land, Duplexes" },
      { label: "Best For", value: "Investors, Upscale Families" },
    ],
  },
  {
    id: "asokoro",
    name: "Asokoro",
    tagline: "Power, policy, and prestige",
    gradient: "linear-gradient(135deg,#DAD2CA,#C6C0B8)",
    iconKey: "Shield",
    desc: "Asokoro is synonymous with political power in Nigeria — it is home to the Presidential Villa, State House, and numerous top government residences. The neighbourhood is immaculately maintained, heavily secured, and very exclusive. Properties rarely come to market, and when they do, they attract serious buyers. An address in Asokoro carries enormous social and professional weight.",
    stats: [
      { label: "Avg Rent (4-bed)", value: "₦7M–₦14M/yr" },
      { label: "Avg Buy (villa)", value: "₦200M–₦450M" },
      { label: "Property Types", value: "Villas, Govt Housing" },
      { label: "Best For", value: "Senior Officials, Executives" },
    ],
  },
  {
    id: "lifecamp",
    name: "Life Camp",
    tagline: "Quiet suburb, strong community feel",
    gradient: "linear-gradient(135deg,#E4DED8,#D0CAC4)",
    iconKey: "Leaf",
    desc: "Life Camp (also written Lifecamp) is a well-planned residential district in Abuja's northern corridor, popular with families who value quieter streets, good schools nearby, and a strong sense of community. It offers a mix of detached houses, semi-detached duplexes, and self-contained units at prices that are more accessible than the city's premium zones, without compromising on liveability.",
    stats: [
      { label: "Avg Rent (3-bed)", value: "₦1.5M–₦3.5M/yr" },
      { label: "Avg Buy (detached)", value: "₦25M–₦55M" },
      { label: "Property Types", value: "Houses, Duplexes, Flats" },
      { label: "Best For", value: "Families, Mid-income Buyers" },
    ],
  },
  {
    id: "utako",
    name: "Utako",
    tagline: "Central, connected, and affordable",
    gradient: "linear-gradient(135deg,#E6E0D8,#D2CCC4)",
    iconKey: "Zap",
    desc: "Utako sits at a strategic crossroads between Wuse 2, Jabi, and Maitama, making it one of Abuja's most accessible districts. The area has grown rapidly and now offers a healthy mix of residential apartments, commercial spaces, and eateries. It is particularly popular with young professionals and small business owners who want central access without paying the Wuse 2 premium.",
    stats: [
      { label: "Avg Rent (2-bed)", value: "₦1.2M–₦2.8M/yr" },
      { label: "Avg Buy (flat)", value: "₦18M–₦45M" },
      { label: "Property Types", value: "Flats, Self-con, Offices" },
      { label: "Best For", value: "Young Professionals, Startups" },
    ],
  },
];
