import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { useLeadsQuery } from '@/hooks/leads/useLeadsQuery';
import { useLeadsFilters } from '@/hooks/leads/useLeadsFilters';
import LeadDetailPanel from './LeadDetailPanel';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import LeadsFilters from './LeadsFilters';
import LeadsResultsCount from './LeadsResultsCount';
import { Lead, LeadsListProps } from '@/types';
import { LeadStatus, SpinnerSize } from '@/types/enums';
import { Opportunity } from '@/types';

const LeadsList: React.FC<LeadsListProps> = ({ className }) => {
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
    // The lead is already updated in Zustand via the LeadDetailPanel
    // We just need to close the panel
    setSelectedLead(null);
  };

  const handleConvertToOpportunity = (opportunity: Opportunity) => {
    // TODO: Implement opportunity conversion logic
    console.log('Lead converted to opportunity:', opportunity);
    // For now, just close the panel
    setSelectedLead(null);
  };

  if (isLoading) return <LoadingSpinner message="Loading leads..." size={SpinnerSize.LG} />;

  if (error) {
    return (
      <EmptyState
        title="Error loading leads"
        message="There was a problem loading the leads. Please try again later."
      />
    );
  }

  return (
    <div className={className || 'space-y-4 sm:space-y-6'}>
      {/* Filters Component */}
      <LeadsFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        scoreSortDirection={scoreSortDirection}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onScoreSortToggle={toggleScoreSort}
      />

      {/* Results Count Component */}
      <LeadsResultsCount
        count={filteredLeads.length}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />

      {/* Responsive Table Container */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads match your filters"
          message="Try adjusting your search terms or status filter."
        />
      ) : (
        <div className="w-[320px] xs:w-[375px] sm:w-[640px] md:w-[768px] lg:w-[900px] xl:w-[1000px] overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900 shadow-2xl">
          <Table className="w-full text-white">
            <TableHeader>
              <TableRow className="bg-gray-800/80 hover:bg-gray-800/80">
                <TableHead className="p-1.5 sm:p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800/80 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                  Name
                </TableHead>
                <TableHead className="p-1.5 sm:p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800/80 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                  Company
                </TableHead>
                <TableHead className="p-1.5 sm:p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800/80 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                  Email
                </TableHead>
                <TableHead className="p-1.5 sm:p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800/80 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                  Source
                </TableHead>
                <TableHead className="p-1.5 sm:p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800/80 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                  Score
                </TableHead>
                <TableHead className="p-1.5 sm:p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800/80 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead: Lead) => (
                <TableRow
                  key={lead.id}
                  className="hover:bg-gray-800/60 cursor-pointer transition-colors duration-150 border-b border-gray-700/30"
                  onClick={() => handleRowClick(lead)}
                >
                  <TableCell className="p-1.5 sm:p-2 md:p-3 lg:p-4 font-medium text-xs sm:text-sm md:text-base">{lead.name}</TableCell>
                  <TableCell className="p-1.5 sm:p-2 md:p-3 lg:p-4 text-gray-300 text-xs sm:text-sm md:text-base">{lead.company}</TableCell>
                  <TableCell className="p-1.5 sm:p-2 md:p-3 lg:p-4 text-gray-300 text-xs sm:text-sm md:text-base">{lead.email}</TableCell>
                  <TableCell className="p-1.5 sm:p-2 md:p-3 lg:p-4 text-gray-300 text-xs sm:text-sm md:text-base">{lead.source}</TableCell>
                  <TableCell className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <span className={`px-1.5 sm:px-2 py-1 rounded-full text-xs font-semibold ${
                      lead.score >= 80 ? 'bg-green-900/30 text-green-400' :
                      lead.score >= 60 ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {lead.score}
                    </span>
                  </TableCell>
                  <TableCell className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <span className={`px-1.5 sm:px-2 py-1 rounded-full text-xs font-semibold ${
                      lead.status === LeadStatus.NEW ? 'bg-blue-900/30 text-blue-400' :
                      lead.status === LeadStatus.CONTACTED ? 'bg-yellow-900/30 text-yellow-400' :
                      lead.status === LeadStatus.QUALIFIED ? 'bg-green-900/30 text-green-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {lead.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Lead Detail Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSave}
          onConvertToOpportunity={handleConvertToOpportunity}
        />
      )}
    </div>
  );
};

export default LeadsList;
