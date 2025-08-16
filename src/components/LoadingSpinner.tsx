import React from 'react';
import { LoadingSpinnerProps } from '@/types';
import { SpinnerSize } from '@/types/enums';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...', size = SpinnerSize.MD }) => {
  const getSizeClasses = () => {
    switch (size) {
      case SpinnerSize.SM:
        return 'w-4 h-4';
      case SpinnerSize.LG:
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${getSizeClasses()}`} />
      {message && (
        <p className="text-gray-400 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
