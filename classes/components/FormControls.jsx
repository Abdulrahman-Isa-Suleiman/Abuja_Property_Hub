import { useState, useEffect, useRef } from "react";
import "./FormControls.css";
import { TENURE_PRICE_RANGES } from "../data/constants";
import { posToPrice, formatPrice } from "../utils/helpers";

// ─── PRICE SLIDER (redesigned) ────────────────────────────────────────────────
// value = { lo, hi } on an internal 0–1000 scale. Parent owns and lifts this
// state so the final naira values can be read out on submit.
export function PriceSlider({ tenure, value, onChange }) {
  const { min, max } = TENURE_PRICE_RANGES[tenure] || TENURE_PRICE_RANGES.Both;
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(null); // "lo" | "hi" | null

  const { lo, hi } = value;

  const loPrice = posToPrice(lo, min, max);
  const hiPrice = posToPrice(hi, min, max);
  const loPct   = (lo / 1000) * 100;
  const hiPct   = (hi / 1000) * 100;

  const posFromClientX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pct  = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(pct * 1000);
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pos = posFromClientX(clientX);
      if (dragging === "lo") onChange({ lo: Math.min(pos, hi - 20), hi });
      else                   onChange({ lo, hi: Math.max(pos, lo + 20) });
    };
    const handleUp = () => setDragging(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, lo, hi]);

  // Quick presets, computed dynamically from this tenure's range
  const presets = [
    { label: "Any Budget", lo: 0,   hi: 1000 },
    { label: `Under ${formatPrice(posToPrice(320, min, max))}`, lo: 0,   hi: 320 },
    { label: `${formatPrice(posToPrice(320, min, max))} – ${formatPrice(posToPrice(650, min, max))}`, lo: 320, hi: 650 },
    { label: `${formatPrice(posToPrice(650, min, max))}+`, lo: 650, hi: 1000 },
  ];
  const isPresetActive = (p) => lo === p.lo && hi === p.hi;

  const handleTrackClick = (e) => {
    if (e.target.closest(".price-thumb")) return; // let thumb handle its own drag
    const pos = posFromClientX(e.clientX);
    // move whichever thumb is closer
    if (Math.abs(pos - lo) <= Math.abs(pos - hi)) onChange({ lo: Math.min(pos, hi - 20), hi });
    else onChange({ lo, hi: Math.max(pos, lo + 20) });
  };

  return (
    <div className="price-slider">
      <div className="price-presets">
        {presets.map(p => (
          <button key={p.label} className={`price-preset-chip${isPresetActive(p) ? " on" : ""}`}
            onClick={() => onChange({ lo: p.lo, hi: p.hi })}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="price-display">
        <div className="price-val-box">
          <span className="price-val-label">Min budget</span>
          <span className={`price-val-amount${lo === 0 ? " edge" : ""}`}>
            {lo === 0 ? "Any" : formatPrice(loPrice)}
          </span>
        </div>
        <div className="price-sep-col"><div className="price-sep-dash" /></div>
        <div className="price-val-box" style={{ textAlign: "right" }}>
          <span className="price-val-label">Max budget</span>
          <span className={`price-val-amount${hi === 1000 ? " edge" : ""}`}>
            {hi === 1000 ? "No limit" : formatPrice(hiPrice)}
          </span>
        </div>
      </div>

      <div className="price-track-wrap">
        <div className="price-track" ref={trackRef} onClick={handleTrackClick}>
          <div className="price-fill" style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }} />
          <div
            className={`price-thumb${dragging === "lo" ? " dragging" : ""}`}
            style={{ left: `${loPct}%` }}
            onMouseDown={(e) => { e.stopPropagation(); setDragging("lo"); }}
            onTouchStart={(e) => { e.stopPropagation(); setDragging("lo"); }}
          >
            {dragging === "lo" && (
              <div className="price-thumb-tip">{lo === 0 ? "Any" : formatPrice(loPrice)}</div>
            )}
          </div>
          <div
            className={`price-thumb${dragging === "hi" ? " dragging" : ""}`}
            style={{ left: `${hiPct}%` }}
            onMouseDown={(e) => { e.stopPropagation(); setDragging("hi"); }}
            onTouchStart={(e) => { e.stopPropagation(); setDragging("hi"); }}
          >
            {dragging === "hi" && (
              <div className="price-thumb-tip">{hi === 1000 ? "No limit" : formatPrice(hiPrice)}</div>
            )}
          </div>
        </div>
        <div className="price-range-labels">
          <span>{formatPrice(min)}</span>
          <span>{formatPrice(max)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── ROOMS STEPPER (unchanged) ─────────────────────────────────────────────────
export function RoomsStepper({ value, onChange, min = 0, max = 10, anyLabel = "Any" }) {
  return (
    <div className="rooms-stepper">
      <button className="rooms-btn" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
      <div className={`rooms-val${value === min ? " any" : ""}`}>{value === min ? anyLabel : value}</div>
      <button className="rooms-btn" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
    </div>
  );
}
