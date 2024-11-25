import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';
import { formatPrice } from '../../utils/format';

interface OrderReviewProps {
  items: CartItem[];
  totalPrice: number;
  onSubmit: () => void;
}

export function OrderReview({ items, totalPrice, onSubmit }: OrderReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
        <div className="mt-4 bg-gray-50 rounded-lg p-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex">
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.fileName}
                      </h4>
                      <p className="ml-4 text-sm text-gray-900">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Material: {item.material.toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Finish: {item.finish}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes included
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <span>Place Order</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}