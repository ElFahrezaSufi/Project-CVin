
import React from "react";
// import useArtboardStore from '../hooks/useArtboardStore'; // Uncomment if needed later

const Bronzor = ({ data = {}, resume, photo, accentColor = '#1E88E5' }) => {
	const basics = resume?.basics || {
		name: data.name || 'Nama Lengkap',
		headline: data.headline || data.title || 'Headline',
		location: data.location || 'Lokasi',
		phone: data.phone || '08123456789',
		email: data.email || 'email@contoh.com',
		url: { href: data.url || 'https://linkedin.com/in/username', label: data.urlLabel || 'LinkedIn' },
	};
	const sections = resume?.sections || {};
	const summary = sections.summary;
	const exp = sections.experience;
	const edu = sections.education;
	const skills = sections.skills;
	const certs = sections.certifications;
	const languages = sections.languages;

	return (
		<div className="p-6 bg-white rounded shadow space-y-5" style={{ '--accent': accentColor }}>
			<div className="flex flex-col items-center space-y-2 text-center">
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
			<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-map-pin text-primary" /><span>{basics.location}</span></div>
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-phone text-primary" /><a href={`tel:${basics.phone}`}>{basics.phone}</a></div>
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-at text-primary" /><a href={`mailto:${basics.email}`}>{basics.email}</a></div>
				<div className="flex items-center gap-x-1.5"><i className="ph ph-bold ph-link text-primary" /><a href={basics.url.href} target="_blank" rel="noreferrer">{basics.url.label}</a></div>
			</div>
			{summary?.visible && (
				<section>
					<h3 className="font-bold mb-1">{summary.name}</h3>
					<p className="text-sm whitespace-pre-wrap leading-snug">{summary.content}</p>
				</section>
			)}
			{exp?.visible && (
				<section>
					<h3 className="font-bold mb-1">{exp.name}</h3>
					<ul className="space-y-2">
						{exp.items.map(it => (
							<li key={it.id} className="text-sm">
								<div className="font-medium">{it.company}<span className="text-xs font-normal italic"> {it.position && `- ${it.position}`}</span></div>
								<div className="text-[11px] text-gray-500">{[it.date, it.location].filter(Boolean).join(' • ')}</div>
								{it.summary && <div className="text-[11px] text-gray-600 whitespace-pre-wrap">{it.summary}</div>}
							</li>
						))}
					</ul>
				</section>
			)}
			{edu?.visible && (
				<section>
					<h3 className="font-bold mb-1">{edu.name}</h3>
					<ul className="space-y-1">
						{edu.items.map(it => (
							<li key={it.id} className="text-sm">
								<div className="font-medium">{it.institution}</div>
								<div className="text-[11px] text-gray-500">{[it.studyType, it.area, it.date].filter(Boolean).join(' • ')}</div>
							</li>
						))}
					</ul>
				</section>
			)}
			{skills?.visible && (
				<section>
					<h3 className="font-bold mb-1">{skills.name}</h3>
					<ul className="flex flex-wrap gap-2 text-[11px]">
						{skills.items.map(it => (
							<li key={it.id} className="px-2 py-1 bg-gray-100 rounded border border-gray-200">
								{it.name}
							</li>
						))}
					</ul>
				</section>
			)}
			{certs?.visible && (
				<section>
					<h3 className="font-bold mb-1">{certs.name}</h3>
					<ul className="space-y-1 text-sm">
						{certs.items.map(it => (
							<li key={it.id}>{it.name} {it.issuer && <span className="text-[11px] text-gray-500">- {it.issuer}</span>}</li>
						))}
					</ul>
				</section>
			)}
			{languages?.visible && (
				<section>
					<h3 className="font-bold mb-1">{languages.name}</h3>
					<div className="flex flex-wrap gap-2 text-[11px]">
						{languages.items.map(it => (
							<span key={it.id} className="px-2 py-1 bg-gray-100 rounded border border-gray-200">{it.name}</span>
						))}
					</div>
				</section>
			)}
		</div>
	);
};

export default Bronzor;
