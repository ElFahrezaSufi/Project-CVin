import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user, duplicateCV, saveCV } = useAuth();
  const [info, setInfo] = useState('');
  const [selectedCV, setSelectedCV] = useState(null);

  if (!user) return null;

  // Hapus CV
  const handleDelete = (cvId) => {
    if (!window.confirm('Yakin hapus CV ini?')) return;
    const newCVs = user.cvs.filter(c => c.id !== cvId);
    saveCV({ cvs: newCVs }, user.id); // Overwrite cvs array
    setInfo('CV dihapus');
    setTimeout(()=>setInfo(''),2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-600">Status Akun: <span className={`font-medium capitalize ${user.plan === 'premium' ? 'text-primary' : 'text-amber-600'}`}>{user.plan}</span></p>
          {user.plan === 'free' && <>
            <div className="text-xs text-gray-500">Limit CV: 1 (Free). Hapus CV lama untuk tambah baru.</div>
            <Link to="/payment" className="inline-block mt-1 text-primary text-sm hover:underline">Upgrade ke Premium →</Link>
          </>}
        </div>
        <Link to="/generator"><Button>Buat CV Baru</Button></Link>
      </div>

      {info && <div className="mb-4 text-sm text-primary">{info}</div>}

      <div className="grid md:grid-cols-3 gap-6">
        {user.cvs?.length ? user.cvs.map(cv => (
          <Card key={cv.id} className="flex flex-col h-full">
            <div className="mb-2">
              <h3 className="font-semibold mb-1 truncate">{cv.title || 'CV Tanpa Judul'}</h3>
              <p className="text-xs text-gray-500 mb-1">Diperbarui: {cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString() : '-'}</p>
              <div className="text-xs text-gray-700 mb-2">
                <span className="block">Nama: {cv.name || '-'}</span>
                <span className="block">Email: {cv.email || '-'}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mt-auto">
              <Link to={{ pathname: '/generator', state: { cv } }}><Button variant="outline" className="text-xs px-3 py-1.5">Edit</Button></Link>
              <Button variant="subtle" className="text-xs px-3 py-1.5" onClick={() => { duplicateCV(cv.id); setInfo('CV diduplikasi'); setTimeout(()=>setInfo(''),2000); }}>Duplikat</Button>
              <Button variant="subtle" className="text-xs px-3 py-1.5 text-red-600" onClick={() => handleDelete(cv.id)}>Hapus</Button>
            </div>
          </Card>
        )) : <div className="text-gray-600">Belum ada CV. Mulai buat sekarang.</div>}
      </div>
    </div>
  );
}
