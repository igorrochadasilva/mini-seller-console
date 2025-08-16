import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lead, LeadDetailPanelProps } from '@/types';
import { useLeadsStore } from '@/stores/leadsStore';
import { Button } from './ui/button';
import { X, Save, Zap } from 'lucide-react';
import { leadUpdateSchema, LeadUpdateFormData } from '@/schemas/leads';
import LeadInformation from './LeadDetailPanel/LeadInformation';
import EditFields from './LeadDetailPanel/EditFields';
import { LeadStatus } from '@/types/enums';

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, onClose, onSave, onConvertToOpportunity }) => {
  const { updateLead } = useLeadsStore();
  
  const methods = useForm<LeadUpdateFormData>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      email: lead.email,
      status: lead.status,
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: LeadUpdateFormData) => {
    try {
      // Update lead in Zustand store
      updateLead(lead.id, {
        email: data.email,
        status: data.status,
      });

      // Call parent onSave callback
      onSave({ ...lead, email: data.email, status: data.status });
      
      // Show success toast
      toast.success('Lead updated successfully!', {
        description: `Updated ${lead.name}'s information`,
      });
      
      // Close panel
      onClose();
    } catch (error) {
      // Show error toast
      toast.error('Failed to update lead', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  const handleConvertToOpportunity = () => {
    onConvertToOpportunity(lead);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-gray-900 w-full max-w-md h-full overflow-y-auto border-l border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-xl font-bold text-white">Edit Lead</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Lead Information Component */}
            <LeadInformation lead={lead} />

            {/* Edit Fields Component */}
            <EditFields />

            {/* Convert to Opportunity Button */}
            <div className="pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={handleConvertToOpportunity}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Convert to Opportunity
              </Button>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LeadDetailPanel;

