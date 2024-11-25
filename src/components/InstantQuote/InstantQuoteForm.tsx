import React from 'react';
import { MultiFileUploader } from './MultiFileUploader';
import { RadialMenu } from '../RadialNav/RadialMenu';

export function InstantQuoteForm() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <RadialMenu />
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Instant 3D Printing Quote
            </h1>
            <p className="mt-2 text-gray-400">
              Upload your 3D files to get an instant quote
            </p>
          </div>

          <MultiFileUploader />
        </div>
      </div>
    </div>
  );
}