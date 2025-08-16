import React from 'react';
import { EmptyStateProps } from '@/types';
import { TypographyH3, TypographyP } from './ui/typograph';

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] p-12 text-center">
      <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <TypographyH3 className="text-2xl font-semibold text-white mb-3">{title}</TypographyH3>
      <TypographyP className="text-gray-400 max-w-md text-lg">{message}</TypographyP>
    </div>
  );
};

export default EmptyState;
