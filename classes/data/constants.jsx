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
  { id: "blog",      label: "Blog" },
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

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
// Each post has: id, slug, category, title, tagline, date, readTime, gradient,
// intro, sections [{heading, body}], tip {heading, body}
export const BLOG_POSTS = [
  {
    id: 1,
    slug: "renting-checklist-abuja",
    category: "Renting",
    title: "The Complete Abuja Renter's Checklist",
    tagline: "Everything you must verify before paying any landlord a single naira.",
    date: "12 March 2025",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg,#EAE4DE,#D5CBBC)",
    intro: "Renting in Abuja can be one of the most stressful financial decisions you ever make — not because good properties don't exist, but because the process is riddled with traps that catch unprepared tenants every single day. This checklist is the result of years of experience navigating the Abuja market. Work through every item before you hand over any money.",
    sections: [
      {
        heading: "1. Verify the landlord's ownership",
        body: "Before anything else, ask to see the title document — a Certificate of Occupancy (C of O), Right of Occupancy (R of O), or a registered deed of assignment. Cross-check the name on the document against the person you're dealing with. If an agent is representing the landlord, insist on a letter of authorisation signed by the actual owner. Fake landlords are common in Abuja; this one step eliminates most of them.",
      },
      {
        heading: "2. Inspect physically — at least twice",
        body: "Never pay for a property you've only seen in photos. Visit in person, and ideally visit twice: once during the day to assess light, ventilation, and the neighbourhood, and once in the evening to gauge noise levels, security, and power supply. Test every tap, flush every toilet, and check all electrical sockets. Look for evidence of water damage on ceilings and behind furniture — a common issue in Abuja's older estates.",
      },
      {
        heading: "3. Understand exactly what's included",
        body: "Serviced apartments in Abuja can mean very different things. Clarify in writing whether the rent includes security, water, estate management fees, generator fuel levy, and refuse collection. Many tenants discover these costs after signing, adding 15–30% to their effective rent. Get an itemised breakdown before committing.",
      },
      {
        heading: "4. Read the tenancy agreement carefully",
        body: "Don't sign a tenancy agreement you haven't read in full. Pay attention to the notice period required by both parties, what happens to your deposit if you leave early, and any clauses about rent increases. Some agreements include automatic annual rent hikes of 10–20% — negotiate these out or cap them before signing. If the agreement is poorly drafted or one-sided, have a lawyer review it.",
      },
      {
        heading: "5. Clarify the payment structure",
        body: "Most Abuja landlords demand 1–2 years' rent upfront, which is a significant sum. Confirm whether monthly or quarterly payments are negotiable — some landlords will accept this for reliable tenants. Never pay the full sum in cash; insist on a bank transfer and obtain a receipt for every payment. The receipt should state the property address, amount paid, and period covered.",
      },
      {
        heading: "6. Check infrastructure and utilities",
        body: "Abuja's power supply varies dramatically by district and even by street. Ask neighbours — not the agent — how many hours of AEDC supply they typically receive per day. Confirm whether the building has a borehole or depends on tanker water. If there's a generator, find out the monthly levy and the hours it runs. Connectivity matters too — check mobile and internet signal strength on site.",
      },
    ],
    tip: {
      heading: "PropertyHub Tip",
      body: "Always insist that your agreement specifies the exact move-in date and the condition of the property at handover. Take dated photographs of every room, every socket, and every wall the moment you receive the keys. This protects your deposit when you eventually leave.",
    },
  },
  {
    id: 2,
    slug: "expat-neighbourhood-guide",
    category: "Guides",
    title: "The Expat's Guide to Choosing a Neighbourhood in Abuja",
    tagline: "Which district fits your lifestyle, security needs, and budget as a foreigner in Abuja.",
    date: "28 March 2025",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg,#DCDACE,#C8C4BA)",
    intro: "Abuja is one of Africa's most liveable capital cities for expatriates — it is planned, relatively clean, and has a functioning diplomatic infrastructure. But choosing the wrong neighbourhood can mean a long commute, poor security, or simply not feeling at home. This guide breaks down the main options and tells you honestly what each one is like to live in.",
    sections: [
      {
        heading: "Maitama: The Gold Standard",
        body: "Maitama is the neighbourhood of choice for ambassadors, senior UN and NGO staff, and multinational executives. Wide roads, manicured verges, 24-hour security, and proximity to embassies make it the safest and most prestigious option. Most international schools are within a 10–15 minute drive. The trade-off is price — expect to pay ₦8M–₦15M per year for a 3-bedroom apartment, and considerably more for a villa.",
      },
      {
        heading: "Asokoro: Quiet Power",
        body: "Asokoro sits adjacent to Maitama in terms of prestige and security, though it has a more governmental, less commercial feel. Streets are quieter, properties larger, and the community more tightly-knit. It is a strong choice for expats who prioritise security and space over proximity to restaurants and shops. Properties rarely come to market here, so you'll need a specialist agent.",
      },
      {
        heading: "Wuse 2: Central and Convenient",
        body: "Wuse 2 suits expats who want to walk to restaurants, do their weekly shopping locally, and be close to the office. It is more vibrant and noisier than Maitama, and security, while good, is less formal. A 2-bedroom apartment will cost ₦3M–₦6M per year. The area has seen significant development and now hosts several international-standard restaurants, supermarkets, and co-working spaces.",
      },
      {
        heading: "Jabi: Relaxed Lakeside Living",
        body: "Jabi has become very popular with younger expats and NGO workers who want a community feel without the stuffiness of Maitama. The area around Jabi Lake offers excellent dining, weekend markets, and an outdoor lifestyle that is rare in Abuja. Properties are modern, well-finished, and more affordable than the top-tier districts. A 2-bedroom apartment typically rents for ₦2.5M–₦5M per year.",
      },
      {
        heading: "Katampe Extension: Emerging and Excellent Value",
        body: "Katampe Extension is increasingly popular with diplomatic staff and senior NGO employees who want a newer, quieter environment. Several embassies have relocated to this area in recent years, and the infrastructure has improved dramatically. Properties offer excellent value compared to Maitama, and the elevated terrain provides pleasant views. International schools are accessible, though slightly further than from Maitama.",
      },
      {
        heading: "Practical Considerations for All Expats",
        body: "Regardless of which district you choose, always confirm the generator supply arrangement before signing — AEDC (the national grid) is unreliable in all districts. Factor the cost of a car and a driver into your budget; Abuja has no meaningful public transport. Ensure your lease includes a diplomatic clause if your organisation may relocate you mid-tenancy — this is standard practice and any serious landlord will accept it.",
      },
    ],
    tip: {
      heading: "PropertyHub Tip",
      body: "Ask your employer's HR or admin team whether they have an approved vendor list for accommodation. Many international organisations have pre-negotiated rates with specific landlords or estates, which can save you significant money and reduce your risk.",
    },
  },
  {
    id: 3,
    slug: "investment-case-abuja",
    category: "Investment",
    title: "Why Abuja Real Estate Remains a Strong Investment in 2025",
    tagline: "The fundamentals that make Abuja one of Nigeria's most resilient property markets.",
    date: "5 April 2025",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg,#D8D0C8,#C4BCAF)",
    intro: "Nigeria's property market has weathered significant macro headwinds over the past three years — currency depreciation, rising inflation, and interest rate volatility. Yet Abuja has consistently outperformed Lagos and most secondary cities as a store of value. Here is the investment thesis, with the data and the caveats.",
    sections: [
      {
        heading: "Structural demand that doesn't go away",
        body: "Abuja is Nigeria's federal capital and the permanent home of the country's most powerful institutions — the presidency, the National Assembly, the Supreme Court, and over 100 foreign embassies. This creates a permanent, high-income tenant base that is largely insulated from the economic volatility that depresses demand in commercial cities. Government postings, diplomatic rotations, and NGO placements generate a continuous stream of tenants who can pay market rents.",
      },
      {
        heading: "Constrained supply keeps values elevated",
        body: "Unlike Lagos, where development can expand horizontally in almost any direction, Abuja's master plan tightly controls where and what can be built. The FCT Authority enforces zoning regulations that restrict residential density in premium areas. This supply constraint is a structural floor under prices in districts like Maitama, Asokoro, and Wuse 2, where new development is extremely limited.",
      },
      {
        heading: "Dollar-linked returns in a naira environment",
        body: "Many Abuja landlords with expatriate tenants price rents in US dollars or at dollar-equivalent naira rates, reviewed annually. This provides a natural hedge against naira depreciation. Investors who purchased properties in 2019 at circa ₦350/$1 and are now collecting rents repriced at ₦1,500/$1 have seen their naira rental income quadruple in nominal terms — though the real picture is more nuanced, it illustrates the hedge value.",
      },
      {
        heading: "Katampe and Life Camp: the next wave",
        body: "The highest risk-adjusted returns right now are likely in Katampe Extension and Life Camp, where infrastructure has improved significantly and diplomatic demand is growing but land prices have not yet fully caught up with Maitama. Investors who can identify plots with clean titles and good road access in these areas are positioning themselves for the next wave of appreciation.",
      },
      {
        heading: "What to watch out for",
        body: "Not all of Abuja's property market is safe. Satellite towns like Lugbe, Kuje, and Gwagwalada offer much lower prices but carry higher infrastructure risk, title uncertainty, and weaker resale markets. Properties marketed as 'Abuja' but located outside the FCT's Phase 1 development zones should be approached with extreme caution. Always conduct a thorough title search at the Land Registry before committing.",
      },
    ],
    tip: {
      heading: "PropertyHub Tip",
      body: "The single most important due diligence step for any Abuja property investment is a title search at the FCT Land Registry in Area 11, Garki. This search will reveal whether the property has a registered title, any existing encumbrances, and whether the plot boundaries match what is being sold to you.",
    },
  },
  {
    id: 4,
    slug: "buying-process-abuja",
    category: "Buying",
    title: "How to Buy Property in Abuja: A Step-by-Step Guide",
    tagline: "From finding the right plot to collecting your Certificate of Occupancy.",
    date: "14 April 2025",
    readTime: "9 min read",
    gradient: "linear-gradient(135deg,#E0D8CE,#CCC4BA)",
    intro: "Buying property in Abuja is a multi-stage process that takes longer and involves more parties than many buyers expect. Done correctly, it results in a clean title and a secure investment. Done carelessly, it can result in losing your money to a fraudulent transaction or an encumbered title. This guide walks you through every stage.",
    sections: [
      {
        heading: "Step 1: Define your brief and budget",
        body: "Before speaking to any agent, be clear on your objectives: Are you buying to occupy, rent out, or develop? What is your absolute maximum budget including legal fees, agency commission, and stamp duty? Which districts meet your criteria? Having clear answers to these questions will prevent you from being shown irrelevant properties and will accelerate the process significantly.",
      },
      {
        heading: "Step 2: Engage a reputable agent",
        body: "In Abuja, agency commission is typically 5–10% of the purchase price, paid by the buyer. Use a registered agent who is a member of the Nigerian Institution of Estate Surveyors and Valuers (NIESV). Ask for references from previous buyers and verify their office address. Never pay any fee before being shown the property and receiving a formal Letter of Offer.",
      },
      {
        heading: "Step 3: Conduct title verification",
        body: "Once you have identified a property, commission a title search at the FCT Land Registry in Garki. This search costs a relatively small fee and takes 3–10 working days. It will confirm whether the seller has a valid title, whether there are any registered encumbrances (mortgages, legal disputes, government acquisitions), and whether the plot boundaries are accurately described. Never skip this step regardless of how trustworthy the seller appears.",
      },
      {
        heading: "Step 4: Negotiate and sign the Sale Agreement",
        body: "Once the title is clean, negotiate the purchase price and terms. The Sale Agreement (also called a Contract of Sale) sets out the agreed price, deposit amount, completion date, and what happens if either party defaults. Both parties should have independent legal representation. The standard deposit in Abuja is 10–30% of the purchase price, paid on signing. Ensure your lawyer reviews the agreement before you sign.",
      },
      {
        heading: "Step 5: Pay Stamp Duty and Capital Gains Tax",
        body: "Stamp Duty is payable to the FCT Internal Revenue Service at 1.5% of the purchase consideration. Capital Gains Tax (CGT) of 10% is theoretically the seller's liability but is often negotiated as a shared cost. Ensure both are paid and receipts obtained before proceeding to title transfer — unpaid taxes can block registration.",
      },
      {
        heading: "Step 6: Obtain Consent and Register the Transfer",
        body: "In Abuja, all land is held under a leasehold from the Federal Government via the FCT Minister. Any transfer of title therefore requires Ministerial Consent, which is obtained through the FCT Land Administration Department. The consent process involves submitting the Sale Agreement, survey plan, and evidence of tax payments. Once consent is granted, the transfer deed is registered at the Lands Registry and you receive your updated title document. The entire process from sale agreement to registered title typically takes 3–6 months.",
      },
    ],
    tip: {
      heading: "PropertyHub Tip",
      body: "Budget at least 15% above the stated purchase price to cover all transaction costs: agency fee (5–10%), legal fees (1–2%), Stamp Duty (1.5%), survey and valuation fees, and the consent/registration fee. Buyers who don't account for these costs frequently find themselves unable to complete the transaction.",
    },
  },
  {
    id: 5,
    slug: "abuja-market-update-2025",
    category: "Market",
    title: "Abuja Property Market Update: Q1 2025",
    tagline: "Prices, trends, and what to expect for the rest of the year.",
    date: "2 May 2025",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg,#E2DAD2,#CEC8C0)",
    intro: "The first quarter of 2025 has confirmed several trends that were emerging at the end of 2024. Rental demand remains robust across premium and mid-market segments, while the sales market has become more selective. Here is our assessment of where the market stands and where it is headed.",
    sections: [
      {
        heading: "Rental market: demand outstrips supply in key areas",
        body: "Rental demand in Maitama, Wuse 2, and Jabi has remained consistently strong through Q1. The volume of requests we receive for 3-bedroom apartments in these areas continues to exceed available inventory by a ratio of approximately 3:1. Average rents in Maitama for a 3-bedroom apartment have reached ₦9M–₦12M per year, a nominal increase of 18% compared to Q1 2024. Much of this increase reflects dollar-linked repricing by landlords with expatriate tenants.",
      },
      {
        heading: "Mid-market holding steady",
        body: "Gwarinpa, Kubwa, and Life Camp continue to offer genuine value for price-sensitive renters. Average rents for a 3-bedroom in Gwarinpa have stabilised at ₦2M–₦3.5M per year after a period of rapid increase in 2023–2024. Vacancy rates in well-maintained properties remain low, and landlords who have invested in generator infrastructure and borehole water are achieving a meaningful premium over comparable properties without these amenities.",
      },
      {
        heading: "Sales market: quality over quantity",
        body: "The sales market has become more discerning. Properties with clean C of O titles, good road access, and functioning infrastructure are selling within 4–8 weeks of being listed at asking price. Properties with title issues, poor documentation, or located in areas with infrastructure deficits are sitting for 6–12 months. This bifurcation is more pronounced than at any point in the previous five years.",
      },
      {
        heading: "Katampe Extension: the standout story",
        body: "Land prices in Katampe Extension have appreciated by approximately 25–35% over the past 12 months, driven by embassy relocations and the opening of several new international schools in the area. Plots that were trading at ₦25M–₦35M per 600 sqm in early 2024 are now achieving ₦40M–₦55M. We expect this trend to continue through 2025 as infrastructure investment in the area continues.",
      },
      {
        heading: "Outlook for Q2–Q4 2025",
        body: "We expect rental growth to moderate slightly in H2 2025 as more supply comes to market in Gwarinpa and Life Camp from recently completed developments. The premium segment will remain tight. In the sales market, we anticipate continued strong performance for properly-titled properties in established districts, while the off-plan market will remain subdued until interest rates show a clearer downward trajectory.",
      },
    ],
    tip: {
      heading: "PropertyHub Tip",
      body: "If you are a landlord considering a rent review, our current data suggests that the market will support increases of 10–15% in most Abuja districts without significant vacancy risk — provided the property is well-maintained and utilities are reliable. Increases above this level in properties without dollar-linked tenants risk extended vacancies.",
    },
  },
  {
    id: 6,
    slug: "red-flags-abuja-property",
    category: "Guides",
    title: "10 Red Flags to Watch Out for in Abuja Property Deals",
    tagline: "If you see any of these, walk away — no matter how good the price looks.",
    date: "18 May 2025",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg,#DAD2CA,#C6C0B8)",
    intro: "Abuja has a disproportionate number of property scams relative to its size. This is partly a function of the high stakes involved — transactions routinely run into the tens or hundreds of millions of naira — and partly a function of the opacity of the land registry system. These are the ten warning signs that should make any buyer or renter pause and investigate further.",
    sections: [
      {
        heading: "1. The seller cannot produce the original title document",
        body: "Any legitimate seller of Abuja property can produce the original Certificate of Occupancy, deed of assignment, or letter of allocation. If you are told the document is 'with the lawyer', 'being processed', or 'coming soon', walk away immediately. There is no legitimate reason for a seller not to have this document available for inspection.",
      },
      {
        heading: "2. The price is dramatically below market rate",
        body: "In Abuja, a 600 sqm plot in Gwarinpa does not sell for ₦5M. A 3-bedroom apartment in Wuse 2 does not rent for ₦800,000 per year. If a deal seems too good to be true, it is. Below-market prices are the most reliable signal that something is wrong with the title, the property, or the person selling it.",
      },
      {
        heading: "3. Pressure to pay quickly",
        body: "Legitimate sellers do not need your deposit within 24 or 48 hours. Urgency is a manipulation tactic. 'Another buyer is interested' may be true in a hot market, but it is never a reason to skip due diligence. Any seller who makes your payment deadline shorter than the time needed to conduct a title search is not a seller you should deal with.",
      },
      {
        heading: "4. The agent cannot confirm the landlord's identity",
        body: "In a legitimate rental transaction, the agent can tell you the landlord's full name, can arrange a meeting with the landlord (or at minimum show you a signed mandate letter), and can show you the landlord's ID alongside the title document. If the agent is evasive about any of these, the property may be sublet without the owner's knowledge.",
      },
      {
        heading: "5. The survey plan doesn't match the physical plot",
        body: "Always walk the boundaries of any plot with the survey plan in hand. Fraudulent sellers sometimes show you a plan for a larger or differently located plot than the one being sold. Engage a registered surveyor to verify that the coordinates on the plan correspond to the actual physical location of the land.",
      },
      {
        heading: "6. Multiple people claim ownership",
        body: "It is not uncommon in Abuja for a single plot to be sold to multiple buyers by a fraudulent seller. If you conduct a title search and find that a previous transfer was registered — or if the current seller is nervous about you visiting the Land Registry — this is a critical red flag. Only the registered titleholder can validly sell.",
      },
      {
        heading: "7. No formal agreement is offered",
        body: "Any rental or sale transaction without a written, signed agreement is a transaction without legal protection. If a landlord or seller refuses to sign a formal document, refuses to have the document reviewed by a lawyer, or presents a one-paragraph 'agreement' that omits key terms, do not proceed.",
      },
      {
        heading: "8. The property is being sold by someone who is not the titleholder",
        body: "Power of Attorney transactions are common in Abuja and are legitimate when the PoA is properly executed and registered. However, they are also a vehicle for fraud. Insist on seeing the original PoA document, verify it is registered with the appropriate authority, and have your lawyer confirm it gives the seller authority to sell — not just manage — the property.",
      },
    ],
    tip: {
      heading: "PropertyHub Tip",
      body: "The most effective protection in any Abuja property transaction is a title search at the FCT Land Registry before paying any substantial sum. It costs a few thousand naira and takes days. It is the single step that eliminates the majority of fraud scenarios. If a seller objects to you conducting this search, that objection is itself a red flag.",
    },
  },
];
