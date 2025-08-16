import { useQuery } from '@tanstack/react-query';
import { getLeads } from '@/services/leads/getLeads';

export const useLeadsQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  });

  return { data, isLoading, error };
};
