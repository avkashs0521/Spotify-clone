import React from 'react';

export default function AccountPage() {
  return (
    <div className="page" style={{ paddingTop: 60 }}>
      <h1 style={{ fontSize: 48, marginBottom: 24, fontWeight: 900, letterSpacing: "-1px" }}>Account overview</h1>
      <div style={{ background: "#282828", padding: 32, borderRadius: 8, maxWidth: 600 }}>
        <h3 style={{ fontSize: 24, marginBottom: 24 }}>Profile</h3>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #444", padding: "16px 0" }}>
          <span style={{ color: "#b3b3b3", fontSize: 14 }}>Username</span>
          <span style={{ fontWeight: 500 }}>User</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #444", padding: "16px 0" }}>
          <span style={{ color: "#b3b3b3", fontSize: 14 }}>Email</span>
          <span style={{ fontWeight: 500 }}>user@example.com</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #444", padding: "16px 0" }}>
          <span style={{ color: "#b3b3b3", fontSize: 14 }}>Plan</span>
          <span style={{ fontWeight: 500 }}>Spotify Free</span>
        </div>
        <button style={{ 
          marginTop: 32, background: "#fff", color: "#000", border: "none", 
          padding: "14px 32px", borderRadius: 500, fontWeight: 700, cursor: "pointer",
          fontSize: 14, transition: "transform 0.1s"
        }}>
          Edit profile
        </button>
      </div>
    </div>
  );
}
