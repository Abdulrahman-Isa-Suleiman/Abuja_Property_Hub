import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import "./AdminPage.css";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "propertyhub2024";

const TYPES = ["Flat / Apartment", "House", "Land", "Commercial Space"];

const SUBTYPES = {
  "Flat / Apartment": ["Studio / Self-con", "Serviced Apartment", "Terrace Apartment", "Penthouse"],
  "House":            ["Bungalow", "Duplex", "Terrace", "Semi-detached", "Detached Villa"],
  "Land":             ["Residential Plot", "Commercial Plot", "Mixed-use Plot", "Agricultural"],
  "Commercial Space": ["Office", "Shop / Retail", "Warehouse", "Event Space", "Mixed Commercial"],
};

const GRADIENTS = [
  "linear-gradient(135deg,#EAE4DE,#D8D0C8)",
  "linear-gradient(135deg,#E0D8CE,#CCC4BA)",
  "linear-gradient(135deg,#DCDACE,#C8C4BA)",
  "linear-gradient(135deg,#E4DED8,#D0CAC4)",
  "linear-gradient(135deg,#D8D0C8,#C4BCAF)",
  "linear-gradient(135deg,#E0D8D0,#CCCAB8)",
  "linear-gradient(135deg,#E2DAD2,#CEC8C0)",
  "linear-gradient(135deg,#DAD2CA,#C6C0B8)",
];

const BLANK = {
  title: "", type: "", subtype: "", tenure: "Rent",
  area: "", city: "Abuja", price: "",
  sqm: "", gradient: GRADIENTS[0], features: "",
  description: "", available: true, image_url: "",
};

// ─── IMAGE UPLOAD HELPER ──────────────────────────────────────────────────────
async function uploadImage(file) {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from("listing-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });
  if (upErr) throw upErr;
  const { data } = supabase.storage.from("listing-images").getPublicUrl(fileName);
  return data.publicUrl;
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw]     = useState("");
  const [err, setErr]   = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setPw(""); }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <div className="admin-login-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h1>Admin Access</h1>
        <p>Enter your password to manage listings.</p>
        <input
          className={`admin-pw-input${err ? " err" : ""}`}
          type="password" placeholder="Password"
          value={pw} onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === "Enter" && attempt()}
          autoFocus
        />
        {err && <span className="admin-err">Incorrect password</span>}
        <button className="admin-login-btn" onClick={attempt}>Sign In →</button>
      </div>
    </div>
  );
}

