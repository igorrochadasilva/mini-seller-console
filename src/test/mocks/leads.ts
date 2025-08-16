import { Lead, LeadStatus } from '@/types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    company: 'TechCorp',
    email: 'joao.silva@techcorp.com',
    source: 'Website',
    score: 85,
    status: LeadStatus.NEW,
  },
  {
    id: '2',
    name: 'Maria Santos',
    company: 'InnovateLab',
    email: 'maria.santos@innovatelab.com',
    source: 'LinkedIn',
    score: 92,
    status: LeadStatus.CONTACTED,
  },
  {
    id: '3',
    name: 'Pedro Costa',
    company: 'StartupXYZ',
    email: 'pedro.costa@startupxyz.com',
    source: 'Referral',
    score: 78,
    status: LeadStatus.QUALIFIED,
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    company: 'Enterprise Inc',
    email: 'ana.oliveira@enterprise.com',
    source: 'Trade Show',
    score: 95,
    status: LeadStatus.PROPOSAL,
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    company: 'Small Business',
    email: 'carlos.ferreira@smallbusiness.com',
    source: 'Cold Call',
    score: 65,
    status: LeadStatus.NEW,
  },
];

export const mockLead: Lead = mockLeads[0];

export const mockEmptyLeads: Lead[] = [];
