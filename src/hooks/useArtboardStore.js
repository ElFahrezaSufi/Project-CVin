// Mock implementation of useArtboardStore so template components don't crash.
// You can later replace this with a real global state (Zustand, Context, Redux, etc.).

const defaultState = {
  resume: {
    basics: {
      name: 'Nama Lengkap',
      headline: 'Posisi / Headline',
      location: 'Kota, Negara',
      phone: '08123456789',
      email: 'email@contoh.com',
      url: { href: 'https://linkedin.com/in/username', label: 'LinkedIn' },
      customFields: []
    },
    sections: {
      summary: { id: 'summary', name: 'Ringkasan', visible: true, content: '<p>Ringkasan profesional singkat...</p>', columns: 1 },
      experience: { id: 'experience', name: 'Pengalaman', visible: true, separateLinks: false, columns: 1, items: [] },
      education: { id: 'education', name: 'Pendidikan', visible: true, separateLinks: false, columns: 1, items: [] },
      profiles: { id: 'profiles', name: 'Profil', visible: false, columns: 1, items: [] },
      awards: { id: 'awards', name: 'Penghargaan', visible: false, columns: 1, items: [] },
      certifications: { id: 'certifications', name: 'Sertifikasi', visible: false, columns: 1, items: [] },
      skills: { id: 'skills', name: 'Keahlian', visible: true, columns: 1, items: [] },
      interests: { id: 'interests', name: 'Minat', visible: false, columns: 1, items: [] },
      publications: { id: 'publications', name: 'Publikasi', visible: false, columns: 1, items: [] },
      volunteer: { id: 'volunteer', name: 'Relawan', visible: false, columns: 1, items: [] },
      languages: { id: 'languages', name: 'Bahasa', visible: true, columns: 1, items: [] },
      projects: { id: 'projects', name: 'Proyek', visible: false, columns: 1, items: [] },
      references: { id: 'references', name: 'Referensi', visible: false, columns: 1, items: [] },
      custom: {}
    }
  }
};

export function useArtboardStore(selector) {
  if (typeof selector === 'function') return selector(defaultState);
  return defaultState;
}

export default useArtboardStore;
