import React from 'react';
import { TypographyP } from './ui/typograph';
import { LeadStatus } from '@/types/enums';

interface LeadsResultsCountProps {
  count: number;
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
}

const LeadsResultsCount: React.FC<LeadsResultsCountProps> = ({ count, searchTerm, statusFilter }) => {
  const getMessage = () => {
    if (searchTerm && statusFilter !== 'all') {
      return `Showing ${count} lead${count !== 1 ? 's' : ''} matching "${searchTerm}" with status "${statusFilter}"`;
    } else if (searchTerm) {
      return `Showing ${count} lead${count !== 1 ? 's' : ''} matching "${searchTerm}"`;
    } else if (statusFilter !== 'all') {
      return `Showing ${count} lead${count !== 1 ? 's' : ''} with status "${statusFilter}"`;
    } else {
      return `Showing all ${count} lead${count !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="mb-4 sm:mb-6">
      <TypographyP className="text-sm sm:text-base text-gray-400">
        {getMessage()}
      </TypographyP>
    </div>
  );
};

export default LeadsResultsCount;
