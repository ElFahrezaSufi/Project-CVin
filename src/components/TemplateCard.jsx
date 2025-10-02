import React from "react";
import Button from "./Button.jsx";

export default function TemplateCard({ name, image, onPreview, onUse }) {
  return (
    <div className="bg-white rounded-xl shadow border p-4 flex flex-col items-center">
      <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="object-contain w-full h-full" />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
      <div className="font-semibold text-base mb-2 text-center">{name}</div>
      <div className="flex gap-2 w-full">
        <Button variant="outline" className="flex-1" onClick={onPreview}>Preview</Button>
        <Button className="flex-1" onClick={onUse}>Gunakan</Button>
      </div>
    </div>
  );
}
