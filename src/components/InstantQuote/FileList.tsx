import React, { useState } from 'react';
import { Trash2, Settings2, ArrowRight } from 'lucide-react';
import { FileUploadStatus } from './types';
import { ModelViewer } from './ModelViewer';
import { BatchSettingsModal } from './BatchSettingsModal';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/format';

interface FileListProps {
  files: FileUploadStatus[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, settings: Partial<FileUploadStatus>) => void;
  onBatchUpdate: (settings: Partial<FileUploadStatus>) => void;
}

export function FileList({
  files,
  onRemove,
  onUpdate,
  onBatchUpdate,
}: FileListProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showBatchSettings, setShowBatchSettings] = useState(false);
  const cartStore = useCartStore();
  const navigate = useNavigate();

  const calculateVolume = (dimensions?: { x: number; y: number; z: number }) => {
    if (!dimensions) return 0;
    return dimensions.x * dimensions.y * dimensions.z;
  };

  const calculatePrice = (file: FileUploadStatus) => {
    const basePrice = calculateVolume(file.dimensions) * 0.1; // $0.10 per cm³
    const materialMultiplier = file.material === 'pla' ? 1 : 1.5;
    const finishMultiplier = file.finish === 'standard' ? 1 : 1.3;
    return basePrice * materialMultiplier * finishMultiplier * file.quantity;
  };

  const getTotalPrice = () => {
    return files.reduce((total, file) => total + calculatePrice(file), 0);
  };

  const handleCheckout = () => {
    files.forEach(file => {
      cartStore.addItem({
        id: file.id,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file.file),
        material: file.material || 'pla',
        finish: file.finish || 'standard',
        quantity: file.quantity || 1,
        dimensions: file.dimensions || { x: 0, y: 0, z: 0 },
        volume: calculateVolume(file.dimensions),
        price: calculatePrice(file),
      });
    });
    navigate('/checkout');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Uploaded Files</h3>
        <button
          onClick={() => setShowBatchSettings(true)}
          className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
        >
          <Settings2 className="w-4 h-4 mr-2" />
          Batch Settings
        </button>
      </div>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div 
                  className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedFile(selectedFile === file.id ? null : file.id)}
                >
                  <ModelViewer file={file.file} thumbnail />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </h4>
                      {file.dimensions && (
                        <p className="mt-1 text-sm text-gray-500">
                          {file.dimensions.x.toFixed(1)} x {file.dimensions.y.toFixed(1)} x{' '}
                          {file.dimensions.z.toFixed(1)} cm
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(calculatePrice(file))}
                      </span>
                      <button
                        onClick={() => onRemove(file.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Material
                      </label>
                      <select
                        value={file.material}
                        onChange={(e) =>
                          onUpdate(file.id, { material: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 bg-white focus:border-black focus:ring-black sm:text-sm"
                      >
                        <option value="pla">PLA</option>
                        <option value="abs">ABS</option>
                        <option value="petg">PETG</option>
                        <option value="nylon">Nylon</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Finish
                      </label>
                      <select
                        value={file.finish}
                        onChange={(e) =>
                          onUpdate(file.id, { finish: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 bg-white focus:border-black focus:ring-black sm:text-sm"
                      >
                        <option value="standard">Standard</option>
                        <option value="smooth">Smooth</option>
                        <option value="polished">Polished</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={file.quantity}
                        onChange={(e) =>
                          onUpdate(file.id, {
                            quantity: parseInt(e.target.value) || 1,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 bg-white focus:border-black focus:ring-black sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {selectedFile === file.id && (
                <div className="mt-4 h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <ModelViewer file={file.file} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <BatchSettingsModal
        isOpen={showBatchSettings}
        onClose={() => setShowBatchSettings(false)}
        onApply={onBatchUpdate}
      />

      <div className="flex justify-between items-center border-t border-gray-200 pt-6">
        <div className="text-lg font-semibold text-gray-900">
          Total: {formatPrice(getTotalPrice())}
        </div>
        <button
          onClick={handleCheckout}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Continue to Checkout
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}