// ─── LISTING FORM ─────────────────────────────────────────────────────────────
function ListingForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || BLANK);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initial?.image_url || null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTypeChange = (v) => {
    setForm(f => ({ ...f, type: v, subtype: "" }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    set("image_url", "");
  };

  const save = async () => {
    if (!form.title || !form.type || !form.area || !form.price) {
      alert("Please fill in Title, Type, Area and Price.");
      return;
    }
    setSaving(true);

    let image_url = form.image_url || null;
    if (imageFile) {
      try {
        image_url = await uploadImage(imageFile);
      } catch (err) {
        alert("Image upload failed: " + err.message);
        setSaving(false);
        return;
      }
    }

    const payload = {
      ...form,
      image_url,
      period: form.tenure === "Rent" ? "/yr" : "",
      sqm: form.sqm ? parseInt(form.sqm) : null,
      features: typeof form.features === "string"
        ? form.features.split(",").map(f => f.trim()).filter(Boolean)
        : form.features,
    };
    await onSave(payload);
    setSaving(false);
  };

  const featuresStr = typeof form.features === "string"
    ? form.features
    : (form.features || []).join(", ");

  return (
    <div className="admin-form-overlay">
      <div className="admin-form-modal">
        <div className="admin-form-head">
          <h2>{initial?.id ? "Edit Listing" : "Add New Listing"}</h2>
          <button className="admin-close" onClick={onCancel}>✕</button>
        </div>
        <div className="admin-form-body">

          {/* Title */}
          <div className="aff">
            <label>Title *</label>
            <input className="ainput" placeholder="e.g. 3-Bedroom Serviced Apartment"
              value={form.title} onChange={e => set("title", e.target.value)} />
          </div>

          {/* Type + Subtype */}
          <div className="afrow c2">
            <div className="aff">
              <label>Property Type *</label>
              <select className="aselect" value={form.type} onChange={e => handleTypeChange(e.target.value)}>
                <option value="">Select type…</option>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="aff">
              <label>Subtype</label>
              <select className="aselect" value={form.subtype} onChange={e => set("subtype", e.target.value)}
                disabled={!form.type}>
                <option value="">Select subtype…</option>
                {(SUBTYPES[form.type] || []).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Tenure */}
          <div className="aff">
            <label>Tenure *</label>
            <div className="atgroup">
              {["Rent", "Buy"].map(t => (
                <button key={t} className={`atbtn${form.tenure === t ? " on" : ""}`}
                  onClick={() => set("tenure", t)}>{t}</button>
              ))}
            </div>
          </div>

          {/* Area + City */}
          <div className="afrow c2">
            <div className="aff">
              <label>Area *</label>
              <input className="ainput" placeholder="e.g. Gwarinpa"
                value={form.area} onChange={e => set("area", e.target.value)} />
            </div>
            <div className="aff">
              <label>City</label>
              <input className="ainput" value={form.city}
                onChange={e => set("city", e.target.value)} />
            </div>
          </div>

          {/* Price + Sqm */}
          <div className="afrow c2">
            <div className="aff">
              <label>Price *</label>
              <input className="ainput" placeholder="₦3,500,000"
                value={form.price} onChange={e => set("price", e.target.value)} />
            </div>
            <div className="aff">
              <label>Size (sqm)</label>
              <input className="ainput" type="number" placeholder="185"
                value={form.sqm} onChange={e => set("sqm", e.target.value)} />
            </div>
          </div>

          {/* Features */}
          <div className="aff">
            <label>Features <span className="ahint">(comma separated)</span></label>
            <input className="ainput" placeholder="3 Bedrooms, 2 Bathrooms, Parking, 24h Security"
              value={featuresStr} onChange={e => set("features", e.target.value)} />
          </div>

          {/* Description */}
          <div className="aff">
            <label>Description</label>
            <textarea className="atextarea" placeholder="Describe the property…"
              value={form.description} onChange={e => set("description", e.target.value)} />
          </div>

          {/* Photo upload */}
          <div className="aff">
            <label>Property Photo</label>
            {imagePreview ? (
              <div className="image-preview-wrap">
                <img className="image-preview" src={imagePreview} alt="Preview" />
                <button className="image-remove-btn" onClick={removeImage}>✕ Remove</button>
              </div>
            ) : (
              <label className="image-upload-btn">
                <input type="file" accept="image/*" onChange={handleImageSelect} hidden />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Click to upload a photo</span>
              </label>
            )}
          </div>

          {/* Gradient picker (fallback when no photo) */}
          <div className="aff">
            <label>Card Colour <span className="ahint">(used if no photo uploaded)</span></label>
            <div className="gradient-picker">
              {GRADIENTS.map(g => (
                <button key={g} className={`grad-swatch${form.gradient === g ? " on" : ""}`}
                  style={{ background: g }} onClick={() => set("gradient", g)} />
              ))}
            </div>
          </div>

          {/* Available toggle */}
          <div className="aff">
            <label>Availability</label>
            <div className="atgroup">
              <button className={`atbtn${form.available ? " on" : ""}`} onClick={() => set("available", true)}>Available</button>
              <button className={`atbtn${!form.available ? " on" : ""}`} onClick={() => set("available", false)}>Under Offer</button>
            </div>
          </div>

        </div>
        <div className="admin-form-foot">
          <button className="admin-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="admin-save-btn" onClick={save} disabled={saving}>
            {saving ? "Saving…" : (initial?.id ? "Save Changes →" : "Add Listing →")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
export function AdminPage({ setPage }) {
  const [authed,    setAuthed]    = useState(false);
  const [listings,  setListings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [deleting,  setDeleting]  = useState(null);
  const [toast,     setToast]     = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchListings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setListings(data || []);
    setLoading(false);
  };

  useEffect(() => { if (authed) fetchListings(); }, [authed]);

  const handleAdd = async (payload) => {
    const { error } = await supabase.from("listings").insert([payload]);
    if (error) { showToast("Error adding listing", "error"); }
    else { showToast("Listing added!"); setShowForm(false); fetchListings(); }
  };

  const handleEdit = async (payload) => {
    const { id, created_at, ...data } = payload;
    const { error } = await supabase.from("listings").update(data).eq("id", id);
    if (error) { showToast("Error updating listing", "error"); }
    else { showToast("Listing updated!"); setEditing(null); fetchListings(); }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) { showToast("Error deleting listing", "error"); }
    else { showToast("Listing deleted!"); setDeleting(null); fetchListings(); }
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="admin-page">

      {/* ── HEADER ── */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Admin <span>Dashboard</span></h1>
          <p>{listings.length} listing{listings.length !== 1 ? "s" : ""} in database</p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-back-btn" onClick={() => setPage("home")}>← Back to Site</button>
          <button className="admin-add-btn" onClick={() => setShowForm(true)}>+ Add Listing</button>
        </div>
      </div>

      {/* ── LISTINGS TABLE ── */}
      <div className="admin-content">
        {loading ? (
          <div className="admin-loading">Loading listings…</div>
        ) : listings.length === 0 ? (
          <div className="admin-empty">
            <p>No listings yet.</p>
            <button className="admin-add-btn" onClick={() => setShowForm(true)}>Add your first listing →</button>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Area</th>
                  <th>Price</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(l => (
                  <tr key={l.id}>
                    <td>
                      {l.image_url
                        ? <img className="admin-thumb" src={l.image_url} alt="" />
                        : <div className="admin-swatch" style={{ background: l.gradient }} />
                      }
                    </td>
                    <td className="admin-title-cell">{l.title}</td>
                    <td><span className="admin-tag">{l.type}</span></td>
                    <td>{l.area}</td>
                    <td className="admin-price">{l.price}<span>{l.period}</span></td>
                    <td>{l.tenure}</td>
                    <td>
                      <span className={`admin-status${l.available ? " avail" : " offer"}`}>
                        {l.available ? "Available" : "Under Offer"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-edit-btn" onClick={() => setEditing(l)}>Edit</button>
                        <button className="admin-del-btn" onClick={() => setDeleting(l.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── ADD FORM ── */}
      {showForm && (
        <ListingForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
      )}

      {/* ── EDIT FORM ── */}
      {editing && (
        <ListingForm
          initial={{ ...editing, features: (editing.features || []).join(", ") }}
          onSave={handleEdit}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleting && (
        <div className="admin-confirm-overlay">
          <div className="admin-confirm-box">
            <h3>Delete this listing?</h3>
            <p>This cannot be undone.</p>
            <div className="admin-confirm-actions">
              <button className="admin-cancel-btn" onClick={() => setDeleting(null)}>Cancel</button>
              <button className="admin-del-confirm-btn" onClick={() => handleDelete(deleting)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`admin-toast${toast.type === "error" ? " err" : ""}`}>{toast.msg}</div>
      )}
    </div>
  );
}
