import React from 'react';

import { LoadingSpinnerProps } from '@/types';
import { SpinnerSize } from '@/types/enums';

import { TypographyP } from './ui/typograph';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = SpinnerSize.MD,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case SpinnerSize.SM:
        return 'w-4 h-4';
      case SpinnerSize.LG:
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] space-y-6">
      <div
        className={`animate-spin rounded-full border-3 border-gray-300/30 border-t-blue-500 ${getSizeClasses()}`}
      />
      {message && (
        <TypographyP className="text-gray-400 text-lg font-medium">
          {message}
        </TypographyP>
      )}
    </div>
  );
};

export { LoadingSpinner };
