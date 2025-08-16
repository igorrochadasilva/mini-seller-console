import { User, Building, TrendingUp } from 'lucide-react';
import React from 'react';

import { Label } from '@/components/ui/label';
import { TypographyH3, TypographyP } from '@/components/ui/typograph';
import { Lead } from '@/types';

interface LeadInformationProps {
  lead: Lead;
}

const LeadInformation: React.FC<LeadInformationProps> = ({ lead }) => {
  return (
    <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
      <TypographyH3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Lead Information
      </TypographyH3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-blue-400" />
          <div>
            <Label className="text-xs text-gray-400">Name</Label>
            <TypographyP className="text-white font-medium">
              {lead.name}
            </TypographyP>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Building className="w-4 h-4 text-green-400" />
          <div>
            <Label className="text-xs text-gray-400">Company</Label>
            <TypographyP className="text-white font-medium">
              {lead.company}
            </TypographyP>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TrendingUp className="w-4 h-4 text-yellow-400" />
          <div>
            <Label className="text-xs text-gray-400">Score</Label>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                lead.score >= 80
                  ? 'bg-green-900/30 text-green-400'
                  : lead.score >= 60
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-red-900/30 text-red-400'
              }`}
            >
              {lead.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LeadInformation };
