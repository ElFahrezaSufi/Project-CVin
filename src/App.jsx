import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import GeneratorPage from './pages/GeneratorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <div className="p-8 text-center">Harap login terlebih dahulu.</div>;
  return children;
}

function AdminOnly({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <div className="p-8 text-center">Akses ditolak.</div>;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            {/* Preview template sudah dihandle di GeneratorPage, route /templates dihapus */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
            <Route path="/payment" element={<Protected><PaymentPage /></Protected>} />
            <Route path="/admin" element={<AdminOnly><AdminPage /></AdminOnly>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
