import { Lead, LeadStatus } from '@/types';
import leadsData from '@/leads.json';

export const getLeads = async (): Promise<Lead[]> => {
  // Simular delay de rede para experiência realista
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mapear dados e converter status para enum
  const leads = leadsData.leads.map(lead => ({
    ...lead,
    status: lead.status as LeadStatus
  }));
  
  return leads;
};
