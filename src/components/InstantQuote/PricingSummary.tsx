import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FileDetails } from './types';

interface PricingSummaryProps {
  price: string;
  fileDetails: FileDetails | null;
  material: string;
  finish: string;
  quantity: number;
  leadTime: string;
}

export function PricingSummary({
  price,
  fileDetails,
  material,
  finish,
  quantity,
  leadTime,
}: PricingSummaryProps) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <div className="rounded-lg bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
        
        <dl className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Material</dt>
            <dd className="font-medium text-gray-900">{material.toUpperCase()}</dd>
          </div>
          
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Surface Finish</dt>
            <dd className="font-medium text-gray-900">
              {finish.charAt(0).toUpperCase() + finish.slice(1)}
            </dd>
          </div>
          
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Quantity</dt>
            <dd className="font-medium text-gray-900">{quantity}</dd>
          </div>
          
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Lead Time</dt>
            <dd className="font-medium text-gray-900">
              {leadTime.charAt(0).toUpperCase() + leadTime.slice(1)}
            </dd>
          </div>
          
          <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
            <dt className="text-base font-medium text-gray-900">Total Price</dt>
            <dd className="text-2xl font-bold text-gray-900">${price}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="mt-6 w-full flex items-center justify-center space-x-2 px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          <span>Proceed to Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}