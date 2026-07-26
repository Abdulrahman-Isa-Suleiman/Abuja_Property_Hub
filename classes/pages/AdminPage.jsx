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
  description: "", available: true, image_urls: [],
};

// ─── STATUS OPTIONS FOR REQUESTS ──────────────────────────────────────────────
const REQUEST_STATUSES = ["new", "contacted", "closed"];
const STATUS_LABELS = { new: "New", contacted: "Contacted", closed: "Closed" };

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
  // Existing images already uploaded (URLs) + newly selected files not yet uploaded
  const [existingImages, setExistingImages] = useState(initial?.image_urls || (initial?.image_url ? [initial.image_url] : []));
  const [newFiles, setNewFiles] = useState([]); // File objects

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTypeChange = (v) => {
    setForm(f => ({ ...f, type: v, subtype: "" }));
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) setNewFiles(f => [...f, ...files]);
    e.target.value = ""; // allow re-selecting the same file again later
  };

  const removeExisting = (url) => setExistingImages(imgs => imgs.filter(u => u !== url));
  const removeNewFile   = (idx) => setNewFiles(files => files.filter((_, i) => i !== idx));

  const save = async () => {
    if (!form.title || !form.type || !form.area || !form.price) {
      alert("Please fill in Title, Type, Area and Price.");
      return;
    }
    setSaving(true);

    let uploadedUrls = [];
    if (newFiles.length) {
      try {
        uploadedUrls = await Promise.all(newFiles.map(uploadImage));
      } catch (err) {
        alert("Image upload failed: " + err.message);
        setSaving(false);
        return;
      }
    }

    const image_urls = [...existingImages, ...uploadedUrls];

    const payload = {
      ...form,
      image_urls,
      period: form.tenure === "Rent" ? "/yr" : "",
      sqm: form.sqm ? parseInt(form.sqm) : null,
      features: typeof form.features === "string"
        ? form.features.split(",").map(f => f.trim()).filter(Boolean)
        : form.features,
    };
    delete payload.image_url; // old single-image field, no longer used
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

          {/* Photo upload — multiple images */}
          <div className="aff">
            <label>Property Photos <span className="ahint">(first photo is used as the cover)</span></label>
            <div className="image-grid">
              {existingImages.map(url => (
                <div className="image-tile" key={url}>
                  <img src={url} alt="" />
                  <button className="image-tile-remove" onClick={() => removeExisting(url)}>✕</button>
                </div>
              ))}
              {newFiles.map((file, i) => (
                <div className="image-tile" key={`new-${i}`}>
                  <img src={URL.createObjectURL(file)} alt="" />
                  <span className="image-tile-new">New</span>
                  <button className="image-tile-remove" onClick={() => removeNewFile(i)}>✕</button>
                </div>
              ))}
              <label className="image-tile image-tile-add">
                <input type="file" accept="image/*" multiple onChange={handleImagesSelect} hidden />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Add photo{(existingImages.length + newFiles.length) > 0 ? "s" : "(s)"}</span>
              </label>
            </div>
          </div>

          {/* Gradient picker (fallback when no photo) */}
          <div className="aff">
            <label>Card Colour <span className="ahint">(used if no photos uploaded)</span></label>
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

// ─── REQUEST DETAIL MODAL ──────────────────────────────────────────────────────
function RequestDetailModal({ request, onClose, onStatusChange, onDelete }) {
  const r = request;
  const fmtMoney = (n) => n == null ? "Any" : `₦${Number(n).toLocaleString()}`;

  return (
    <div className="admin-form-overlay">
      <div className="admin-form-modal">
        <div className="admin-form-head">
          <h2>Request Details</h2>
          <button className="admin-close" onClick={onClose}>✕</button>
        </div>
        <div className="admin-form-body">

          <div className="req-detail-section">
            <div className="req-detail-label">Contact</div>
            <div className="req-detail-grid">
              <div><span>Name</span><strong>{r.name || "—"}</strong></div>
              <div><span>Phone</span><strong><a href={`tel:${r.phone}`}>{r.phone}</a></strong></div>
              <div><span>Email</span><strong>{r.email ? <a href={`mailto:${r.email}`}>{r.email}</a> : "—"}</strong></div>
              <div><span>Submitted</span><strong>{new Date(r.created_at).toLocaleString()}</strong></div>
            </div>
          </div>

          <div className="req-detail-section">
            <div className="req-detail-label">What They're Looking For</div>
            <div className="req-detail-grid">
              <div><span>Type</span><strong>{r.property_type || "—"}{r.subtype ? ` · ${r.subtype}` : ""}</strong></div>
              <div><span>Tenure</span><strong>{r.tenure || "—"}</strong></div>
              <div><span>Location</span><strong>{r.location || "—"}</strong></div>
              <div><span>Urgency</span><strong>{r.urgency ? (r.urgency === "urgent" ? "Urgent (1–5 days)" : "Flexible (1–10 days)") : "—"}</strong></div>
              {r.bedrooms != null && <div><span>Bedrooms</span><strong>{r.bedrooms || "Any"}</strong></div>}
              {r.bathrooms != null && <div><span>Bathrooms</span><strong>{r.bathrooms || "Any"}</strong></div>}
              {(r.size_min || r.size_max) && <div><span>Size (sqm)</span><strong>{r.size_min || "0"} – {r.size_max || "∞"}</strong></div>}
              <div><span>Budget</span><strong>{fmtMoney(r.budget_min)} – {fmtMoney(r.budget_max)}</strong></div>
            </div>
          </div>

          {r.details && (
            <div className="req-detail-section">
              <div className="req-detail-label">Additional Details</div>
              <p className="req-detail-text">{r.details}</p>
            </div>
          )}

          <div className="req-detail-section">
            <div className="req-detail-label">Status</div>
            <div className="atgroup">
              {REQUEST_STATUSES.map(s => (
                <button key={s} className={`atbtn${r.status === s ? " on" : ""}`}
                  onClick={() => onStatusChange(r.id, s)}>{STATUS_LABELS[s]}</button>
              ))}
            </div>
          </div>

        </div>
        <div className="admin-form-foot">
          <button className="admin-del-btn" style={{ padding: "0.65rem 1.4rem" }} onClick={() => onDelete(r.id)}>Delete Request</button>
          <button className="admin-save-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
export function AdminPage({ setPage }) {
  const [authed,    setAuthed]    = useState(false);
  const [tab,       setTab]       = useState("listings"); // "listings" | "requests"

  const [listings,  setListings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [deleting,  setDeleting]  = useState(null);

  const [requests,      setRequests]      = useState([]);
  const [reqLoading,    setReqLoading]    = useState(true);
  const [viewingReq,    setViewingReq]    = useState(null);
  const [deletingReq,   setDeletingReq]   = useState(null);

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

  const fetchRequests = async () => {
    setReqLoading(true);
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setRequests(data || []);
    setReqLoading(false);
  };

  useEffect(() => {
    if (!authed) return;
    fetchListings();
    fetchRequests();
  }, [authed]);

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

  const handleStatusChange = async (id, status) => {
    const { error } = await supabase.from("requests").update({ status }).eq("id", id);
    if (error) { showToast("Error updating status", "error"); }
    else {
      showToast("Status updated!");
      setRequests(rs => rs.map(r => r.id === id ? { ...r, status } : r));
      setViewingReq(r => r && r.id === id ? { ...r, status } : r);
    }
  };

  const handleDeleteRequest = async (id) => {
    const { error } = await supabase.from("requests").delete().eq("id", id);
    if (error) { showToast("Error deleting request", "error"); }
    else { showToast("Request deleted!"); setDeletingReq(null); setViewingReq(null); fetchRequests(); }
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const newReqCount = requests.filter(r => r.status === "new").length;

  return (
    <div className="admin-page">

      {/* ── HEADER ── */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Admin <span>Dashboard</span></h1>
          <p>{tab === "listings"
            ? `${listings.length} listing${listings.length !== 1 ? "s" : ""} in database`
            : `${requests.length} request${requests.length !== 1 ? "s" : ""} received`}</p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-back-btn" onClick={() => setPage("home")}>← Back to Site</button>
          {tab === "listings" && (
            <button className="admin-add-btn" onClick={() => setShowForm(true)}>+ Add Listing</button>
          )}
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="admin-tabs">
        <button className={`admin-tab${tab === "listings" ? " on" : ""}`} onClick={() => setTab("listings")}>
          Listings
        </button>
        <button className={`admin-tab${tab === "requests" ? " on" : ""}`} onClick={() => setTab("requests")}>
          Requests
          {newReqCount > 0 && <span className="admin-tab-badge">{newReqCount}</span>}
        </button>
      </div>

      {/* ── LISTINGS TAB ── */}
      {tab === "listings" && (
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
                        {l.image_urls && l.image_urls.length > 0
                          ? <img className="admin-thumb" src={l.image_urls[0]} alt="" />
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
      )}

      {/* ── REQUESTS TAB ── */}
      {tab === "requests" && (
        <div className="admin-content">
          {reqLoading ? (
            <div className="admin-loading">Loading requests…</div>
          ) : requests.length === 0 ? (
            <div className="admin-empty">
              <p>No property requests yet.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Looking For</th>
                    <th>Location</th>
                    <th>Budget</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id}>
                      <td className="admin-title-cell">{r.name || "—"}</td>
                      <td>{r.phone}</td>
                      <td><span className="admin-tag">{r.property_type || "—"}</span></td>
                      <td>{r.location || "—"}</td>
                      <td className="admin-price">
                        {r.budget_min == null && r.budget_max == null ? "Any" :
                          `${r.budget_min ? "₦" + Number(r.budget_min).toLocaleString() : "Any"} – ${r.budget_max ? "₦" + Number(r.budget_max).toLocaleString() : "No limit"}`}
                      </td>
                      <td>{new Date(r.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className={`admin-status${r.status === "new" ? " avail" : r.status === "closed" ? "" : " offer"}`}>
                          {STATUS_LABELS[r.status] || "New"}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-edit-btn" onClick={() => setViewingReq(r)}>View</button>
                          <button className="admin-del-btn" onClick={() => setDeletingReq(r.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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

      {/* ── DELETE LISTING CONFIRM ── */}
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

      {/* ── REQUEST DETAIL ── */}
      {viewingReq && (
        <RequestDetailModal
          request={viewingReq}
          onClose={() => setViewingReq(null)}
          onStatusChange={handleStatusChange}
          onDelete={(id) => setDeletingReq(id)}
        />
      )}

      {/* ── DELETE REQUEST CONFIRM ── */}
      {deletingReq && (
        <div className="admin-confirm-overlay">
          <div className="admin-confirm-box">
            <h3>Delete this request?</h3>
            <p>This cannot be undone.</p>
            <div className="admin-confirm-actions">
              <button className="admin-cancel-btn" onClick={() => setDeletingReq(null)}>Cancel</button>
              <button className="admin-del-confirm-btn" onClick={() => handleDeleteRequest(deletingReq)}>Yes, Delete</button>
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
