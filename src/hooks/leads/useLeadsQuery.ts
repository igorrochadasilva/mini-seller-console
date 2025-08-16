import { useQuery } from '@tanstack/react-query';
import { getLeads } from '@/services/leads/getLeads';
import { useLeadsStore } from '@/stores/leadsStore';
import { UseLeadsQueryResult } from '@/types';
import { toast } from 'sonner';

export const useLeadsQuery = (): UseLeadsQueryResult => {
  const { setLeads } = useLeadsStore();

  const { isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: () =>
      getLeads()
        .then(result => {
          setLeads(result);
          toast.success('Leads loaded successfully');
          return result;
        })
        .catch(error => {
          toast.error('Failed to load leads', {
            description: error.message || 'An unexpected error occurred',
          });
          throw error;
        }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
  });

  return { isLoading, error };
};
