## CVin – Generator CV Profesional

CVin adalah website generator CV sederhana dengan sistem Free & Premium. Dibangun menggunakan React + Tailwind CSS. Fokus pada tampilan modern, clean, dan minimalis untuk membantu pencari kerja di Indonesia membuat CV secara cepat.

### ✨ Fitur Utama
- Generator CV dengan form dasar (Free) & tambahan (Premium)
- Live preview real-time
- Export PDF (Free & Premium) + Export Word (Premium)
- Watermark otomatis untuk akun Free
- Limit export (Free: 3x PDF) & limit CV tersimpan (Free: 1 CV yang disimpan)
- Upgrade manual via pembayaran Dana + verifikasi admin
- Admin panel sederhana untuk verifikasi pembayaran

### 🧭 Struktur Halaman
1. Landing Page (Hero, Fitur, Pricing)
2. Generator Page (Form + Preview + Export)
3. Login & Signup
4. Dashboard User (Daftar CV, status akun, duplikasi, upgrade)
5. Halaman Pembayaran Premium (upload bukti transfer)
6. Admin Panel (verifikasi pembayaran & data user)

### 🗂️ Data & Batasan
| Kategori | Free | Premium |
|----------|------|---------|
| CV tersimpan | 1 | Unlimited |
| Export PDF | 3x | Unlimited |
| Export Word | ✕ | ✓ |
| Watermark | ✓ | ✕ |
| Bidang tambahan (Ringkasan, Sertifikasi, Bahasa) | ✕ | ✓ |

### 🎨 Style & Branding
- Warna utama: #1E88E5
- Font: Poppins / Roboto
- Komponen: Card (rounded, shadow, spacing), layout responsif

### 🛠️ Teknologi
- React + Vite
- Tailwind CSS
- html2pdf.js (Export PDF)
- docx (Export Word)
- localStorage (mock database & session)

### 🔐 Autentikasi & Peran
- user (default signup)
- admin (email: admin@cvin.id / password: admin123) – dibuat otomatis

### 📦 Cara Menjalankan (Development)
```bash
npm install
npm run dev
```
Lalu buka: http://localhost:5173

### 🚀 Build Production
```bash
npm run build
npm run preview
```

### 📝 Catatan Penggunaan
- Untuk menguji fitur Premium: login admin dan approve pembayaran yang diupload user.
- Batas export & watermark diatur di `AuthContext` dan util `exporters.js`.
- Data tersimpan di localStorage (hapus storage browser untuk reset).

### 📌 Roadmap (Next)
- Tema CV multiple
- Drag & drop urutan section
- Multi bahasa (EN/ID toggle)
- Integrasi backend + pembayaran otomatis
- Fitur share link CV online

### ⚠️ Disclaimer
Aplikasi ini masih prototipe (client-side only). Jangan simpan data sensitif.

---

Dibuat untuk kebutuhan belajar & validasi ide. Kontribusi & saran dipersilakan.

