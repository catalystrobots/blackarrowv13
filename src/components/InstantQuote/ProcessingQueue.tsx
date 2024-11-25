import React from 'react';
import { Loader2 } from 'lucide-react';

export function ProcessingQueue() {
  return (
    <div className="flex items-center justify-center space-x-2 text-gray-500 bg-gray-50 p-4 rounded-lg">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>Processing files...</span>
    </div>
  );
}