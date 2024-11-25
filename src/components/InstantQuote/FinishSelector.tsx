import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FinishSelectorProps {
  onSelect: (finish: string) => void;
  selected: string;
}

const finishes = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Layer lines visible, economical choice',
    layerHeight: '0.2mm',
  },
  {
    id: 'smooth',
    name: 'Smooth',
    description: 'Post-processed for a smoother finish',
    layerHeight: '0.1mm',
  },
];

export function FinishSelector({ onSelect, selected }: FinishSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select Surface Finish</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {finishes.map((finish) => (
          <button
            key={finish.id}
            onClick={() => onSelect(finish.id)}
            className={`relative p-4 rounded-lg border-2 text-left transition-all ${
              selected === finish.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {selected === finish.id && (
              <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-black" />
            )}
            <h3 className="font-semibold text-gray-900">{finish.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{finish.description}</p>
            <p className="mt-2 text-xs text-gray-400">
              Layer Height: {finish.layerHeight}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}