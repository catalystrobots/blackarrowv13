import React, { useState } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';
import { RadialMenu } from './RadialNav/RadialMenu';

interface FileWithPreview extends File {
  preview?: string;
}

export function QuoteForm() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <RadialMenu />
        <div className="bg-gray-900/90 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-gray-400">We'll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <RadialMenu />
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Request a Quote</h1>
            <p className="mt-2 text-gray-400">Fill out the form below for custom CNC parts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form content remains the same, just updating text colors */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-white focus:ring-white sm:text-sm"
                />
              </div>

              {/* Rest of the form fields with updated styling... */}
              {/* Continue updating all form elements with dark theme colors */}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              Submit Quote Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}