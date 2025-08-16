import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LeadStatus, ScoreSortDirection } from '@/types/enums';

interface FiltersState {
  // Filter state
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
  scoreSortDirection: ScoreSortDirection;

  // Actions
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: LeadStatus | 'all') => void;
  setScoreSortDirection: (direction: ScoreSortDirection) => void;
  toggleScoreSort: () => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    set => ({
      // Initial state
      searchTerm: '',
      statusFilter: 'all',
      scoreSortDirection: ScoreSortDirection.DESC,

      // Actions
      setSearchTerm: (term: string) => set({ searchTerm: term }),

      setStatusFilter: (filter: LeadStatus | 'all') =>
        set({ statusFilter: filter }),

      setScoreSortDirection: (direction: ScoreSortDirection) =>
        set({ scoreSortDirection: direction }),

      toggleScoreSort: () =>
        set(state => ({
          scoreSortDirection:
            state.scoreSortDirection === ScoreSortDirection.ASC
              ? ScoreSortDirection.DESC
              : ScoreSortDirection.ASC,
        })),

      resetFilters: () =>
        set({
          searchTerm: '',
          statusFilter: 'all',
          scoreSortDirection: ScoreSortDirection.DESC,
        }),
    }),
    {
      name: 'leads-filters-storage',
      partialize: _state => ({
        searchTerm: _state.searchTerm,
        statusFilter: _state.statusFilter,
        scoreSortDirection: _state.scoreSortDirection,
      }),
    }
  )
);
