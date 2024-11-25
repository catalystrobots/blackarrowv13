import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, CreditCard } from 'lucide-react';
import { formatPrice } from '../../utils/format';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  totalPrice: number;
}

export function PaymentForm({ onSubmit, totalPrice }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-gray-50 px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Payment Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Secure payment processing. Your card information is never stored.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">Total Amount:</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  {...register('cardName', { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
                {errors.cardName && (
                  <p className="mt-1 text-sm text-red-600">Card name is required</p>
                )}
              </div>

              <div className="col-span-6">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="cardNumber"
                    {...register('cardNumber', {
                      required: true,
                      pattern: /^[0-9]{16}$/,
                    })}
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-black focus:ring-black sm:text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">Valid card number is required</p>
                )}
              </div>

              <div className="col-span-3">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  {...register('expiryDate', {
                    required: true,
                    pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                  })}
                  placeholder="MM/YY"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">Valid expiry date is required</p>
                )}
              </div>

              <div className="col-span-3">
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  {...register('cvc', {
                    required: true,
                    pattern: /^[0-9]{3,4}$/,
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
                {errors.cvc && (
                  <p className="mt-1 text-sm text-red-600">Valid CVC is required</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <span>Review Order</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );
}