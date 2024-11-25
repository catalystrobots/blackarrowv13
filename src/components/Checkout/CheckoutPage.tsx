import React, { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { CheckoutSteps } from './CheckoutSteps';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import { OrderReview } from './OrderReview';
import { OrderConfirmation } from './OrderConfirmation';

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const handleShippingSubmit = (shippingData: any) => {
    // Save shipping data and move to payment
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    // Process payment and move to review
    setCurrentStep('review');
  };

  const handleOrderSubmit = async () => {
    // Submit final order
    const generatedOrderNumber = `BAF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderNumber(generatedOrderNumber);
    clearCart();
    setCurrentStep('confirmation');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'shipping':
        return <ShippingForm onSubmit={handleShippingSubmit} />;
      case 'payment':
        return <PaymentForm onSubmit={handlePaymentSubmit} totalPrice={totalPrice} />;
      case 'review':
        return (
          <OrderReview 
            items={items}
            totalPrice={totalPrice}
            onSubmit={handleOrderSubmit}
          />
        );
      case 'confirmation':
        return <OrderConfirmation orderNumber={orderNumber} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <CheckoutSteps currentStep={currentStep} />
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}