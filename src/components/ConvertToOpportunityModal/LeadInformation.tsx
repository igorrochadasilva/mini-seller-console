import React from 'react';
import { Lead } from '@/types';
import { User, Building, TrendingUp } from 'lucide-react';
import { TypographyH3, TypographyP } from '@/components/ui/typograph';

interface LeadInformationProps {
  lead: Lead;
}

const LeadInformation: React.FC<LeadInformationProps> = ({ lead }) => {
  return (
    <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
      <TypographyH3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
        Converting Lead
      </TypographyH3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Name:</span>
          <TypographyP className="text-white font-medium">{lead.name}</TypographyP>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Company:</span>
          <TypographyP className="text-white font-medium">{lead.company}</TypographyP>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Score:</span>
          <TypographyP className="text-white font-medium">{lead.score}</TypographyP>
        </div>
      </div>
    </div>
  );
};

export default LeadInformation;
