import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';

const features = [
  { title: 'Cepat & Mudah', desc: 'Buat CV profesional dalam hitungan menit tanpa ribet.' },
  { title: 'Desain Rapi', desc: 'Layout bersih dan mudah dibaca HRD.' },
  { title: 'Export PDF & Word', desc: 'Format umum yang siap digunakan (Premium unlock Word).' },
  { title: 'Simpan & Edit', desc: 'Kelola beberapa versi CV kamu (Premium tanpa batas).' },
];

export default function LandingPage() {
  return (
    <div>
      <section className="pt-20 pb-24 bg-gradient-to-b from-white to-graybg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">CVin – Buat CV Profesional dalam <span className="text-primary">Hitungan Menit</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Platform generator CV modern untuk pencari kerja Indonesia. Fokus pada kesederhanaan, kecepatan, dan hasil yang profesional.</p>
          <div className="flex justify-center gap-4">
            <Link to="/generator"><Button>Buat CV Sekarang</Button></Link>
            <a href="#pricing"><Button variant="outline">Lihat Harga</Button></a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">Fitur Utama</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map(f => (
              <Card key={f.title}>
                <h3 className="font-semibold mb-2 text-primary">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-10 text-center">Paket Harga</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="relative">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-gray-600 text-sm mb-4">Cukup untuk mulai membuat CV dasar.</p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✓ Form dasar (Data diri, Pendidikan, Pengalaman, Skill)</li>
                <li>✓ Export PDF (max 3x)</li>
                <li>✓ Watermark kecil</li>
                <li>✕ Hanya 1 CV tersimpan</li>
                <li>✕ Tidak ada bidang tambahan</li>
              </ul>
              <Link to="/signup"><Button className="w-full">Mulai Gratis</Button></Link>
            </Card>
            <Card className="relative border-primary/40 ring-2 ring-primary/20">
              <div className="absolute -top-4 right-6 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">Paling Populer</div>
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-gray-600 text-sm mb-4">Fleksibilitas penuh untuk pencari kerja serius.</p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✓ Semua fitur Free</li>
                <li>✓ Export PDF & Word tanpa batas</li>
                <li>✓ Tanpa watermark</li>
                <li>✓ CV tersimpan tanpa batas</li>
                <li>✓ Bidang tambahan (Ringkasan, Sertifikasi, Bahasa)</li>
              </ul>
              <Link to="/signup"><Button className="w-full" variant="outline">Upgrade Sekarang</Button></Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
