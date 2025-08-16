import React from 'react';
import { Lead } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Zap } from 'lucide-react';
import { TypographyH2, TypographyP } from '@/components/ui/typograph';

interface ModalHeaderProps {
  lead: Lead;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ lead, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-800/50 rounded-t-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600/20 rounded-lg">
          <Zap className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <TypographyH2 className="text-xl font-bold text-white">Convert to Opportunity</TypographyH2>
          <TypographyP className="text-sm text-gray-400">Create opportunity from {lead.name}</TypographyP>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-gray-400 hover:text-white hover:bg-gray-700"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ModalHeader;
