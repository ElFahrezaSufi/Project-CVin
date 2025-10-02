
import React from "react";

// Helper komponen dan fungsi utilitas sederhana
const Chikorita = ({ data = {}, resume, photo, accentColor = '#1E88E5' }) => {
	const basics = resume?.basics || {
		name: data.name || 'Nama Lengkap',
		headline: data.headline || data.title || 'Headline',
		location: data.location || 'Lokasi',
		phone: data.phone || '08123456789',
		email: data.email || 'email@contoh.com',
		url: { href: data.url || 'https://linkedin.com/in/username', label: data.urlLabel || 'LinkedIn' },
	};
	const sections = resume?.sections || {};
	const order = ['summary','experience','education','skills','projects','certifications','languages'];

	const renderSection = (id) => {
		const sec = sections[id];
		if (!sec || !sec.visible) return null;
		if (id === 'summary') {
			return (
				<section key={id} className="mb-4">
					<h3 className="font-semibold text-primary mb-1">{sec.name || 'Ringkasan'}</h3>
					<p className="text-sm whitespace-pre-wrap leading-snug">{sec.content}</p>
				</section>
			);
		}
		return (
			<section key={id} className="mb-4">
				<h3 className="font-semibold text-primary mb-1">{sec.name}</h3>
				<ul className="space-y-1">
					{(sec.items||[]).map(it => (
						<li key={it.id} className="text-sm leading-tight">
							<div className="font-medium">{it.company || it.institution || it.name}</div>
							{(it.position || it.studyType || it.area) && (
								<div className="text-[11px] text-gray-500">{[it.position, it.studyType, it.area].filter(Boolean).join(' • ')}</div>
							)}
							{(it.date || it.location) && (
								<div className="text-[11px] text-gray-400">{[it.date, it.location].filter(Boolean).join(' • ')}</div>
							)}
							{it.summary && <div className="text-[11px] text-gray-600 whitespace-pre-wrap">{it.summary}</div>}
							{it.description && <div className="text-[11px] text-gray-600 whitespace-pre-wrap">{it.description}</div>}
							{typeof it.level === 'number' && (
								<div className="flex items-center gap-1 mt-0.5">
									{Array.from({ length: 5 }).map((_,i)=>(
										<span key={i} className={`inline-block w-2 h-2 rounded-full ${i < it.level ? 'bg-primary' : 'bg-gray-300'}`} />
									))}
								</div>
							)}
						</li>
					))}
				</ul>
			</section>
		);
	};

	return (
		<div className="p-6 bg-white rounded shadow" style={{ '--accent': accentColor }}>
			<div className="flex items-center space-x-4 mb-4">
				{photo ? (
					<img src={photo} alt="Foto" className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: accentColor }} />
				) : (
					<div className="w-16 h-16 bg-gray-200 rounded-full" />
				)}
				<div>
					<div className="text-2xl font-bold">{basics.name}</div>
					<div className="text-base">{basics.headline}</div>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-map-pin text-primary" /><span>{basics.location}</span></div>
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-phone text-primary" /><a href={`tel:${basics.phone}`}>{basics.phone}</a></div>
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-at text-primary" /><a href={`mailto:${basics.email}`}>{basics.email}</a></div>
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-link text-primary" /><a href={basics.url.href} target="_blank" rel="noreferrer">{basics.url.label}</a></div>
			</div>
			{order.map(renderSection)}
		</div>
	);
};

export default Chikorita;
