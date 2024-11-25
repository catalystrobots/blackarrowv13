import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
}

export function OrderConfirmation({ orderNumber }: OrderConfirmationProps) {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        Order Successfully Placed!
      </h3>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Your order number is:
        </p>
        <p className="text-lg font-bold text-gray-900 mt-1">
          {orderNumber}
        </p>
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <p>We've sent a confirmation email with your order details.</p>
        <p className="mt-2">
          You can track your order status using your order number.
        </p>
      </div>
      <div className="mt-6">
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}