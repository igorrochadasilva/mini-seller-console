// ============================================================================
// APPLICATION ENUMS
// ============================================================================

/**
 * Lead status enumeration
 */
export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  DISQUALIFIED = 'Disqualified',
}

/**
 * Opportunity stage enumeration
 */
export enum OpportunityStage {
  PROSPECTING = 'Prospecting',
  QUALIFICATION = 'Qualification',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  CLOSED_WON = 'Closed Won',
  CLOSED_LOST = 'Closed Lost',
}

/**
 * Score sort direction enumeration
 */
export enum ScoreSortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Loading spinner size enumeration
 */
export enum SpinnerSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}
