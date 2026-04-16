import { useState } from "react";
import "./BlogPage.css";
import { BLOG_POSTS } from "../data/constants";

// ─── BACK ARROW ICON (inline, not in Icons.jsx to keep it self-contained) ─────
function ArrowLeft({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ─── BLOG CARD ────────────────────────────────────────────────────────────────
function BlogCard({ post, onOpen }) {
  return (
    <div className="bcard" onClick={() => onOpen(post)}>
      <div className="bcard-img" style={{ background: post.gradient }}>
        <span className="bcard-cat">{post.category}</span>
      </div>
      <div className="bcard-body">
        <div className="bcard-title">{post.title}</div>
        <p className="bcard-tagline">{post.tagline}</p>
      </div>
      <div className="bcard-foot">
        <span className="bcard-meta">{post.date} · {post.readTime}</span>
        <span className="bcard-read">Read →</span>
      </div>
    </div>
  );
}

// ─── ARTICLE VIEW ─────────────────────────────────────────────────────────────
function ArticleView({ post, onBack }) {
  return (
    <div className="article-page">
      {/* Gradient colour band at top */}
      <div className="article-band" style={{ background: post.gradient }} />

      {/* Hero */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <button className="article-back" onClick={onBack}>
            <ArrowLeft size={13} /> Back to Blog
          </button>
          <div className="article-cat">{post.category}</div>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-tagline">{post.tagline}</p>
          <div className="article-meta">
            <span>{post.date}</span>
            <span className="article-meta-dot" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="article-body">
        <p className="article-intro">{post.intro}</p>

        {post.sections.map((s, i) => (
          <div className="article-section" key={i}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </div>
        ))}

        <div className="article-tip">
          <h3>{post.tip.heading}</h3>
          <p>{post.tip.body}</p>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
export function BlogPage({ setPage }) {
  const [activePost, setActivePost] = useState(null);

  // Open a specific article
  const openPost = (post) => {
    setActivePost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Go back to blog index
  const backToIndex = () => {
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show article view if a post is selected
  if (activePost) {
    return <ArticleView post={activePost} onBack={backToIndex} />;
  }

  // Otherwise show the blog index
  return (
    <div className="page">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="blog-hero">
        <div className="blog-hero-rule" />
        <p className="eyebrow a1">Insights & Guides</p>
        <h1 className="a2">The PropertyHub <em>Blog</em></h1>
        <p className="a3">
          Practical guides, market updates, and honest advice for buyers,
          renters, and investors in Abuja's property market.
        </p>
      </section>

      {/* ── BLOG GRID ─────────────────────────────────────────────────────── */}
      <section className="blog-sec">
        <div className="inner">
          <div className="blog-grid">
            {BLOG_POSTS.map(post => (
              <BlogCard key={post.id} post={post} onOpen={openPost} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
