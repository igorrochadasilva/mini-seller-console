import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLeadsQuery } from '@/hooks/leads/useLeadsQuery';
import { useLeadsFilters } from '@/hooks/leads/useLeadsFilters';
import LeadDetailPanel from './LeadDetailPanel';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { Lead, LeadsListProps } from '@/types';
import { ChevronUp, ChevronDown, Search, Filter, TrendingUp } from 'lucide-react';

const LeadsList: React.FC<LeadsListProps> = () => {
  const { isLoading, error } = useLeadsQuery();
  const {
    filteredLeads,
    searchTerm,
    statusFilter,
    scoreSortDirection,
    setSearchTerm,
    setStatusFilter,
    toggleScoreSort
  } = useLeadsFilters();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSave = (updatedLead: Lead) => {
    // For now, just close the panel
    setSelectedLead(null);
  };

  if (isLoading) return <LoadingSpinner message="Loading leads..." size="lg" />;

  if (error) {
    return (
      <EmptyState
        title="Error loading leads"
        message="There was a problem loading the leads. Please try again later."
      />
    );
  }

  return (
    <div className="">
      
      <div className="mb-8 space-y-6">
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search leads by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mt-4 pl-10 pr-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-800/70"
          />
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Status Filter */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Status Filter
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white rounded-lg hover:bg-gray-700/70 transition-colors duration-200 focus:ring-2 focus:ring-blue-500">
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
            <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Score Sort
            </label>
            <button
              onClick={toggleScoreSort}
              className="flex items-center gap-3 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg transition-all duration-200 text-white border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] justify-center"
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
            </button>
          </div>
        </div>
      </div>

      
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <div className="text-gray-300 font-medium">
          Showing <span className="text-blue-400 font-semibold">{filteredLeads.length}</span> leads
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

      {/* Table */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads match your filters"
          message="Try adjusting your search terms or status filter."
        />
      ) : (
        <Table className="w-full bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
          <TableHeader>
            <TableRow className="bg-gray-800/80 hover:bg-gray-800/80">
              <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">Name</TableHead>
              <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">Company</TableHead>
              <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">Email</TableHead>
              <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">Source</TableHead>
              <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">Score</TableHead>
              <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead: Lead) => (
              <TableRow 
                key={lead.id} 
                className="hover:bg-gray-800/60 cursor-pointer transition-colors duration-150 border-b border-gray-700/30" 
                onClick={() => handleRowClick(lead)}
              >
                <TableCell className="p-4 font-medium">{lead.name}</TableCell>
                <TableCell className="p-4 text-gray-300">{lead.company}</TableCell>
                <TableCell className="p-4 text-gray-300">{lead.email}</TableCell>
                <TableCell className="p-4 text-gray-300">{lead.source}</TableCell>
                <TableCell className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    lead.score >= 80 ? 'bg-green-900/30 text-green-400' :
                    lead.score >= 60 ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {lead.score}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    lead.status === 'New' ? 'bg-blue-900/30 text-blue-400' :
                    lead.status === 'Contacted' ? 'bg-yellow-900/30 text-yellow-400' :
                    lead.status === 'Qualified' ? 'bg-green-900/30 text-green-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {lead.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default LeadsList;
