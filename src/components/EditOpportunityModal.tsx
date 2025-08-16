import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Opportunity } from '@/types';
import { useOpportunitiesStore } from '@/stores/opportunitiesStore';
import { opportunityUpdateSchema, OpportunityUpdateFormData } from '@/schemas/opportunities';
import ModalHeader from './EditOpportunityModal/ModalHeader';
import OpportunityForm from './EditOpportunityModal/OpportunityForm';
import ModalFooter from './EditOpportunityModal/ModalFooter';

// ============================================================================
// EDIT OPPORTUNITY MODAL PROPS
// ============================================================================

interface EditOpportunityModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

// ============================================================================
// EDIT OPPORTUNITY MODAL COMPONENT
// ============================================================================

const EditOpportunityModal: React.FC<EditOpportunityModalProps> = ({
  opportunity,
  onClose,
}) => {
  const { updateOpportunity } = useOpportunitiesStore();

  const methods = useForm<OpportunityUpdateFormData>({
    resolver: zodResolver(opportunityUpdateSchema),
    defaultValues: {
      name: opportunity.name,
      stage: opportunity.stage,
      amount: opportunity.amount,
      accountName: opportunity.accountName,
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = (data: OpportunityUpdateFormData) => {
    // Update opportunity in Zustand store
    updateOpportunity(opportunity.id, data);

    // Show success toast
    toast.success('Opportunity updated successfully!', {
      description: `Updated: ${data.name || opportunity.name}`,
    });

    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-md max-h-[90vh] rounded-xl shadow-2xl border border-gray-700 flex flex-col">
        {/* Header - Fixed */}
        <ModalHeader opportunity={opportunity} onClose={onClose} />

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <OpportunityForm />
            </form>
          </FormProvider>
        </div>

        {/* Footer - Fixed */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalFooter isSubmitting={isSubmitting} onCancel={onClose} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditOpportunityModal;
