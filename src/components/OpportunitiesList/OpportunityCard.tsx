import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH3, TypographyP } from '@/components/ui/typograph';
import { Button } from '@/components/ui/button';
import { Opportunity, OpportunityStage } from '@/types';
import { Edit, Trash2 } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (id: string) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onEdit, onDelete }) => {
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
    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/30 transition-all duration-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <TypographyH3 className="text-sm font-semibold text-white">
                {opportunity.name}
              </TypographyH3>
              <TypographyP className="text-xs text-gray-400">
                {opportunity.accountName || 'No account'}
              </TypographyP>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStageColor(opportunity.stage)}`}>
              {opportunity.stage}
            </span>
          </div>
          
          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-300">
              <span className="w-16 text-gray-400">Amount:</span>
              <span className="flex-1">{formatAmount(opportunity.amount)}</span>
            </div>
            <div className="flex items-center text-xs text-gray-300">
              <span className="w-16 text-gray-400">Account:</span>
              <span className="flex-1">{opportunity.accountName}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-800/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(opportunity)}
              className="h-7 px-3 text-xs text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(opportunity.id)}
              className="h-7 px-3 text-xs text-gray-400 hover:text-red-400 hover:bg-red-900/20"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
