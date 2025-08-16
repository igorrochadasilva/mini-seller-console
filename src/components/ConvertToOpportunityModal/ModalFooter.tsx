import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface ModalFooterProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  isSubmitting,
  onCancel,
}) => {
  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1 bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSubmitting ? 'Converting...' : 'Convert to Opportunity'}
      </Button>
    </div>
  );
};

export default ModalFooter;
