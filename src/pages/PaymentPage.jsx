import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function PaymentPage() {
  const { submitPayment, user, payments } = useAuth();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  if (!user) return null;

  const userPayment = payments.find(p => p.userId === user.id && p.status === 'pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) { setMsg('Harap pilih file bukti transfer'); return; }
    if (file.size > 5 * 1024 * 1024) { setMsg('Ukuran maksimal 5MB'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      submitPayment(reader.result);
      setMsg('Bukti terkirim. Menunggu verifikasi admin');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Upgrade ke Premium</h1>
  <p className="text-sm text-gray-600 mb-4">Lakukan pembayaran manual via Dana ke nomor: <span className="font-medium">087861260156</span> a.n. <span className="font-medium">CVin Digital</span>. Setelah transfer, upload bukti untuk diverifikasi.</p>
        {user.plan === 'premium' && <div className="text-green-600 text-sm mb-4">Anda sudah Premium.</div>}
        {userPayment && <div className="text-sm text-amber-600 mb-4">Pembayaran menunggu verifikasi admin.</div>}
        {!userPayment && user.plan !== 'premium' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="file" accept="image/png,image/jpeg" onChange={e => setFile(e.target.files[0])} />
            <Button>Upload Bukti</Button>
          </form>
        )}
        {msg && <div className="mt-4 text-sm text-primary">{msg}</div>}
      </Card>
    </div>
  );
}
