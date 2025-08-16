import { z } from 'zod';

import { LeadStatus } from '@/types/enums';

export const leadUpdateSchema = z.object({
  email: z.email('Please enter a valid email address'),
  status: z.enum(LeadStatus),
});

export type LeadUpdateFormData = z.infer<typeof leadUpdateSchema>;
