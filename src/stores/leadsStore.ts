import { create } from 'zustand';
import { Lead, LeadsStoreState } from '../types/leads';

export const useLeadsStore = create<LeadsStoreState>()((set) => ({
  // Initial state - only data
  leads: [],
  
  // Actions - only data operations
  setLeads: (leads: Lead[]) => {
    set({ leads });
  },
}));
