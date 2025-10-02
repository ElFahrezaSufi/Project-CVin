import React from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

const plans = [
  {
    id: 'monthly',
    title: 'Premium Bulanan',
    price: 'Rp10.000',
    subtitle: '/ bulan',
    features: [
      'Semua template premium',
      'Export PDF & Word',
      'Tanpa watermark',
      'Prioritas dukungan'
    ],
    cta: 'Pilih Bulanan'
  },
  {
    id: 'lifetime',
    title: 'Premium Seumur Hidup',
    price: 'Rp50.000',
    subtitle: '/ sekali bayar',
    highlight: true,
    features: [
      'Akses selamanya',
      'Semua fitur bulanan',
      'Update gratis',
      'Nilai terbaik'
    ],
    cta: 'Pilih Lifetime'
  }
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Harga Paket</h1>
        <p className="text-gray-600">Pilih paket yang sesuai dengan kebutuhan karir Anda.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`relative rounded-xl border shadow-sm bg-white p-6 flex flex-col transition hover:shadow-lg hover:-translate-y-0.5 duration-200 ${plan.highlight ? 'ring-2 ring-primary' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Paling Populer</div>
            )}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1">{plan.title}</h2>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-sm text-gray-500 mb-1">{plan.subtitle}</span>
              </div>
            </div>
            <ul className="space-y-2 text-sm flex-1 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-primary">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant={plan.highlight ? 'primary' : 'outline'} className="w-full">{plan.cta}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
