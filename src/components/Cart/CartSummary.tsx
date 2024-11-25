import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/format';
import { Trash2, Edit } from 'lucide-react';

export function CartSummary() {
  const { items, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            {/* 3D Model Preview would go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Preview
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-900">{item.fileName}</h3>
              <p className="font-medium text-gray-900">{formatPrice(item.price)}</p>
            </div>
            
            <dl className="mt-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <dt>Material:</dt>
                <dd className="capitalize">{item.material}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Finish:</dt>
                <dd className="capitalize">{item.finish}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Quantity:</dt>
                <dd>{item.quantity}</dd>
              </div>
            </dl>
            
            <div className="mt-4 flex space-x-3">
              <button
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                onClick={() => {/* Open edit modal */}}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                className="text-sm text-red-500 hover:text-red-700 flex items-center space-x-1"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout</p>
      </div>
      
      <div className="mt-6">
        <button
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}