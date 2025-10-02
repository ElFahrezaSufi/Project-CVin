import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-primary font-semibold mb-2">CVin</h3>
          <p className="text-gray-600">Generator CV modern & cepat untuk pencari kerja Indonesia.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Navigasi</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="/" className="hover:text-primary">Beranda</Link></li>
            <li><Link to="/generator" className="hover:text-primary">Generator</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Kontak</h4>
            <p className="text-gray-600">Email: support@cvin.id</p>
            <p className="text-gray-600">Dana: 087861260156</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">&copy; {new Date().getFullYear()} CVin Digital. All rights reserved.</div>
    </footer>
  );
}
