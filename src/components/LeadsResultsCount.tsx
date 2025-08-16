import React from 'react';
import { TypographyP } from './ui/typograph';
import { LeadStatus } from '@/types/enums';

interface LeadsResultsCountProps {
  count: number;
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
}

const LeadsResultsCount: React.FC<LeadsResultsCountProps> = ({
  count,
  searchTerm,
  statusFilter,
}) => {
  const getMessage = () => {
    if (searchTerm && statusFilter !== 'all') {
      return `${count} lead${count !== 1 ? 's' : ''} matching "${searchTerm}" with status "${statusFilter}"`;
    } else if (searchTerm) {
      return `${count} lead${count !== 1 ? 's' : ''} matching "${searchTerm}"`;
    } else if (statusFilter !== 'all') {
      return `${count} lead${count !== 1 ? 's' : ''} with status "${statusFilter}"`;
    } else {
      return `${count} lead${count !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="flex items-center">
      <TypographyP className="text-sm text-gray-400 font-medium">
        {getMessage()}
      </TypographyP>
    </div>
  );
};

export default LeadsResultsCount;
