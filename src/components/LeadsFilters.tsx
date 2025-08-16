import React from 'react';
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Search, Filter, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';

interface LeadsFiltersProps {
  searchTerm: string;
  statusFilter: string;
  scoreSortDirection: 'asc' | 'desc';
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onScoreSortToggle: () => void;
}

const LeadsFilters: React.FC<LeadsFiltersProps> = ({
  searchTerm,
  statusFilter,
  scoreSortDirection,
  onSearchChange,
  onStatusFilterChange,
  onScoreSortToggle
}) => {
  return (
    <div className="mb-8 space-y-6">
      {/* Search Input with Icon */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search leads by name or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full mt-4 pl-10 pr-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-800/70"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Status Filter */}
        <div className="flex flex-col gap-2 min-w-[200px]">
          <Label htmlFor="status-filter" className="text-gray-300 text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Status Filter
          </Label>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger id="status-filter" className="w-full bg-gray-700/50 border-gray-600 text-white rounded-lg hover:bg-gray-700/70 transition-colors duration-200 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all" className="hover:bg-gray-700 text-white">All Statuses</SelectItem>
              <SelectItem value="New" className="hover:bg-gray-700 text-white">New</SelectItem>
              <SelectItem value="Contacted" className="hover:bg-gray-700 text-white">Contacted</SelectItem>
              <SelectItem value="Qualified" className="hover:bg-gray-700 text-white">Qualified</SelectItem>
              <SelectItem value="Disqualified" className="hover:bg-gray-700 text-white">Disqualified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Score Sort Toggle */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="score-sort" className="text-gray-300 text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Score Sort
          </Label>
          <Button
            id="score-sort"
            variant="outline"
            size="lg"
            onClick={onScoreSortToggle}
            className="flex items-center gap-3 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 border-gray-600 hover:border-gray-500 text-white min-w-[140px] justify-center h-9"
          >
            {scoreSortDirection === 'desc' ? (
              <>
                <ChevronDown className="w-4 h-4 text-blue-400" />
                <span className="font-medium">High to Low</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4 text-green-400" />
                <span className="font-medium">Low to High</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadsFilters;
