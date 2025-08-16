import React, { useState } from 'react';

import { useLeadsFilters } from '@/hooks/leads/useLeadsFilters';
import { useLeadsQuery } from '@/hooks/leads/useLeadsQuery';
import { Lead, LeadsListProps } from '@/types';
import { SpinnerSize } from '@/types/enums';

import { EmptyState } from './EmptyState';
import { LeadDetailPanel } from './LeadDetailPanel';
import { LeadsFilters } from './LeadsFilters';
import { LeadCard } from './LeadsList/LeadCard';
import { LeadsTable } from './LeadsList/LeadsTable';
import { LeadsResultsCount } from './LeadsResultsCount';
import { LoadingSpinner } from './LoadingSpinner';

const LeadsList: React.FC<LeadsListProps> = ({ className }) => {
  const { isLoading, error } = useLeadsQuery();
  const {
    filteredLeads,
    searchTerm,
    statusFilter,
    scoreSortDirection,
    setSearchTerm,
    setStatusFilter,
    toggleScoreSort,
  } = useLeadsFilters();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSave = () => {
    setSelectedLead(null);
  };

  const handleConvertToOpportunity = () => {
    setSelectedLead(null);
  };

  // Render leads directly - no need for memoization here
  const mobileLeadsCards = filteredLeads.map((lead: Lead) => (
    <LeadCard key={lead.id} lead={lead} onClick={handleRowClick} />
  ));

  if (isLoading)
    return <LoadingSpinner message="Loading leads..." size={SpinnerSize.LG} />;

  if (error) {
    return (
      <EmptyState
        title="Error loading leads"
        message="There was a problem loading the leads. Please try again later."
      />
    );
  }

  return (
    <div className={className || 'space-y-6'}>
      {/* Filters and Results Count */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <LeadsFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          scoreSortDirection={scoreSortDirection}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
          onScoreSortToggle={toggleScoreSort}
        />

        <LeadsResultsCount
          count={filteredLeads.length}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </div>

      {/* Content */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads match your filters"
          message="Try adjusting your search terms or status filter."
        />
      ) : (
        <>
          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-3">{mobileLeadsCards}</div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <LeadsTable leads={filteredLeads} onRowClick={handleRowClick} />
          </div>
        </>
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

export { LeadsList };
