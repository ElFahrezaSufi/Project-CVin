import React from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminPage() {
  const { users, payments, updatePaymentStatus } = useAuth();

  const userMap = Object.fromEntries(users.map(u => [u.id, u]));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <section>
        <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold mb-2">Statistik Pengguna</h3>
            <p className="text-sm text-gray-600">Total: {users.length}</p>
            <p className="text-sm text-gray-600">Free: {users.filter(u => u.plan === 'free').length}</p>
            <p className="text-sm text-gray-600">Premium: {users.filter(u => u.plan === 'premium').length}</p>
          </Card>
          <Card className="md:col-span-2">
            <h3 className="font-semibold mb-3">Daftar Pengguna</h3>
            <div className="max-h-64 overflow-y-auto text-sm space-y-2 pr-1">
              {users.map(u => (
                <div key={u.id} className="flex justify-between border-b pb-1">
                  <span>{u.email}</span>
                  <span className="capitalize {u.plan==='premium'?'text-primary':''}">{u.plan}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Verifikasi Pembayaran</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {payments.length ? payments.map(p => (
            <Card key={p.id}>
              <p className="text-sm mb-2">User: {userMap[p.userId]?.email}</p>
              <p className="text-xs mb-2">Status: <span className="capitalize font-medium">{p.status}</span></p>
              {p.proof && <img src={p.proof} alt="bukti" className="w-full h-40 object-cover rounded mb-3" />}
              <div className="flex gap-2">
                {p.status === 'pending' && (
                  <>
                    <Button onClick={() => updatePaymentStatus(p.id, 'approved')} variant="outline">Approve</Button>
                    <Button onClick={() => updatePaymentStatus(p.id, 'rejected')} variant="subtle">Reject</Button>
                  </>
                )}
              </div>
            </Card>
          )) : <div>Tidak ada pembayaran.</div>}
        </div>
      </section>
    </div>
  );
}
