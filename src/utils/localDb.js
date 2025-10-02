// Simple localStorage-based pseudo database
// Keys
// cvin_users, cvin_resumes, cvin_payments

const LS_KEYS = {
  users: 'cvin_users',
  resumes: 'cvin_resumes',
  payments: 'cvin_payments'
};

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Users
export function dbCreateUser(user) {
  const users = read(LS_KEYS.users);
  users.push(user);
  write(LS_KEYS.users, users);
  return user;
}

export function dbUpdateUser(id, patch) {
  const users = read(LS_KEYS.users);
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...patch };
    write(LS_KEYS.users, users);
    return users[idx];
  }
  return null;
}

export function dbFindUserByEmail(email) {
  return read(LS_KEYS.users).find(u => u.email === email);
}

export function dbGetUser(id) {
  return read(LS_KEYS.users).find(u => u.id === id);
}

// Resumes
export function dbSaveResume(resume) {
  const resumes = read(LS_KEYS.resumes);
  const idx = resumes.findIndex(r => r.id === resume.id);
  if (idx === -1) resumes.push(resume); else resumes[idx] = resume;
  write(LS_KEYS.resumes, resumes);
  return resume;
}

export function dbListResumes(userId) {
  return read(LS_KEYS.resumes).filter(r => r.userId === userId);
}

export function dbDeleteResume(id, userId) {
  const resumes = read(LS_KEYS.resumes).filter(r => !(r.id === id && r.userId === userId));
  write(LS_KEYS.resumes, resumes);
}

// Payments
export function dbCreatePayment(payment) {
  const payments = read(LS_KEYS.payments);
  payments.push(payment);
  write(LS_KEYS.payments, payments);
  return payment;
}

export function dbListPayments() { return read(LS_KEYS.payments); }

export function dbUpdatePayment(id, patch) {
  const payments = read(LS_KEYS.payments);
  const idx = payments.findIndex(p => p.id === id);
  if (idx !== -1) {
    payments[idx] = { ...payments[idx], ...patch };
    write(LS_KEYS.payments, payments);
    return payments[idx];
  }
  return null;
}

// Utility ID
export function genId(prefix='id') {
  return prefix + '_' + Math.random().toString(36).slice(2,10);
}

export function initDb() {
  // Ensure arrays
  ['users','resumes','payments'].forEach(k => {
    if (!localStorage.getItem(LS_KEYS[k])) write(LS_KEYS[k], []);
  });
}

// Call on module load (safe in browser)
if (typeof window !== 'undefined') {
  initDb();
}
