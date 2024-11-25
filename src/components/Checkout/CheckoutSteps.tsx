import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { id: 'shipping', name: 'Shipping' },
  { id: 'payment', name: 'Payment' },
  { id: 'review', name: 'Review' },
  { id: 'confirmation', name: 'Confirmation' },
];

interface CheckoutStepsProps {
  currentStep: string;
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isCurrentStep = step.id === currentStep;
          const isCompleted = getCurrentStepIndex() > stepIdx;

          return (
            <li
              key={step.name}
              className={`${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="flex items-center">
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full
                    ${isCompleted ? 'bg-black' : isCurrentStep ? 'border-2 border-black' : 'border-2 border-gray-300'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm ${
                        isCurrentStep ? 'text-black' : 'text-gray-500'
                      }`}
                    >
                      {stepIdx + 1}
                    </span>
                  )}
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={`h-0.5 w-full ${
                      isCompleted ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 block text-center text-sm ${
                  isCurrentStep ? 'text-black font-medium' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}