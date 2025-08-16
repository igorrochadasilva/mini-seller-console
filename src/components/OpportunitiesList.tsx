import React, { useState } from 'react';
import { Opportunity } from '@/types';
import { useOpportunitiesStore } from '@/stores/opportunitiesStore';
import { toast } from 'sonner';
import EmptyState from './EmptyState';
import EditOpportunityModal from './EditOpportunityModal';
import { TypographyH2, TypographyP } from './ui/typograph';
import OpportunityCard from './OpportunitiesList/OpportunityCard';
import OpportunitiesTable from './OpportunitiesList/OpportunitiesTable';

// ============================================================================
// OPPORTUNITIES LIST COMPONENT
// ============================================================================

const OpportunitiesList: React.FC = () => {
  const { opportunities, deleteOpportunity } = useOpportunitiesStore();
  const [editingOpportunity, setEditingOpportunity] =
    useState<Opportunity | null>(null);

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
  };

  const handleDelete = (id: string) => {
    const opportunity = opportunities.find(opp => opp.id === id);
    if (!opportunity) return;

    if (
      window.confirm(`Are you sure you want to delete "${opportunity.name}"?`)
    ) {
      deleteOpportunity(id);
      toast.success('Opportunity deleted successfully!', {
        description: `Deleted: ${opportunity.name}`,
      });
    }
  };

  if (opportunities.length === 0) {
    return (
      <EmptyState
        title="No opportunities yet"
        message="Convert your first lead to an opportunity to get started."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <TypographyH2 className="text-xl sm:text-2xl font-bold text-white">
            Opportunities
          </TypographyH2>
          <TypographyP className="text-sm text-gray-400">
            Manage your sales opportunities
          </TypographyP>
        </div>
        <div className="flex items-center gap-2">
          <TypographyP className="text-sm text-gray-400">
            {opportunities.length} opportunity
            {opportunities.length !== 1 ? 's' : ''}
          </TypographyP>
        </div>
      </div>

      {/* Content */}
      <>
        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-3">
          {opportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <OpportunitiesTable
            opportunities={opportunities}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </>

      {/* Edit Opportunity Modal */}
      {editingOpportunity && (
        <EditOpportunityModal
          opportunity={editingOpportunity}
          onClose={() => setEditingOpportunity(null)}
        />
      )}
    </div>
  );
};

export default OpportunitiesList;
