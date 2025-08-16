import React from 'react';
import { LeadsResultsCountProps } from '@/types';
import { LeadStatus } from '@/types/enums';
import { TypographyP } from './ui/typograph';

const LeadsResultsCount: React.FC<LeadsResultsCountProps> = ({ count, searchTerm, statusFilter }) => {
  const getFilterDescription = () => {
    const filters = [];
    
    if (searchTerm) {
      filters.push(`"${searchTerm}" in search`);
    }
    
    if (statusFilter !== 'all') {
      filters.push(`${statusFilter} status`);
    }
    
    if (filters.length === 0) {
      return 'Showing all leads';
    }
    
    return `Filtered by: ${filters.join(', ')}`;
  };

  return (
    <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="text-sm text-gray-300">
          <span className="font-medium text-white">{count}</span> lead{count !== 1 ? 's' : ''} found
        </div>
        <TypographyP className="text-xs text-gray-400">
          {getFilterDescription()}
        </TypographyP>
      </div>
    </div>
  );
};

export default LeadsResultsCount;
