import { useMemo } from 'react';
import { useLeadsStore } from '@/stores/leadsStore';
import { useFiltersStore } from '@/stores/filtersStore';
import { ScoreSortDirection } from '@/types/enums';

// ============================================================================
// OPTIMIZED LEADS FILTERS HOOK WITH ZUSTAND PERSIST
// ============================================================================

export const useLeadsFilters = () => {
  const { leads } = useLeadsStore();
  const {
    searchTerm,
    statusFilter,
    scoreSortDirection,
    setSearchTerm,
    setStatusFilter,
    toggleScoreSort,
    resetFilters,
  } = useFiltersStore();

  // Computed filtered leads - optimized with single pass filtering
  const filteredLeads = useMemo(() => {
    if (!leads.length) return [];

    // Single pass filtering for better performance
    const filtered = leads.filter(lead => {
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
