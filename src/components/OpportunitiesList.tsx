import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table';
import { Opportunity } from '@/types';
import { OpportunityStage } from '@/types/enums';
import { useOpportunitiesStore } from '@/stores/opportunitiesStore';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import EmptyState from './EmptyState';
import EditOpportunityModal from './EditOpportunityModal';
import { TypographyH2, TypographyP } from './ui/typograph';

// ============================================================================
// OPPORTUNITIES LIST COMPONENT
// ============================================================================

const OpportunitiesList: React.FC = () => {
  const { opportunities, deleteOpportunity } = useOpportunitiesStore();
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
  };

  const handleDelete = (id: string) => {
    const opportunity = opportunities.find(opp => opp.id === id);
    if (!opportunity) return;

    if (window.confirm(`Are you sure you want to delete "${opportunity.name}"?`)) {
      deleteOpportunity(id);
      toast.success('Opportunity deleted successfully!', {
        description: `Deleted: ${opportunity.name}`,
      });
    }
  };

  const getStageColor = (stage: OpportunityStage) => {
    switch (stage) {
      case OpportunityStage.PROSPECTING:
        return 'bg-blue-900/30 text-blue-400';
      case OpportunityStage.QUALIFICATION:
        return 'bg-yellow-900/30 text-yellow-400';
      case OpportunityStage.PROPOSAL:
        return 'bg-purple-900/30 text-purple-400';
      case OpportunityStage.NEGOTIATION:
        return 'bg-orange-900/30 text-orange-400';
      case OpportunityStage.CLOSED_WON:
        return 'bg-green-900/30 text-green-400';
      case OpportunityStage.CLOSED_LOST:
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
          <TypographyH2 className="text-2xl font-bold text-white">Opportunities</TypographyH2>
          <TypographyP className="text-gray-400">Manage your sales opportunities</TypographyP>
        </div>
        <div className="flex items-center gap-2">
          <TypographyP className="text-sm text-gray-400">
            {opportunities.length} opportunity{opportunities.length !== 1 ? 's' : ''}
          </TypographyP>
        </div>
      </div>

      {/* Table */}
      <Table className="w-full bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
        <TableHeader>
          <TableRow className="bg-gray-800/80 hover:bg-gray-800/80">
            <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">
              Name
            </TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">
              Stage
            </TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">
              Amount
            </TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">
              Account
            </TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-800/80 text-lg font-semibold text-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow
              key={opportunity.id}
              className="hover:bg-gray-800/60 transition-colors duration-150 border-b border-gray-700/30"
            >
              <TableCell className="p-4 font-medium">{opportunity.name}</TableCell>
              <TableCell className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStageColor(opportunity.stage)}`}>
                  {opportunity.stage}
                </span>
              </TableCell>
              <TableCell className="p-4 text-gray-300">
                {formatAmount(opportunity.amount)}
              </TableCell>
              <TableCell className="p-4 text-gray-300">{opportunity.accountName}</TableCell>
              <TableCell className="p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    onClick={() => handleEdit(opportunity)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => handleDelete(opportunity.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
