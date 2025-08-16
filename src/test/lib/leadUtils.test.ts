import { describe, expect, it } from 'vitest';

import { getScoreColor, getStatusColor } from '@/lib/leadUtils';
import { LeadStatus } from '@/types';

describe('leadUtils', () => {
  describe('getScoreColor', () => {
    it('should return correct color for high score (80+)', () => {
      expect(getScoreColor(95)).toContain('bg-green-900/20');
      expect(getScoreColor(100)).toContain('bg-green-900/20');
      expect(getScoreColor(80)).toContain('bg-green-900/20');
    });

    it('should return correct color for medium score (60-79)', () => {
      expect(getScoreColor(85)).toContain('bg-green-900/20');
      expect(getScoreColor(79)).toContain('bg-yellow-900/20');
      expect(getScoreColor(60)).toContain('bg-yellow-900/20');
    });

    it('should return correct color for low score (0-59)', () => {
      expect(getScoreColor(65)).toContain('bg-yellow-900/20');
      expect(getScoreColor(59)).toContain('bg-red-900/20');
      expect(getScoreColor(0)).toContain('bg-red-900/20');
    });

    it('should handle edge cases correctly', () => {
      expect(getScoreColor(59.9)).toContain('bg-red-900/20');
      expect(getScoreColor(60.1)).toContain('bg-yellow-900/20');
      expect(getScoreColor(79.9)).toContain('bg-yellow-900/20');
      expect(getScoreColor(80.1)).toContain('bg-green-900/20');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct color for NEW status', () => {
      const color = getStatusColor(LeadStatus.NEW);
      expect(color).toContain('bg-blue-900/20');
      expect(color).toContain('text-blue-400');
      expect(color).toContain('border-blue-800/30');
    });

    it('should return correct color for CONTACTED status', () => {
      const color = getStatusColor(LeadStatus.CONTACTED);
      expect(color).toContain('bg-yellow-900/20');
      expect(color).toContain('text-yellow-400');
      expect(color).toContain('border-yellow-800/30');
    });

    it('should return correct color for QUALIFIED status', () => {
      const color = getStatusColor(LeadStatus.QUALIFIED);
      expect(color).toContain('bg-green-900/20');
      expect(color).toContain('text-green-400');
      expect(color).toContain('border-green-800/30');
    });

    it('should return correct color for PROPOSAL status', () => {
      const color = getStatusColor(LeadStatus.PROPOSAL);
      expect(color).toContain('bg-red-900/20');
      expect(color).toContain('text-red-400');
      expect(color).toContain('border-red-800/30');
    });

    it('should return correct color for NEGOTIATION status', () => {
      const color = getStatusColor(LeadStatus.NEGOTIATION);
      expect(color).toContain('bg-red-900/20');
      expect(color).toContain('text-red-400');
      expect(color).toContain('border-red-800/30');
    });

    it('should return correct color for CLOSED_WON status', () => {
      const color = getStatusColor(LeadStatus.CLOSED_WON);
      expect(color).toContain('bg-red-900/20');
      expect(color).toContain('text-red-400');
      expect(color).toContain('border-red-800/30');
    });

    it('should return correct color for CLOSED_LOST status', () => {
      const color = getStatusColor(LeadStatus.CLOSED_LOST);
      expect(color).toContain('bg-red-900/20');
      expect(color).toContain('text-red-400');
      expect(color).toContain('border-red-800/30');
    });
  });
});
