import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { FileDetails } from './types';
import { ModelViewer } from './ModelViewer';

interface FileUploaderProps {
  onFileUpload: (details: FileDetails) => void;
  fileDetails: FileDetails | null;
}

export function FileUploader({ onFileUpload, fileDetails }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const validateFile = (file: File): Promise<FileDetails> => {
    return new Promise((resolve, reject) => {
      // In a real implementation, you would:
      // 1. Parse the STL/OBJ file
      // 2. Calculate volume, dimensions, check wall thickness
      // 3. Validate mesh integrity
      
      // Simulated validation
      setTimeout(() => {
        if (file.size > 50 * 1024 * 1024) {
          reject(new Error('File size must be less than 50MB'));
          return;
        }

        // Simulated file details
        resolve({
          name: file.name,
          size: file.size,
          volume: Math.random() * 100, // cm³
          dimensions: {
            x: Math.random() * 20,
            y: Math.random() * 20,
            z: Math.random() * 20,
          },
          wallThickness: 2,
          isValid: true,
        });
      }, 1000);
    });
  };

  const handleFile = async (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['stl', 'obj'].includes(extension || '')) {
      setError('Invalid file format. Please upload .STL or .OBJ files.');
      return;
    }

    try {
      const details = await validateFile(file);
      setError(null);
      setUploadedFile(file);
      onFileUpload(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Upload Your 3D Model</h2>
      
      <div
        className={`p-8 border-2 border-dashed rounded-lg ${
          dragActive ? 'border-black bg-gray-50' : 'border-gray-300'
        } transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Drop your 3D file here or click to upload
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleChange}
                accept=".stl,.obj"
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Supported formats: .STL, .OBJ (Max 50MB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {uploadedFile && (
        <div className="space-y-4">
          <ModelViewer file={uploadedFile} />
          
          {fileDetails && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">{fileDetails.name}</h3>
                  <ul className="mt-1 text-sm text-gray-500 space-y-1">
                    <li>Volume: {fileDetails.volume.toFixed(2)} cm³</li>
                    <li>
                      Dimensions: {fileDetails.dimensions.x.toFixed(1)} x{' '}
                      {fileDetails.dimensions.y.toFixed(1)} x{' '}
                      {fileDetails.dimensions.z.toFixed(1)} cm
                    </li>
                    <li>Wall Thickness: {fileDetails.wallThickness}mm</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}