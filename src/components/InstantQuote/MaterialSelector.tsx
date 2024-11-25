import React from 'react';
import { CheckCircle } from 'lucide-react';

interface MaterialSelectorProps {
  onSelect: (material: string) => void;
  selected: string;
}

const materials = [
  {
    id: 'pla',
    name: 'PLA',
    description: 'Eco-friendly, great for prototypes',
    properties: ['Biodegradable', 'Low cost', 'Good detail'],
  },
  {
    id: 'abs',
    name: 'ABS',
    description: 'Durable and impact resistant',
    properties: ['Heat resistant', 'Strong', 'Flexible'],
  },
  {
    id: 'nylon',
    name: 'Nylon',
    description: 'Flexible and strong',
    properties: ['Durable', 'Chemical resistant', 'Wear resistant'],
  },
  {
    id: 'resin',
    name: 'Resin',
    description: 'Highest detail and smooth finish',
    properties: ['Ultra detail', 'Smooth surface', 'Professional finish'],
  },
];

export function MaterialSelector({ onSelect, selected }: MaterialSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select Material</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {materials.map((material) => (
          <button
            key={material.id}
            onClick={() => onSelect(material.id)}
            className={`relative p-4 rounded-lg border-2 text-left transition-all ${
              selected === material.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {selected === material.id && (
              <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-black" />
            )}
            <h3 className="font-semibold text-gray-900">{material.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{material.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {material.properties.map((property) => (
                <span
                  key={property}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {property}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}