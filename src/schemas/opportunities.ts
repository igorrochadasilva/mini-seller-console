import { z } from 'zod';

import { OpportunityStage } from '@/types/enums';

// ============================================================================
// OPPORTUNITY VALIDATION SCHEMAS
// ============================================================================

/**
 * Schema for creating a new opportunity
 */
export const opportunityCreateSchema = z.object({
  name: z.string().min(1, 'Opportunity name is required'),
  stage: z.nativeEnum(OpportunityStage, {
    required_error: 'Please select a stage',
  }),
  amount: z.number().min(0, 'Amount must be positive').optional(),
  accountName: z.string().min(1, 'Account name is required'),
});

/**
 * Type inference from the opportunity create schema
 */
export type OpportunityCreateFormData = z.infer<typeof opportunityCreateSchema>;

/**
 * Schema for updating an opportunity
 */
export const opportunityUpdateSchema = z.object({
  name: z.string().min(1, 'Opportunity name is required').optional(),
  stage: z.nativeEnum(OpportunityStage).optional(),
  amount: z.number().min(0, 'Amount must be positive').optional(),
  accountName: z.string().min(1, 'Account name is required').optional(),
});

/**
 * Type inference from the opportunity update schema
 */
export type OpportunityUpdateFormData = z.infer<typeof opportunityUpdateSchema>;
