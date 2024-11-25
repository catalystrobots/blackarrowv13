import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ServiceSectionProps {
  title: string;
  description: string;
  buttonText: string;
  Icon: LucideIcon;
  isDark?: boolean;
  onButtonClick?: () => void;
}

export function ServiceSection({ 
  title, 
  description, 
  buttonText, 
  Icon, 
  isDark,
  onButtonClick 
}: ServiceSectionProps) {
  return (
    <div className="relative flex-1 flex items-center justify-center p-8 md:p-16 z-10">
      <div className="max-w-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Icon className={`w-12 h-12 ${isDark ? 'text-black' : ''}`} />
          <h2 className={`text-4xl font-bold ${isDark ? 'text-black' : ''}`}>{title}</h2>
        </div>
        <p className={`text-lg mb-8 ${isDark ? 'text-black' : ''}`}>
          {description}
        </p>
        <button 
          onClick={onButtonClick}
          className={`group ${isDark ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'} px-8 py-3 rounded-full flex items-center space-x-2 transition-colors`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}