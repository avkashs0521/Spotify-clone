import React from 'react';

export default function ProfilePage() {
  return (
    <div className="page">
      <div className="page-hero">
        <div style={{
          width: 200, height: 200, borderRadius: "50%", background: "#535353",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 72, fontWeight: 700, boxShadow: "0 16px 48px rgba(0,0,0,.5)", flexShrink: 0
        }}>
          U
        </div>
        <div className="hero-info">
          <p className="hero-type">Profile</p>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 900, margin: "12px 0" }}>User</h1>
          <p className="hero-meta">0 Public Playlists · 0 Followers · 0 Following</p>
        </div>
      </div>
    </div>
  );
}
