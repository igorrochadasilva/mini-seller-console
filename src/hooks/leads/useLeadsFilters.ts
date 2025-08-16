import { useMemo } from 'react';
import { useLeadsStore } from '@/stores/leadsStore';
import { LeadStatus, ScoreSortDirection, UseLeadsFilters } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ============================================================================
// OPTIMIZED LEADS FILTERS HOOK WITH LOCAL STORAGE
// ============================================================================

export const useLeadsFilters = (): UseLeadsFilters => {
  const { leads } = useLeadsStore();

  // Filter state with localStorage persistence
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('leads-search-term', '');
  const [statusFilter, setStatusFilter] = useLocalStorage<LeadStatus | 'all'>('leads-status-filter', 'all');
  const [scoreSortDirection, setScoreSortDirection] = useLocalStorage<ScoreSortDirection>('leads-score-sort', ScoreSortDirection.DESC);

  // Computed filtered leads - optimized with single pass filtering
  const filteredLeads = useMemo(() => {
    if (!leads.length) return [];

    // Single pass filtering for better performance
    const filtered = leads.filter((lead) => {
      // Apply search filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          lead.name.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Apply status filter
      if (statusFilter !== 'all' && lead.status !== statusFilter) {
        return false;
      }

      return true;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      return scoreSortDirection === ScoreSortDirection.ASC 
        ? a.score - b.score 
        : b.score - a.score;
    });
  }, [leads, searchTerm, statusFilter, scoreSortDirection]);

  // Simplified actions - no need for useCallback here
  const toggleScoreSort = () => {
    setScoreSortDirection(prev => 
      prev === ScoreSortDirection.ASC ? ScoreSortDirection.DESC : ScoreSortDirection.ASC
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setScoreSortDirection(ScoreSortDirection.DESC);
  };

  return {
    // State
    searchTerm,
    statusFilter,
    scoreSortDirection,

    // Actions
    setSearchTerm,
    setStatusFilter,
    toggleScoreSort,
    resetFilters,

    // Computed
    filteredLeads,
  };
};
