import { create } from 'zustand';
import { Lead, LeadsStoreState } from '../types/leads';

export const useLeadsStore = create<LeadsStoreState>()((set, get) => ({
  // Initial state
  leads: [],
  
  // Actions
  setLeads: (leads: Lead[]) => {
    // Sort leads by score desc and update both properties
    const sortedLeads = [...leads].sort((a, b) => b.score - a.score);
    set({ 
      leads, 
      filteredAndSortedLeads: sortedLeads 
    });
  },
  
  // Computed values - as a regular property that gets updated
  filteredAndSortedLeads: [],
}));
