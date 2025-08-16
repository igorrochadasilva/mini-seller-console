import { LeadStatus } from '@/types/enums';

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'bg-green-900/20 text-green-400 border-green-800/30';
  if (score >= 60)
    return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
  return 'bg-red-900/20 text-red-400 border-red-800/30';
};

export const getStatusColor = (status: LeadStatus): string => {
  switch (status) {
    case LeadStatus.NEW:
      return 'bg-blue-900/20 text-blue-400 border-blue-800/30';
    case LeadStatus.CONTACTED:
      return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
    case LeadStatus.QUALIFIED:
      return 'bg-green-900/20 text-green-400 border-green-800/30';
    default:
      return 'bg-red-900/20 text-red-400 border-red-800/30';
  }
};

export const generateOpportunityId = (): string => {
  return `opp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
