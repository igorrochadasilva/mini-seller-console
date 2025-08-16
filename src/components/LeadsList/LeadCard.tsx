import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH3, TypographyP } from '@/components/ui/typograph';
import { Lead, LeadStatus } from '@/types';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/20 text-green-400 border-green-800/30';
    if (score >= 60) return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
    return 'bg-red-900/20 text-red-400 border-red-800/30';
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW:
        return 'bg-blue-900/20 text-blue-400 border-blue-800/30';
      case LeadStatus.CONTACTED:
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
      case LeadStatus.QUALIFIED:
        return 'bg-green-900/20 text-green-400 border-green-800/30';
      default:
        return 'bg-red-900/20 text-red-400 border-red-800/30';
    }
  };

  return (
    <Card 
      className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/30 cursor-pointer transition-all duration-200"
      onClick={() => onClick(lead)}
    >
      <CardContent className="p-4">
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
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getScoreColor(lead.score)}`}>
                {lead.score}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
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
