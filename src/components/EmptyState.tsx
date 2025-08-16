import React from 'react';
import { EmptyStateProps } from '@/types';

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "No leads available", 
  message = "There are no leads to display at the moment.",
  icon 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
