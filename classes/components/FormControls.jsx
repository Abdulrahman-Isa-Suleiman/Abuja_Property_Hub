import { useState, useEffect } from "react";
import "./FormControls.css";
import { TENURE_PRICE_RANGES } from "../data/constants";
import { posToPrice, formatPrice } from "../utils/helpers";

// ─── PRICE SLIDER ─────────────────────────────────────────────────────────────
export function PriceSlider({ tenure }) {
  const { min, max } = TENURE_PRICE_RANGES[tenure] || TENURE_PRICE_RANGES.Both;
  const [lo, setLo] = useState(0);
  const [hi, setHi] = useState(1000);

  useEffect(() => { setLo(0); setHi(1000); }, [tenure]);

  const loPrice = posToPrice(lo, min, max);
  const hiPrice = posToPrice(hi, min, max);
  const loFill  = (lo / 1000) * 100;
  const hiFill  = (hi / 1000) * 100;

  return (
    <div className="price-slider-wrap">
      <div className="price-display">
        <div className="price-val-box">
          <span className="price-val-label">Min budget</span>
          <span className={`price-val-amount${lo === 0 ? " edge" : ""}`}>
            {lo === 0 ? "Any" : formatPrice(loPrice)}
          </span>
        </div>
        <div className="price-sep-col"><div className="price-sep-dash" /></div>
        <div className="price-val-box">
          <span className="price-val-label">Max budget</span>
          <span className={`price-val-amount${hi === 1000 ? " edge" : ""}`}>
            {hi === 1000 ? "No limit" : formatPrice(hiPrice)}
          </span>
        </div>
      </div>
      <div className="price-track-wrap">
        <div className="price-track">
          <div className="price-fill" style={{ left: `${loFill}%`, width: `${hiFill - loFill}%` }} />
          <input type="range" className="price-thumb" min={0} max={1000} value={lo}
            onChange={e => setLo(Math.min(Number(e.target.value), hi - 10))}
            style={{ zIndex: lo >= hi - 20 ? 5 : 3 }} />
          <input type="range" className="price-thumb" min={0} max={1000} value={hi}
            onChange={e => setHi(Math.max(Number(e.target.value), lo + 10))}
            style={{ zIndex: 4 }} />
        </div>
        <div className="price-range-labels">
          <span>{formatPrice(min)}</span>
          <span>{formatPrice(max)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── ROOMS STEPPER ────────────────────────────────────────────────────────────
export function RoomsStepper({ value, onChange, min = 0, max = 10, anyLabel = "Any" }) {
  return (
    <div className="rooms-stepper">
      <button className="rooms-btn" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
      <div className={`rooms-val${value === min ? " any" : ""}`}>{value === min ? anyLabel : value}</div>
      <button className="rooms-btn" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
    </div>
  );
}
