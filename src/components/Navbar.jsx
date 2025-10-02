import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary">CVin</Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>Beranda</NavLink>
          <NavLink to="/generator" className={navLinkClass}>Generator</NavLink>
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          {user && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
          {!user && <NavLink to="/login" className={navLinkClass}>Masuk</NavLink>}
          {!user && <NavLink to="/signup" className={navLinkClass}>Daftar</NavLink>}
          {user && (
            <button onClick={logout} className="ml-2 text-sm text-white bg-primary px-4 py-2 rounded-md hover:opacity-90">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
