import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Opportunity, OpportunityStage } from '@/types';
import { Edit, Trash2 } from 'lucide-react';

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (id: string) => void;
}

const OpportunitiesTable: React.FC<OpportunitiesTableProps> = ({ opportunities, onEdit, onDelete }) => {
  const getStageColor = (stage: OpportunityStage) => {
    switch (stage) {
      case OpportunityStage.PROSPECTING:
        return 'bg-blue-900/20 text-blue-400 border-blue-800/30';
      case OpportunityStage.QUALIFICATION:
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
      case OpportunityStage.PROPOSAL:
        return 'bg-purple-900/20 text-purple-400 border-purple-800/30';
      case OpportunityStage.NEGOTIATION:
        return 'bg-orange-900/20 text-orange-400 border-orange-800/30';
      case OpportunityStage.CLOSED_WON:
        return 'bg-green-900/20 text-green-400 border-green-800/30';
      case OpportunityStage.CLOSED_LOST:
        return 'bg-red-900/20 text-red-400 border-red-800/30';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-800/30';
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow className="bg-gray-800/80 border-b border-gray-700">
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Name
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Stage
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Amount
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Account
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((opportunity) => (
              <TableRow
                key={opportunity.id}
                className="hover:bg-gray-800/30 transition-colors duration-150 border-b border-gray-800/50"
              >
                <TableCell className="px-4 py-3 font-medium text-sm text-gray-100">
                  {opportunity.name}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStageColor(opportunity.stage)}`}>
                    {opportunity.stage}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-300">
                  {formatAmount(opportunity.amount)}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-300">
                  {opportunity.accountName}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(opportunity)}
                      className="h-7 w-7 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(opportunity.id)}
                      className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OpportunitiesTable;
