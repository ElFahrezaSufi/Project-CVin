import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadJSON, saveJSON } from '../utils/storage.js';
import { 
  dbCreateUser, dbFindUserByEmail, dbGetUser, dbUpdateUser,
  dbCreatePayment, dbUpdatePayment, dbListPayments,
  dbSaveResume, dbListResumes, dbDeleteResume, genId
} from '../utils/localDb.js';

const AuthContext = createContext(null);

const USERS_KEY = 'cvin_users';
const SESSION_KEY = 'cvin_session';
const PAYMENTS_KEY = 'cvin_payments';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Backward compatibility: load existing local arrays
    let legacyUsers = loadJSON(USERS_KEY, []);
    // Ensure admin
    if (!legacyUsers.find(x => x.role === 'admin')) {
      legacyUsers.push({ id: 'admin-user', email: 'admin@cvin.id', password: 'admin123', role: 'admin', plan: 'premium', cvs: [], exportCount: 0 });
    }
    setUsers(legacyUsers);
    setPayments(loadJSON(PAYMENTS_KEY, []));
    const session = loadJSON(SESSION_KEY, null);
    if (session) {
      const found = legacyUsers.find(u => u.id === session.id);
      if (found) setUser(found);
    }
  }, []);

  useEffect(() => { saveJSON(USERS_KEY, users); }, [users]);
  useEffect(() => { saveJSON(PAYMENTS_KEY, payments); }, [payments]);
  useEffect(() => { saveJSON(SESSION_KEY, user); }, [user]);

  const signup = (email, password) => {
    if (users.find(u => u.email === email)) throw new Error('Email sudah terdaftar');
    const newUser = { id: genId('u'), email, password, role: 'user', plan: 'free', cvs: [], exportCount: 0 };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
  };

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Email atau password salah');
    setUser(found);
  };

  const logout = () => setUser(null);

  const submitPayment = (proof) => {
    if (!user) return;
    const payment = { id: genId('pay'), userId: user.id, status: 'pending', proof, createdAt: Date.now(), method: 'dana' };
    setPayments(prev => [payment, ...prev]);
  };

  const updatePaymentStatus = (paymentId, status) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status } : p));
    if (status === 'approved') {
      const pay = payments.find(p => p.id === paymentId);
      if (pay) {
        setUsers(prev => prev.map(u => u.id === pay.userId ? { ...u, plan: 'premium' } : u));
        setUser(prev => prev && prev.id === pay.userId ? { ...prev, plan: 'premium' } : prev);
      }
    }
  };

  const canCreateCV = () => {
    if (!user) return false;
    if (user.plan === 'premium') return true;
    return (user.cvs?.length || 0) < 1; // free limit 1 CV
  };

  const saveCV = (cvData, existingId) => {
    if (!user) return;
    if (!existingId && !canCreateCV()) throw new Error('Limit CV untuk akun Free tercapai. Upgrade ke Premium.');
    // store inside user record (legacy) for now
    setUsers(prev => prev.map(u => {
      if (u.id !== user.id) return u;
      let cvs = [...(u.cvs||[])];
      if (existingId) {
        cvs = cvs.map(c => c.id === existingId ? { ...c, ...cvData, updatedAt: Date.now() } : c);
      } else {
        cvs.push({ id: genId('cv'), ...cvData, createdAt: Date.now(), updatedAt: Date.now() });
      }
      return { ...u, cvs };
    }));
  };

  const duplicateCV = (id) => {
    if (!user) return;
    setUsers(prev => prev.map(u => {
      if (u.id !== user.id) return u;
      const original = u.cvs.find(c => c.id === id);
      if (!original) return u;
      return { ...u, cvs: [...u.cvs, { ...original, id: crypto.randomUUID(), title: original.title + ' (Copy)', createdAt: Date.now(), updatedAt: Date.now() }] };
    }));
  };

  const canExport = (format) => {
    if (!user) return false;
    if (user.plan === 'premium') return true;
    if (format === 'docx') return false; // free tidak boleh
    return (user.exportCount || 0) < 3; // free limit 3
  };

  const incrementExport = () => {
    if (!user) return;
    if (user.plan === 'premium') return; // unlimited
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, exportCount: (u.exportCount || 0) + 1 } : u));
    setUser(prev => prev ? { ...prev, exportCount: (prev.exportCount || 0) + 1 } : prev);
  };

  const value = {
    user,
    users,
    payments,
    login,
    signup,
    logout,
    submitPayment,
    updatePaymentStatus,
    saveCV,
    duplicateCV,
    canCreateCV,
    canExport,
    incrementExport
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
