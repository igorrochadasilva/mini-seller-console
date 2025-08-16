import { create } from 'zustand';
import { Lead, LeadsStoreState, LeadUpdateData } from '@/types';

export const useLeadsStore = create<LeadsStoreState>()(set => ({
  // Initial state - only data
  leads: [],

  // Actions - only data operations
  setLeads: (leads: Lead[]) => {
    set({ leads });
  },

  // Update individual lead
  updateLead: (leadId: string, updates: LeadUpdateData) => {
    set(state => ({
      leads: state.leads.map(lead =>
        lead.id === leadId ? { ...lead, ...updates } : lead
      ),
    }));
  },
}));
