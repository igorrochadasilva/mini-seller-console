import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH3, TypographyP } from '@/components/ui/typograph';
import { Lead } from '@/types';
import { getScoreColor, getStatusColor } from '@/lib/leadUtils';
import { COMMON_STYLES } from '@/lib/constants';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const scoreColor = getScoreColor(lead.score);
  const statusColor = getStatusColor(lead.status);

  return (
    <Card 
      className={COMMON_STYLES.card.base}
      onClick={() => onClick(lead)}
    >
      <CardContent className={COMMON_STYLES.card.content}>
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <TypographyH3 className="text-sm font-semibold text-white">
                {lead.name}
              </TypographyH3>
              <TypographyP className="text-xs text-gray-400">
                {lead.company}
              </TypographyP>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${scoreColor}`}>
                {lead.score}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
                {lead.status}
              </span>
            </div>
          </div>
          
          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-300">
              <span className="w-16 text-gray-400">Email:</span>
              <span className="flex-1">{lead.email}</span>
            </div>
            <div className="flex items-center text-xs text-gray-300">
              <span className="w-16 text-gray-400">Source:</span>
              <span className="flex-1">{lead.source}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
