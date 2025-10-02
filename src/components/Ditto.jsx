
import React from "react";
// import useArtboardStore from '../hooks/useArtboardStore'; // Uncomment if needed later

const Ditto = ({ data = {}, resume, photo, accentColor = '#1E88E5' }) => {
	const basics = resume?.basics || {
		name: data.name || 'Nama Lengkap',
		headline: data.headline || data.title || 'Headline',
		location: data.location || 'Lokasi',
		phone: data.phone || '08123456789',
		email: data.email || 'email@contoh.com',
		url: { href: data.url || 'https://linkedin.com/in/username', label: data.urlLabel || 'LinkedIn' },
	};
	const sections = resume?.sections || {};
	const col1 = ['summary','skills','languages'];
	const col2 = ['experience','education','projects','certifications'];

	const Section = ({ id }) => {
		const sec = sections[id];
		if (!sec || !sec.visible) return null;
		if (id === 'summary') return (
			<section className="mb-4" key={id}>
				<h3 className="font-semibold text-primary mb-1">{sec.name}</h3>
				<p className="text-sm whitespace-pre-wrap leading-snug">{sec.content}</p>
			</section>
		);
		return (
			<section className="mb-4" key={id}>
				<h3 className="font-semibold text-primary mb-1">{sec.name}</h3>
				<ul className="space-y-1">
					{(sec.items||[]).map(it => (
						<li key={it.id} className="text-sm leading-tight">
							<div className="font-medium">{it.company || it.institution || it.name}</div>
							{(it.position || it.studyType || it.area) && <div className="text-[11px] text-gray-500">{[it.position, it.studyType, it.area].filter(Boolean).join(' • ')}</div>}
							{(it.date || it.location) && <div className="text-[11px] text-gray-400">{[it.date, it.location].filter(Boolean).join(' • ')}</div>}
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
			<div className="flex flex-col items-center space-y-2 text-center mb-6">
				{photo ? (
					<img src={photo} alt="Foto" className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: accentColor }} />
				) : (
					<div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
				)}
				<div>
					<div className="text-2xl font-bold">{basics.name}</div>
					<div className="text-base">{basics.headline}</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-6">
				<div>
					{col1.map(id => <Section key={id} id={id} />)}
				</div>
				<div>
					{col2.map(id => <Section key={id} id={id} />)}
				</div>
			</div>
		</div>
	);
};

export default Ditto;
