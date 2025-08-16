import { LeadStatus, OpportunityStage, ScoreSortDirection, SpinnerSize } from './enums';

// ============================================================================
// LEAD TYPES
// ============================================================================

/**
 * Lead entity interface
 */
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

/**
 * Opportunity entity interface
 */
export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}

/**
 * Lead update data interface
 */
export interface LeadUpdateData {
  email?: string;
  status?: LeadStatus;
}

// ============================================================================
// STORE TYPES
// ============================================================================

/**
 * Zustand store state interface
 */
export interface LeadsStoreState {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  updateLead: (leadId: string, updates: LeadUpdateData) => void;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Filter state interface
 */
export interface LeadsFilterState {
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
  scoreSortDirection: ScoreSortDirection;
}

/**
 * Filter actions interface
 */
export interface LeadsFilterActions {
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: LeadStatus | 'all') => void;
  toggleScoreSort: () => void;
  resetFilters: () => void;
}

/**
 * Combined filter hook interface
 */
export interface UseLeadsFilters extends LeadsFilterState, LeadsFilterActions {
  filteredLeads: Lead[];
}

// ============================================================================
// QUERY TYPES
// ============================================================================

/**
 * React Query result interface
 */
export interface UseLeadsQueryResult {
  isLoading: boolean;
  error: Error | null;
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * LeadsList component props
 */
export interface LeadsListProps {
  className?: string;
}

/**
 * LeadDetailPanel component props
 */
export interface LeadDetailPanelProps {
  lead: Lead;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
  onConvertToOpportunity: (opportunity: Opportunity) => void;
}

/**
 * LeadsFilters component props
 */
export interface LeadsFiltersProps {
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
  scoreSortDirection: ScoreSortDirection;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: LeadStatus | 'all') => void;
  onScoreSortToggle: () => void;
}

/**
 * LeadsResultsCount component props
 */
export interface LeadsResultsCountProps {
  count: number;
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
}

/**
 * LoadingSpinner component props
 */
export interface LoadingSpinnerProps {
  message?: string;
  size?: SpinnerSize;
}

/**
 * EmptyState component props
 */
export interface EmptyStateProps {
  title: string;
  message: string;
}
