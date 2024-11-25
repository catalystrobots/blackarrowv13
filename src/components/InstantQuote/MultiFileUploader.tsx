import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, X, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { FileUploadStatus } from './types';
import { FileList } from './FileList';
import { ProcessingQueue } from './ProcessingQueue';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FORMATS = {
  'model/stl': ['.stl'],
  'model/obj': ['.obj'],
};

export function MultiFileUploader() {
  const [files, setFiles] = useState<FileUploadStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File): Promise<FileUploadStatus> => {
    return new Promise((resolve) => {
      // Simulate file processing
      setTimeout(() => {
        resolve({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: file.size,
          progress: 100,
          dimensions: {
            x: Math.random() * 100 + 50,
            y: Math.random() * 100 + 50,
            z: Math.random() * 100 + 50,
          },
          material: 'pla',
          finish: 'standard',
          quantity: 1,
          status: 'completed',
          error: null,
        });
      }, 1000);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    setIsProcessing(true);

    const newFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          return {
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: file.size,
            progress: 0,
            status: 'error',
            error: 'File size exceeds 50MB limit',
          } as FileUploadStatus;
        }

        try {
          return await processFile(file);
        } catch (error) {
          return {
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: file.size,
            progress: 0,
            status: 'error',
            error: 'Failed to process file',
          } as FileUploadStatus;
        }
      })
    );

    setFiles((prev) => [...prev, ...newFiles]);
    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const updateFileSettings = (
    id: string,
    settings: Partial<FileUploadStatus>
  ) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, ...settings } : file
      )
    );
  };

  const applyBatchSettings = (settings: Partial<FileUploadStatus>) => {
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        ...settings,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          'p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer',
          isDragActive
            ? 'border-black bg-gray-50'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              Drop your 3D files here
            </p>
            <p className="mt-1 text-sm text-gray-500">
              or click to select files
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <HelpCircle className="w-4 h-4 mr-1" />
            Supported formats: STL, OBJ (Max 50MB)
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {isProcessing && <ProcessingQueue />}

      {files.length > 0 && (
        <FileList
          files={files}
          onRemove={removeFile}
          onUpdate={updateFileSettings}
          onBatchUpdate={applyBatchSettings}
        />
      )}
    </div>
  );
}