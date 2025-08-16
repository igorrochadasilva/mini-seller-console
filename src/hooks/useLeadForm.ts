import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadUpdateSchema, LeadUpdateFormData } from '@/schemas/leads';
import { Lead } from '@/types';

export const useLeadForm = (lead: Lead) => {
  return useForm<LeadUpdateFormData>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      email: lead.email,
      status: lead.status,
    },
  });
};
