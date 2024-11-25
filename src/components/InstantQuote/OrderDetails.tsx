import React from 'react';
import { FileDetails } from './types';

interface OrderDetailsProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  leadTime: string;
  setLeadTime: (leadTime: string) => void;
  fileDetails: FileDetails | null;
}

export function OrderDetails({
  quantity,
  setQuantity,
  leadTime,
  setLeadTime,
  fileDetails,
}: OrderDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="leadTime" className="block text-sm font-medium text-gray-700">
            Lead Time
          </label>
          <select
            id="leadTime"
            value={leadTime}
            onChange={(e) => setLeadTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
          >
            <option value="standard">Standard (5-7 business days)</option>
            <option value="express">Express (2-4 business days)</option>
            <option value="rush">Rush (24-48 hours)</option>
          </select>
        </div>
      </div>

      {fileDetails && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900">Part Dimensions</h3>
          <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-medium">Width:</span>{' '}
              {fileDetails.dimensions.x.toFixed(1)}cm
            </div>
            <div>
              <span className="font-medium">Length:</span>{' '}
              {fileDetails.dimensions.y.toFixed(1)}cm
            </div>
            <div>
              <span className="font-medium">Height:</span>{' '}
              {fileDetails.dimensions.z.toFixed(1)}cm
            </div>
          </div>
        </div>
      )}
    </div>
  );
}