import { useState, useMemo, useCallback, useEffect } from 'react';
import { useLeadsStore } from '@/stores/leadsStore';
import { LeadStatus, ScoreSortDirection, UseLeadsFilters } from '@/types';

export const useLeadsFilters = (): UseLeadsFilters => {
  const { leads } = useLeadsStore();

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [scoreSortDirection, setScoreSortDirection] = useState<ScoreSortDirection>(ScoreSortDirection.DESC);

  // Computed filtered leads
  const filteredLeads = useMemo(() => {
    let filtered = leads;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Apply score sorting
    filtered = [...filtered].sort((a, b) => {
      if (scoreSortDirection === ScoreSortDirection.ASC) {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });

    return filtered;
  }, [leads, searchTerm, statusFilter, scoreSortDirection]);

  // Actions
  const toggleScoreSort = useCallback(() => {
    setScoreSortDirection((prev) =>
      prev === ScoreSortDirection.ASC ? ScoreSortDirection.DESC : ScoreSortDirection.ASC
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setScoreSortDirection(ScoreSortDirection.DESC);
  }, []);

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
