import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FileUploadStatus } from './types';

interface BatchSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (settings: Partial<FileUploadStatus>) => void;
}

export function BatchSettingsModal({
  isOpen,
  onClose,
  onApply,
}: BatchSettingsModalProps) {
  const [material, setMaterial] = useState('pla');
  const [finish, setFinish] = useState('standard');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({
      material,
      finish,
      quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Apply Settings to All Files
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="batch-material"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Material
                  </label>
                  <select
                    id="batch-material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                  >
                    <option value="pla">PLA</option>
                    <option value="abs">ABS</option>
                    <option value="petg">PETG</option>
                    <option value="nylon">Nylon</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="batch-finish"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Finish
                  </label>
                  <select
                    id="batch-finish"
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                  >
                    <option value="standard">Standard</option>
                    <option value="smooth">Smooth</option>
                    <option value="polished">Polished</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="batch-quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="batch-quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value) || 1)
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleApply}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
            >
              Apply to All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}