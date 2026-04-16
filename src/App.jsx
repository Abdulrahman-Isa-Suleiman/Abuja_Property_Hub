import { useState } from "react";

// Global styles
import "../src/styles/global.css";

// Shared layout
import { Navbar, Footer } from "../classes/components/NavFooter";

// Pages
import { HomePage }    from "../classes/pages/HomePage";
import { AboutPage }   from "../classes/pages/AboutPage";
import { LocationsPage } from "../classes/pages/LocationsPage";
import { ListingsPage } from "../classes/pages/ListingsPage";
import { ContactPage } from "../classes/pages/ContactPage";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
// locationFilter is lifted here so LocationsPage can pre-set it before
// navigating to ListingsPage — giving "Browse X Listings →" its filter effect.
export default function App() {
  const [page,           setPage]           = useState("home");
  const [locationFilter, setLocationFilter] = useState("All");

  // Navigate to listings pre-filtered by a specific area name
  const browseLocation = (areaName) => {
    setLocationFilter(areaName);
    setPage("listings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage      setPage={setPage} />;
      case "about":     return <AboutPage     setPage={setPage} />;
      case "listings":  return <ListingsPage  setPage={setPage} locationFilter={locationFilter} setLocationFilter={setLocationFilter} />;
      case "locations": return <LocationsPage setPage={setPage} browseLocation={browseLocation} />;
      case "contact":   return <ContactPage />;
      default:          return <HomePage      setPage={setPage} />;
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
