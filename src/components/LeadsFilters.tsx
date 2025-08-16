import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { LeadsFiltersProps } from '@/types';
import { LeadStatus, ScoreSortDirection } from '@/types/enums';

const LeadsFilters: React.FC<LeadsFiltersProps> = ({
  searchTerm,
  statusFilter,
  scoreSortDirection,
  onSearchChange,
  onStatusFilterChange,
  onScoreSortToggle,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
      {/* Search Input - Full width on mobile, flex-1 on desktop */}
      <div className="w-full lg:flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by name or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
        />
      </div>

      {/* Status Filter - Fixed width */}
      <div className="w-full lg:w-48">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full bg-gray-800/50 border-gray-600 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="all" className="hover:bg-gray-700 text-white">All Statuses</SelectItem>
            <SelectItem value={LeadStatus.NEW} className="hover:bg-gray-700 text-white">{LeadStatus.NEW}</SelectItem>
            <SelectItem value={LeadStatus.CONTACTED} className="hover:bg-gray-700 text-white">{LeadStatus.CONTACTED}</SelectItem>
            <SelectItem value={LeadStatus.QUALIFIED} className="hover:bg-gray-700 text-white">{LeadStatus.QUALIFIED}</SelectItem>
            <SelectItem value={LeadStatus.DISQUALIFIED} className="hover:bg-gray-700 text-white">{LeadStatus.DISQUALIFIED}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Score Sort Toggle - Fixed width */}
      <div className="w-full lg:w-auto">
        <Button
          variant="outline"
          onClick={onScoreSortToggle}
          className="w-full lg:w-48 h-10 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 text-sm"
        >
          {scoreSortDirection === ScoreSortDirection.DESC ? (
            <TrendingDown className="w-4 h-4 mr-2" />
          ) : (
            <TrendingUp className="w-4 h-4 mr-2" />
          )}
          <span className="hidden sm:inline">
            Score {scoreSortDirection === ScoreSortDirection.DESC ? 'High to Low' : 'Low to High'}
          </span>
          <span className="sm:hidden">
            {scoreSortDirection === ScoreSortDirection.DESC ? 'High→Low' : 'Low→High'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default LeadsFilters;
