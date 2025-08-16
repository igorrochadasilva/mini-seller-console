import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lead, Opportunity } from '@/types';
import { useOpportunitiesStore } from '@/stores/opportunitiesStore';
import { opportunityCreateSchema, OpportunityCreateFormData } from '@/schemas/opportunities';
import { OpportunityStage } from '@/types/enums';
import ModalHeader from './ConvertToOpportunityModal/ModalHeader';
import LeadInformation from './ConvertToOpportunityModal/LeadInformation';
import OpportunityForm from './ConvertToOpportunityModal/OpportunityForm';
import ModalFooter from './ConvertToOpportunityModal/ModalFooter';

// ============================================================================
// CONVERT TO OPPORTUNITY MODAL PROPS
// ============================================================================

interface ConvertToOpportunityModalProps {
  lead: Lead;
  onClose: () => void;
  onSuccess: (opportunity: Opportunity) => void;
}

// ============================================================================
// CONVERT TO OPPORTUNITY MODAL COMPONENT
// ============================================================================

const ConvertToOpportunityModal: React.FC<ConvertToOpportunityModalProps> = ({
  lead,
  onClose,
  onSuccess,
}) => {
  const { addOpportunity } = useOpportunitiesStore();

  const methods = useForm<OpportunityCreateFormData>({
    resolver: zodResolver(opportunityCreateSchema),
    defaultValues: {
      name: `${lead.name} - Opportunity`,
      stage: OpportunityStage.PROSPECTING,
      accountName: lead.company,
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: OpportunityCreateFormData) => {
    try {
      // Create new opportunity
      const newOpportunity: Opportunity = {
        id: `opp_${Date.now()}`, // Simple ID generation for demo
        name: data.name,
        stage: data.stage,
        amount: data.amount,
        accountName: data.accountName,
      };

      // Add to store
      addOpportunity(newOpportunity);

      // Show success toast
      toast.success('Lead converted successfully!', {
        description: `Created opportunity: ${newOpportunity.name}`,
      });

      // Call success callback
      onSuccess(newOpportunity);

      // Close modal
      onClose();
    } catch (error) {
      // Show error toast
      toast.error('Failed to convert lead', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-md max-h-[90vh] rounded-xl shadow-2xl border border-gray-700 flex flex-col">
        {/* Header - Fixed */}
        <ModalHeader lead={lead} onClose={onClose} />

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Lead Information */}
              <LeadInformation lead={lead} />

              {/* Opportunity Form */}
              <OpportunityForm />
            </form>
          </FormProvider>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-700 bg-gray-900 rounded-b-2xl">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalFooter isSubmitting={isSubmitting} onCancel={onClose} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ConvertToOpportunityModal;
