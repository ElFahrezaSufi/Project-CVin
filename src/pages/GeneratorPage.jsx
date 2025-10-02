import React, { useRef, useState } from 'react';
import TemplateCard from '../components/TemplateCard.jsx';
import Card from '../components/Card.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { exportPDF, exportDOCX } from '../utils/exporters.js';
// Template config now fetched dynamically from /public/templates/{id}.json
import Azurill from '../components/Azurill.jsx';
import Bronzor from '../components/Bronzor.jsx';
import Chikorita from '../components/Chikorita.jsx';
import Ditto from '../components/Ditto.jsx';

// Daftar template otomatis dari komponen dan gambar di /public/templates
const templateList = [
  { id: 'azurill', name: 'Azurill', component: Azurill },
  { id: 'bronzor', name: 'Bronzor', component: Bronzor },
  { id: 'chikorita', name: 'Chikorita', component: Chikorita },
  { id: 'ditto', name: 'Ditto', component: Ditto },
  { id: 'simple', name: 'Simple', component: null },
  // Tambahkan template baru di sini jika ada komponen baru
];

function getTemplateImage(id) {
  try {
    // Cek apakah file gambar ada di public/templates
    return `/templates/${id}.jpg`;
  } catch {
    return null;
  }
}

const dummyData = {
  name: 'Nama Lengkap',
  email: 'email@contoh.com',
  phone: '08123456789',
  education: 'Universitas Contoh\nS1 Teknik Informatika',
  experience: 'PT Contoh\nSoftware Engineer',
  skills: 'JavaScript, React, Node.js',
  summary: 'Saya seorang software engineer berpengalaman.',
  certifications: 'AWS Certified, Google Cloud',
  languages: 'Indonesia, Inggris',
  projects: 'Aplikasi CV Generator',
};


