import { z } from 'zod';

import { LeadStatus } from '@/types/enums';

export const leadUpdateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  status: z.nativeEnum(LeadStatus),
});

export type LeadUpdateFormData = z.infer<typeof leadUpdateSchema>;
