import { useState, useMemo, useCallback, useEffect } from 'react';
import { useLeadsStore } from '@/stores/leadsStore';
import { Lead } from '@/types';

export const useLeadsFilters = () => {
  const { leads } = useLeadsStore();
  
  // Local filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scoreSortDirection, setScoreSortDirection] = useState<'asc' | 'desc'>('desc');

  // Debounce search term to avoid excessive re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Computed filtered and sorted leads
  const filteredLeads = useMemo(() => {
    if (leads.length === 0) {
      return [];
    }

    // Apply filters
    let filtered = leads.filter(lead => {
      // Search filter (name or company) - using debounced term
      const matchesSearch = !debouncedSearchTerm || 
        lead.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    // Sort by score
    const sorted = filtered.sort((a, b) => {
      if (scoreSortDirection === 'desc') {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });
    
    return sorted;
  }, [leads, debouncedSearchTerm, statusFilter, scoreSortDirection]);

  // Memoized actions for better performance
  const setSearchTermCallback = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const setStatusFilterCallback = useCallback((filter: string) => {
    setStatusFilter(filter);
  }, []);

  const toggleScoreSort = useCallback(() => {
    setScoreSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  }, []);

  return {
    // Data
    filteredLeads,
    
    // Filter state
    searchTerm,
    statusFilter,
    scoreSortDirection,
    
    // Actions
    setSearchTerm: setSearchTermCallback,
    setStatusFilter: setStatusFilterCallback,
    toggleScoreSort,
  };
};
