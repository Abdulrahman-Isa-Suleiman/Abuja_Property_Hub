import { useState } from "react";

// Global styles
import "../src/styles/global.css";

// Shared layout
import { Navbar, Footer } from "../classes/components/NavFooter";

// Pages
import { HomePage }    from "../classes/pages/HomePage";
import { AboutPage }   from "../classes/pages/AboutPage";
import { ListingsPage } from "../classes/pages/ListingsPage";
import { ContactPage } from "../classes/pages/ContactPage";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
// Single source of routing. To add a new page:
//   1. Create src/pages/NewPage.css + NewPage.jsx
//   2. Import it here
//   3. Add a case below
//   4. Add its link to src/data/constants.jsx → NAV_LINKS
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage     setPage={setPage} />;
      case "about":    return <AboutPage    setPage={setPage} />;
      case "listings": return <ListingsPage setPage={setPage} />;
      case "contact":  return <ContactPage />;
      default:         return <HomePage     setPage={setPage} />;
    }
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
      <Footer setPage={setPage} />
    </>
  );
}
