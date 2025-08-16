import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';

import { LeadsFiltersProps } from '@/types';
import { LeadStatus, ScoreSortDirection } from '@/types/enums';

import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const LeadsFilters: React.FC<LeadsFiltersProps> = ({
  searchTerm,
  statusFilter,
  scoreSortDirection,
  onSearchChange,
  onStatusFilterChange,
  onScoreSortToggle,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by name or company..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-9"
        />
      </div>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700 text-white h-9">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all" className="hover:bg-gray-700 text-white">
            All Statuses
          </SelectItem>
          <SelectItem
            value={LeadStatus.NEW}
            className="hover:bg-gray-700 text-white"
          >
            {LeadStatus.NEW}
          </SelectItem>
          <SelectItem
            value={LeadStatus.CONTACTED}
            className="hover:bg-gray-700 text-white"
          >
            {LeadStatus.CONTACTED}
          </SelectItem>
          <SelectItem
            value={LeadStatus.QUALIFIED}
            className="hover:bg-gray-700 text-white"
          >
            {LeadStatus.QUALIFIED}
          </SelectItem>
          <SelectItem
            value={LeadStatus.DISQUALIFIED}
            className="hover:bg-gray-700 text-white"
          >
            {LeadStatus.DISQUALIFIED}
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Score Sort Toggle */}
      <Button
        variant="outline"
        onClick={onScoreSortToggle}
        className="w-40 h-9 bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:border-gray-600 text-sm"
      >
        {scoreSortDirection === ScoreSortDirection.DESC ? (
          <TrendingDown className="w-4 h-4 mr-2" />
        ) : (
          <TrendingUp className="w-4 h-4 mr-2" />
        )}
        Score{' '}
        {scoreSortDirection === ScoreSortDirection.DESC
          ? 'High→Low'
          : 'Low→High'}
      </Button>
    </div>
  );
};

export { LeadsFilters };
