import React from 'react';
import { IHome, ISearch, ILib } from './icons';

export default function MobileNav({ page, nav }) {
  return (
    <div className="mobile-nav">
      <button 
        className={`mobile-nav-item${page === "home" ? " active" : ""}`} 
        onClick={() => nav("home")}
      >
        <IHome />
        <span>Home</span>
      </button>
      <button 
        className={`mobile-nav-item${page === "search" ? " active" : ""}`} 
        onClick={() => nav("search")}
      >
        <ISearch />
        <span>Search</span>
      </button>
      <button 
        className={`mobile-nav-item${page === "library" ? " active" : ""}`} 
        onClick={() => nav("library")}
      >
        <ILib />
        <span>Library</span>
      </button>
    </div>
  );
}
