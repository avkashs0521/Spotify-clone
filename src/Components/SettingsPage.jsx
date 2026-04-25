import React from 'react';

export default function SettingsPage() {
  return (
    <div className="page" style={{ paddingTop: 60 }}>
      <h1 style={{ fontSize: 32, marginBottom: 32, fontWeight: 900 }}>Settings</h1>
      
      <div style={{ marginBottom: 40, maxWidth: 600 }}>
        <h3 style={{ fontSize: 16, marginBottom: 16, borderBottom: "1px solid #282828", paddingBottom: 12, color: "#b3b3b3" }}>Language</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>Choose language</span>
          <select style={{ background: "#333", color: "#fff", border: "1px solid #555", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 14 }}>
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>
      
      <div style={{ marginBottom: 40, maxWidth: 600 }}>
        <h3 style={{ fontSize: 16, marginBottom: 16, borderBottom: "1px solid #282828", paddingBottom: 12, color: "#b3b3b3" }}>Audio quality</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 14 }}>Streaming quality</span>
          <select style={{ background: "#333", color: "#fff", border: "1px solid #555", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 14 }}>
            <option>Automatic</option>
            <option>High</option>
            <option>Very High</option>
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>Auto adjust quality</span>
          <input type="checkbox" defaultChecked style={{ width: 16, height: 16, cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}
