// ============================================================================
// LEAD TYPES
// ============================================================================

/**
 * Base interface for a Lead entity
 */
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

// ============================================================================
// API TYPES
// ============================================================================

/**
 * Error response from API
 */
export interface ApiError {
  message: string;
  status?: number;
  details?: string;
}

// ============================================================================
// STORE TYPES
// ============================================================================

/**
 * State interface for the leads store
 */
export interface LeadsStoreState {
  // Data
  leads: Lead[];
  
  // Actions
  setLeads: (leads: Lead[]) => void;
}

// ============================================================================
// QUERY TYPES
// ============================================================================

/**
 * Return type for the useLeadsQuery hook
 */
export interface UseLeadsQueryResult {
  isLoading: boolean;
  error: ApiError | null;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

/**
 * Props for the LeadsList component
 */
export interface LeadsListProps {
  className?: string;
}

/**
 * Props for the LeadsFilters component
 */
export interface LeadsFiltersProps {
  searchTerm: string;
  statusFilter: string;
  scoreSortDirection: 'asc' | 'desc';
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onScoreSortToggle: () => void;
}

/**
 * Props for the LeadsResultsCount component
 */
export interface LeadsResultsCountProps {
  count: number;
  searchTerm: string;
  statusFilter: string;
}

/**
 * Props for the LeadDetailPanel component
 */
export interface LeadDetailPanelProps {
  lead: Lead;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
}

/**
 * Props for the LoadingSpinner component
 */
export interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}
