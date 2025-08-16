import React from 'react';

interface LeadsResultsCountProps {
  count: number;
  searchTerm: string;
  statusFilter: string;
}

const LeadsResultsCount: React.FC<LeadsResultsCountProps> = ({
  count,
  searchTerm,
  statusFilter
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
      <div className="text-gray-300 font-medium">
        Showing <span className="text-blue-400 font-semibold">{count}</span> leads
        {searchTerm && (
          <span className="text-gray-400 ml-2">
            for "<span className="text-gray-300">{searchTerm}</span>"
          </span>
        )}
        {statusFilter !== 'all' && (
          <span className="text-gray-400 ml-2">
            with status "<span className="text-gray-300">{statusFilter}</span>"
          </span>
        )}
      </div>
    </div>
  );
};

export default LeadsResultsCount;