// Komponen editor untuk array section (pengalaman, pendidikan, dll)
function SectionEditor({ type, items, onChange }) {
  const labels = {
    experience: 'Pengalaman Kerja',
    education: 'Pendidikan',
    skills: 'Skill',
    projects: 'Proyek',
    certifications: 'Sertifikasi',
    languages: 'Bahasa'
  };
  const genId = () => (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
  const addItem = () => {
    const base = { id: genId() };
    let obj = base;
    switch(type){
      case 'experience': obj = { ...base, company:'', position:'', location:'', date:'', summary:'' }; break;
      case 'education': obj = { ...base, institution:'', studyType:'', area:'', date:'' }; break;
      case 'skills': obj = { ...base, name:'', description:'', level:3 }; break;
      case 'projects': obj = { ...base, name:'', description:'', date:'' }; break;
      case 'certifications': obj = { ...base, name:'', issuer:'', date:'' }; break;
      case 'languages': obj = { ...base, name:'', description:'', level:3 }; break;
    }
    onChange([...(items||[]), obj]);
  };
  const update = (id, field, value) => {
    onChange(items.map(it => it.id === id ? { ...it, [field]: value } : it));
  };
  const remove = (id) => onChange(items.filter(it => it.id !== id));
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-semibold tracking-wide text-gray-600 uppercase">{labels[type]}</h4>
        <button type="button" onClick={addItem} className="text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 transition text-white rounded">Tambah</button>
      </div>
      {(!items || items.length===0) && (
        <p className="text-[10px] text-gray-400 mb-2">Belum ada data {labels[type].toLowerCase()}.</p>
      )}
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="border rounded p-2 bg-gray-50">
            <div className="flex justify-end mb-1">
              <button type="button" onClick={()=>remove(item.id)} className="text-[10px] text-red-500 hover:underline">Hapus</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {type==='experience' && (
                <>
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Perusahaan" value={item.company} onChange={e=>update(item.id,'company',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Posisi" value={item.position} onChange={e=>update(item.id,'position',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Lokasi" value={item.location} onChange={e=>update(item.id,'location',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Tanggal" value={item.date} onChange={e=>update(item.id,'date',e.target.value)} />
                  <textarea className="col-span-2 w-full rounded border border-gray-300 px-2 py-1 text-[11px] h-16 resize-none" placeholder="Ringkasan" value={item.summary} onChange={e=>update(item.id,'summary',e.target.value)} />
                </>
              )}
              {type==='education' && (
                <>
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Institusi" value={item.institution} onChange={e=>update(item.id,'institution',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Jenjang" value={item.studyType} onChange={e=>update(item.id,'studyType',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Bidang" value={item.area} onChange={e=>update(item.id,'area',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Tanggal" value={item.date} onChange={e=>update(item.id,'date',e.target.value)} />
                </>
              )}
              {type==='skills' && (
                <>
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Nama Skill" value={item.name} onChange={e=>update(item.id,'name',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Deskripsi" value={item.description} onChange={e=>update(item.id,'description',e.target.value)} />
                  <div className="col-span-2 flex items-center gap-2">
                    <label className="text-[10px] text-gray-500">Level:</label>
                    <input type="range" min="1" max="5" value={item.level} onChange={e=>update(item.id,'level',Number(e.target.value))} className="flex-1" />
                    <span className="text-[10px] w-4 text-right">{item.level}</span>
                  </div>
                </>
              )}
              {type==='projects' && (
                <>
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Nama" value={item.name} onChange={e=>update(item.id,'name',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Tanggal" value={item.date} onChange={e=>update(item.id,'date',e.target.value)} />
                  <textarea className="col-span-2 w-full rounded border border-gray-300 px-2 py-1 text-[11px] h-16 resize-none" placeholder="Deskripsi" value={item.description} onChange={e=>update(item.id,'description',e.target.value)} />
                </>
              )}
              {type==='certifications' && (
                <>
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Nama" value={item.name} onChange={e=>update(item.id,'name',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Penerbit" value={item.issuer} onChange={e=>update(item.id,'issuer',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Tanggal" value={item.date} onChange={e=>update(item.id,'date',e.target.value)} />
                </>
              )}
              {type==='languages' && (
                <>
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Bahasa" value={item.name} onChange={e=>update(item.id,'name',e.target.value)} />
                  <input className="w-full rounded border border-gray-300 px-2 py-1 text-[11px]" placeholder="Deskripsi" value={item.description} onChange={e=>update(item.id,'description',e.target.value)} />
                  <div className="col-span-2 flex items-center gap-2">
                    <label className="text-[10px] text-gray-500">Level:</label>
                    <input type="range" min="1" max="5" value={item.level} onChange={e=>update(item.id,'level',Number(e.target.value))} className="flex-1" />
                    <span className="text-[10px] w-4 text-right">{item.level}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function GeneratorPage() {
  const { user, saveCV, canCreateCV, canExport, incrementExport } = useAuth();
  // Template aktif
  const [template, setTemplate] = useState('azurill');
  // Data form dinamis
  const [data, setData] = useState({ ...dummyData });
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [accentColor, setAccentColor] = useState('#1E88E5');
  const [modal, setModal] = useState(null); // id template yang sedang di-preview
  const previewRef = useRef(null);

  // State untuk sections (array items) hasil JSON
  const [sectionsState, setSectionsState] = useState({
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  });

  const [templateConfig, setTemplateConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [configError, setConfigError] = useState(null);

  // Ambil JSON template saat template berubah
  React.useEffect(() => {
    let active = true;
    const fetchConfig = async () => {
      setLoadingConfig(true); setConfigError(null);
      try {
        const res = await fetch(`/templates/${template}.json`);
        if (!res.ok) throw new Error(`Gagal memuat konfigurasi (${res.status})`);
        const json = await res.json();
        if (!active) return;
        setTemplateConfig(json);
        // Seed data awal jika kosong
        setData(prev => ({
          ...prev,
          name: prev.name || json.basics?.name || '',
          email: prev.email || json.basics?.email || '',
          phone: prev.phone || json.basics?.phone || '',
          summary: prev.summary || json.sections?.summary?.content?.replace(/<[^>]+>/g,'') || ''
        }));
        // Inisialisasi sectionsState dari JSON (sederhanakan struktur)
        const mapItems = (arr = []) => (Array.isArray(arr) ? arr.filter(it=>it.visible!==false) : []);
        setSectionsState({
          experience: mapItems(json.sections?.experience?.items).map(it => ({ id: it.id || crypto.randomUUID(), company: it.company || '', position: it.position || '', date: it.date || '', location: it.location || '', summary: it.summary ? it.summary.replace(/<[^>]+>/g,'') : '' })),
          education: mapItems(json.sections?.education?.items).map(it => ({ id: it.id || crypto.randomUUID(), institution: it.institution || '', studyType: it.studyType || '', area: it.area || '', date: it.date || '' })),
            skills: mapItems(json.sections?.skills?.items).map(it => ({ id: it.id || crypto.randomUUID(), name: it.name || '', description: it.description || '', level: typeof it.level === 'number' ? it.level : 3 })),
          projects: mapItems(json.sections?.projects?.items).map(it => ({ id: it.id || crypto.randomUUID(), name: it.name || '', description: it.description || '', date: it.date || '' })),
          certifications: mapItems(json.sections?.certifications?.items).map(it => ({ id: it.id || crypto.randomUUID(), name: it.name || '', issuer: it.issuer || '', date: it.date || '' })),
          languages: mapItems(json.sections?.languages?.items).map(it => ({ id: it.id || crypto.randomUUID(), name: it.name || '', description: it.description || '', level: typeof it.level === 'number' ? it.level : 3 }))
        });
        // Jika JSON punya warna default di masa depan (style.accent) bisa di-set di sini
      } catch (e) {
        if (active) setConfigError(e.message);
      } finally {
        if (active) setLoadingConfig(false);
      }
    };
    fetchConfig();
    return () => { active = false; };
  }, [template]);

  // Derive schema fields: ambil dari basics + sections yang visible
  const schema = React.useMemo(() => {
    if (!templateConfig) return Object.keys(dummyData);
    const fields = new Set(['name','email','phone']);
    if (templateConfig.basics?.headline) fields.add('headline');
    if (templateConfig.sections) {
      Object.values(templateConfig.sections).forEach(sec => {
        if (!sec || sec.visible === false) return;
        if (sec.id === 'summary') fields.add('summary');
        if (sec.id === 'education') fields.add('education');
        if (sec.id === 'experience') fields.add('experience');
        if (sec.id === 'skills') fields.add('skills');
        if (sec.id === 'projects') fields.add('projects');
        if (sec.id === 'certifications') fields.add('certifications');
        if (sec.id === 'languages') fields.add('languages');
      });
    }
    return Array.from(fields);
  }, [templateConfig]);

  // Pastikan halaman dapat discroll: jangan paksa body overflow hidden di sini
  React.useEffect(() => {
    // Jika sebelumnya pernah diset hidden oleh halaman lain, reset ke auto
    if (document.body.style.overflowY === 'hidden') {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  const handleChange = (field) => (e) => setData(d => ({ ...d, [field]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    try {
      saveCV(data);
      setMessage('CV berhasil disimpan');
      setTimeout(()=>setMessage(''),2500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleExport = async (format) => {
    if (!canExport(format)) { setMessage('Limit export tercapai atau format tidak tersedia untuk Free'); return; }
    if (format === 'pdf') {
      await exportPDF(previewRef.current, { watermark: user?.plan !== 'premium', fileName: data.name || 'cv' });
    } else {
      await exportDOCX(data, { fileName: data.name || 'cv' });
    }
    incrementExport();
  };

  const disabledPremium = user?.plan !== 'premium';

  // Adapter: data untuk komponen template
  const getTemplateData = () => {
    // Untuk Azurill, Bronzor, Chikorita, Ditto, mapping data ke format resume
    const mapSkillItems = () => (sectionsState.skills.length > 0
      ? sectionsState.skills.map(s => ({ id: s.id, name: s.name, description: s.description, level: s.level || 3 }))
      : (data.skills||'').split(',').filter(Boolean).map((s,i)=>({ id:'sk'+i, name:s.trim(), description:'', level:3 }))
    );
    const expItems = sectionsState.experience.length > 0 ? sectionsState.experience.map(it => ({ id: it.id, company: it.company, position: it.position, location: it.location, date: it.date, summary: it.summary })) : [{ id: 'exp1', company: data.experience, position: '', location: '', date: '' }];
    const eduItems = sectionsState.education.length > 0 ? sectionsState.education.map(it => ({ id: it.id, institution: it.institution, area: it.area, studyType: it.studyType, score: '', date: it.date })) : [{ id: 'edu1', institution: data.education, area: '', score: '', studyType: '', date: '' }];
    const projItems = sectionsState.projects.length > 0 ? sectionsState.projects.map(it => ({ id: it.id, name: it.name, description: it.description, date: it.date })) : [{ id: 'proj1', name: data.projects, description: '' }];
    const certItems = sectionsState.certifications.length > 0 ? sectionsState.certifications.map(it => ({ id: it.id, name: it.name, issuer: it.issuer, date: it.date })) : [{ id: 'cert1', name: data.certifications, issuer: '', date: '' }];
    const langItems = sectionsState.languages.length > 0 ? sectionsState.languages.map(it => ({ id: it.id, name: it.name, description: it.description, level: it.level || 3 })) : [{ id: 'lang1', name: data.languages, description: '' }];
    return {
      resume: {
        basics: {
          name: data.name,
          headline: data.title || '',
          location: '',
          phone: data.phone,
          email: data.email,
          url: { href: '', label: '' },
          customFields: []
        },
        sections: {
          summary: { id: 'summary', name: 'Ringkasan', visible: !!data.summary, content: data.summary, columns: 1 },
          education: { id: 'education', name: 'Pendidikan', visible: eduItems.some(i=>i.institution), items: eduItems, columns: 1, separateLinks: false },
          experience: { id: 'experience', name: 'Pengalaman', visible: expItems.some(i=>i.company), items: expItems, columns: 1, separateLinks: false },
          skills: { id: 'skills', name: 'Skill', visible: mapSkillItems().length>0, items: mapSkillItems(), columns: 1 },
          certifications: { id: 'certifications', name: 'Sertifikasi', visible: certItems.some(i=>i.name), items: certItems, columns: 1, separateLinks: false },
          languages: { id: 'languages', name: 'Bahasa', visible: langItems.some(i=>i.name), items: langItems, columns: 1 },
          projects: { id: 'projects', name: 'Proyek', visible: projItems.some(i=>i.name), items: projItems, columns: 1 },
        }
      }
    };
  };

  // Patch useArtboardStore agar template bisa jalan (mock)
  window.useArtboardStore = () => getTemplateData();

  const handlePreview = (id) => setModal(id);
  const handleUse = (id) => {
    setTemplate(id);
    setModal(null);
    // Reset data ke dummy jika ganti template
    setData({ ...dummyData });
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-12 min-h-screen overflow-y-auto custom-scroll-suppress">
      <h1 className="text-2xl font-semibold mb-6">Generator CV</h1>
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Pilih Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templateList.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              name={tpl.name}
              image={getTemplateImage(tpl.id)}
              onPreview={() => handlePreview(tpl.id)}
              onUse={() => handleUse(tpl.id)}
            />
          ))}
        </div>
        {/* Modal Preview */}
        {modal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setModal(null);
            }}
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
              <div className="flex items-start justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Preview: {templateList.find(t=>t.id===modal)?.name}</h2>
                <button
                  className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary"
                  onClick={() => setModal(null)}
                  aria-label="Tutup"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto p-4 space-y-6 custom-scroll-area">
                <div className="mx-auto w-full max-w-md bg-gray-100 rounded border flex items-center justify-center overflow-hidden aspect-[3/4]">
                  {getTemplateImage(modal) ? (
                    <img
                      src={getTemplateImage(modal)}
                      alt={modal}
                      className="object-contain w-full h-full"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">{modal}</div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-sm tracking-wide text-primary">Preview Interaktif</h3>
                  {(() => {
                    const Comp = templateList.find(t=>t.id===modal)?.component;
                    if (Comp) {
                      const { resume } = getTemplateData();
                      return (
                        <div className="border rounded p-4 bg-white shadow-inner">
                          <Comp
                            columns={[['summary','education','skills','languages'],['experience','certifications']]}
                            isFirstPage={true}
                            data={data}
                            resume={resume}
                            photo={photo}
                            accentColor={accentColor}
                          />
                        </div>
                      );
                    }
                    return (
                      <div className="p-4 border rounded bg-gray-50">
                        <div className="font-bold text-lg mb-2">{dummyData.name}</div>
                        <div className="text-sm text-gray-600 mb-2">{dummyData.email} | {dummyData.phone}</div>
                        <div className="mb-1"><b>Pendidikan:</b> {dummyData.education}</div>
                        <div className="mb-1"><b>Pengalaman:</b> {dummyData.experience}</div>
                        <div className="mb-1"><b>Skill:</b> {dummyData.skills}</div>
                      </div>
                    );
                  })()}
                </div>
              </div>
              <div className="p-4 border-t grid gap-3 md:grid-cols-2">
                <Button onClick={() => handleUse(modal)}>Gunakan Template Ini</Button>
                <Button variant="outline" onClick={() => setModal(null)}>Tutup</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <h2 className="font-medium mb-4">Form Data</h2>
          {loadingConfig && <div className="text-xs text-gray-500 mb-2">Memuat konfigurasi template...</div>}
          {configError && <div className="text-xs text-red-500 mb-2">{configError}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">Foto</label>
              <input type="file" accept="image/*" onChange={handlePhoto} className="block w-full text-sm" />
              {photo && <img src={photo} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-full border" />}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">Accent Color</label>
              <input type="color" value={accentColor} onChange={(e)=>setAccentColor(e.target.value)} className="w-12 h-12 p-0 border rounded cursor-pointer" />
              <div className="text-xs mt-1 font-mono">{accentColor}</div>
            </div>
          </div>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {/* Render input dinamis sesuai schema template */}
            {schema.map((field) => (
              <Input
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                textarea={['education','experience','skills','summary','certifications','languages','projects'].includes(field)}
                value={data[field] || ''}
                onChange={handleChange(field)}
              />
            ))}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2 text-sm">Bagian Detail</h3>
              {['experience','education','skills','projects','certifications','languages'].map(sec => (
                <SectionEditor
                  key={sec}
                  type={sec}
                  items={sectionsState[sec]}
                  onChange={(items)=>setSectionsState(s=>({...s,[sec]:items}))}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button onClick={handleSave} variant="primary">Simpan CV</Button>
            <Button onClick={() => handleExport('pdf')} variant="outline">Export PDF</Button>
            <Button onClick={() => handleExport('docx')} variant="outline" disabled={user?.plan !== 'premium'}>Export Word</Button>
            {!user && <span className="text-xs text-gray-500">Login untuk menyimpan & export</span>}
            {user?.plan !== 'premium' && <span className="text-xs text-gray-500">Upgrade untuk fitur penuh</span>}
          </div>
          {message && <div className="mt-3 text-sm text-primary">{message}</div>}
          {user && user.plan === 'free' && <div className="mt-2 text-xs text-gray-500">Export digunakan: {user.exportCount || 0}/3</div>}
        </Card>
        <Card className="bg-white/70 relative">
          <h2 className="font-medium mb-4">Preview</h2>
          <div ref={previewRef} className="text-sm space-y-2">
            {/* Preview dinamis sesuai template */}
            {(() => {
              const Comp = templateList.find(t=>t.id===template)?.component;
              if (Comp) {
                const { resume } = getTemplateData();
                return <Comp columns={[['summary','education','skills','languages'],['experience','certifications']]} isFirstPage={true} data={data} resume={resume} photo={photo} accentColor={accentColor} />;
              }
              // Simple preview
              return (
                <>
                  <div className="border-b pb-2">
                    <h3 className="text-xl font-semibold">{data.name || 'Nama Lengkap'}</h3>
                    <p className="text-gray-600">{data.email || 'email@contoh.com'} | {data.phone || '08xxxxxxxxxx'}</p>
                  </div>
                  {data.summary && user?.plan === 'premium' && (
                    <section>
                      <h4 className="font-semibold text-primary">Ringkasan</h4>
                      <p>{data.summary}</p>
                    </section>
                  )}
                  {schema.includes('education') && (
                    <section>
                      <h4 className="font-semibold text-primary">Pendidikan</h4>
                      <p className="whitespace-pre-wrap">{data.education || '-'}</p>
                    </section>
                  )}
                  {schema.includes('experience') && (
                    <section>
                      <h4 className="font-semibold text-primary">Pengalaman</h4>
                      <p className="whitespace-pre-wrap">{data.experience || '-'}</p>
                    </section>
                  )}
                  {schema.includes('skills') && (
                    <section>
                      <h4 className="font-semibold text-primary">Skill</h4>
                      <p>{data.skills || '-'}</p>
                    </section>
                  )}
                  {schema.includes('projects') && (
                    <section>
                      <h4 className="font-semibold text-primary">Proyek</h4>
                      <p>{data.projects || '-'}</p>
                    </section>
                  )}
                  {user?.plan === 'premium' && schema.includes('certifications') && (
                    <section>
                      <h4 className="font-semibold text-primary">Sertifikasi</h4>
                      <p className="whitespace-pre-wrap">{data.certifications || '-'}</p>
                    </section>
                  )}
                  {user?.plan === 'premium' && schema.includes('languages') && (
                    <section>
                      <h4 className="font-semibold text-primary">Bahasa</h4>
                      <p>{data.languages || '-'}</p>
                    </section>
                  )}
                  {user?.plan !== 'premium' && <div className="text-[10px] opacity-60 pt-4">Generated by CVin</div>}
                </>
              );
            })()}
          </div>
        </Card>
      </div>
      {!canCreateCV() && <div className="mt-6 text-center text-sm text-gray-600">Limit CV Anda tercapai. Hapus/Upgrade untuk menambah.</div>}
    </div>
  );
}
