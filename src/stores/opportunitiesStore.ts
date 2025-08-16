import { create } from 'zustand';
import { Opportunity } from '@/types';

// ============================================================================
// OPPORTUNITIES STORE STATE
// ============================================================================

export interface OpportunitiesStoreState {
  opportunities: Opportunity[];
  addOpportunity: (opportunity: Opportunity) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  getOpportunityById: (id: string) => Opportunity | undefined;
}

// ============================================================================
// OPPORTUNITIES STORE IMPLEMENTATION
// ============================================================================

export const useOpportunitiesStore = create<OpportunitiesStoreState>()((set, get) => ({
  // Initial state
  opportunities: [],

  // Actions
  addOpportunity: (opportunity: Opportunity) => {
    set((state) => ({
      opportunities: [...state.opportunities, opportunity],
    }));
  },

  updateOpportunity: (id: string, updates: Partial<Opportunity>) => {
    set((state) => ({
      opportunities: state.opportunities.map((opp) =>
        opp.id === id ? { ...opp, ...updates } : opp
      ),
    }));
  },

  deleteOpportunity: (id: string) => {
    set((state) => ({
      opportunities: state.opportunities.filter((opp) => opp.id !== id),
    }));
  },

  getOpportunityById: (id: string) => {
    const state = get();
    return state.opportunities.find((opp) => opp.id === id);
  },
}));
