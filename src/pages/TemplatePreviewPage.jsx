import React, { useState } from "react";
import TemplateCard from "../components/TemplateCard.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

// Dummy data template
const templates = [
  {
    id: "azurill",
    name: "Azurill (Modern)",
    image: "/images/template-azurill.png", // ganti dengan path gambar preview
    demoUrl: "/demo/azurill"
  },
  {
    id: "simple",
    name: "Simple Classic",
    image: "/images/template-simple.png",
    demoUrl: "/demo/simple"
  },
  // Tambah template baru di sini
];

function TemplatePreviewPage() {
  const [modal, setModal] = useState(null); // id template yang sedang di-preview
  const navigate = useNavigate();

  const handlePreview = (id) => setModal(id);
  const handleUse = (id) => {
    // Dummy: redirect ke login jika belum login
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Pilih Template CV</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            name={tpl.name}
            image={tpl.image}
            onPreview={() => handlePreview(tpl.id)}
            onUse={() => handleUse(tpl.id)}
          />
        ))}
      </div>
      {/* Modal Preview */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-primary" onClick={() => setModal(null)}>&times;</button>
            <h2 className="text-lg font-semibold mb-4">Preview: {templates.find(t=>t.id===modal)?.name}</h2>
            <div className="aspect-[3/4] bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
              <img src={templates.find(t=>t.id===modal)?.image} alt={templates.find(t=>t.id===modal)?.name} className="object-contain w-full h-full" />
            </div>
            <Button className="w-full" onClick={() => handleUse(modal)}>Gunakan Template Ini</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplatePreviewPage;
import React, { useState } from "react";
import TemplateCard from "../components/TemplateCard.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

// Dummy data template
const templates = [
  {
    id: "azurill",
    name: "Azurill (Modern)",
    image: "/images/template-azurill.png", // ganti dengan path gambar preview
    demoUrl: "/demo/azurill"
  },
  {
    id: "simple",
    name: "Simple Classic",
    image: "/images/template-simple.png",
    demoUrl: "/demo/simple"
  },
  // Tambah template baru di sini
];

export default function TemplatePreviewPage() {
  const [modal, setModal] = useState(null); // id template yang sedang di-preview
  const navigate = useNavigate();

  const handlePreview = (id) => setModal(id);
  const handleUse = (id) => {
    // Dummy: redirect ke login jika belum login
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Pilih Template CV</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            name={tpl.name}
            image={tpl.image}
            onPreview={() => handlePreview(tpl.id)}
            onUse={() => handleUse(tpl.id)}
          />
        ))}
      </div>
      {/* Modal Preview */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-primary" onClick={() => setModal(null)}>&times;</button>
            <h2 className="text-lg font-semibold mb-4">Preview: {templates.find(t=>t.id===modal)?.name}</h2>
            <div className="aspect-[3/4] bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
              <img src={templates.find(t=>t.id===modal)?.image} alt={templates.find(t=>t.id===modal)?.name} className="object-contain w-full h-full" />
            </div>
            <Button className="w-full" onClick={() => handleUse(modal)}>Gunakan Template Ini</Button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import TemplateCard from "../components/TemplateCard.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

// Dummy data template
const templates = [
  {
    id: "azurill",
    name: "Azurill (Modern)",
    image: "/images/template-azurill.png", // ganti dengan path gambar preview
    demoUrl: "/demo/azurill"
  },
  {
    id: "simple",
    name: "Simple Classic",
    image: "/images/template-simple.png",
    demoUrl: "/demo/simple"
  },
  // Tambah template baru di sini
];

export default function TemplatePreviewPage() {
  const [modal, setModal] = useState(null); // id template yang sedang di-preview
  const navigate = useNavigate();

  const handlePreview = (id) => setModal(id);
  const handleUse = (id) => {
    // Dummy: redirect ke login jika belum login
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Pilih Template CV</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            name={tpl.name}
            image={tpl.image}
            onPreview={() => handlePreview(tpl.id)}
            onUse={() => handleUse(tpl.id)}
          />
        ))}
      </div>
      {/* Modal Preview */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-primary" onClick={() => setModal(null)}>&times;</button>
            <h2 className="text-lg font-semibold mb-4">Preview: {templates.find(t=>t.id===modal)?.name}</h2>
            <div className="aspect-[3/4] bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
              <img src={templates.find(t=>t.id===modal)?.image} alt={templates.find(t=>t.id===modal)?.name} className="object-contain w-full h-full" />
            </div>
            <Button className="w-full" onClick={() => handleUse(modal)}>Gunakan Template Ini</Button>
          </div>
        </div>
      )}
    </div>
  );
}
