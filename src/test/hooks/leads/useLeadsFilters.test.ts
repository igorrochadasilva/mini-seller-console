import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLeadsFilters } from '@/hooks/leads/useLeadsFilters';

// Mock the Zustand store
vi.mock('@/stores/filtersStore', () => ({
  useFiltersStore: vi.fn(() => ({
    searchTerm: '',
    statusFilter: 'all',
    scoreSortDirection: 'desc',
    setSearchTerm: vi.fn(),
    setStatusFilter: vi.fn(),
    toggleScoreSort: vi.fn(),
    resetFilters: vi.fn(),
  })),
}));

describe('useLeadsFilters', () => {
  it('should return initial filter state', () => {
    const { result } = renderHook(() => useLeadsFilters());

    expect(result.current.searchTerm).toBe('');
    expect(result.current.statusFilter).toBe('all');
    expect(result.current.scoreSortDirection).toBe('desc');
  });

  it('should have filter functions available', () => {
    const { result } = renderHook(() => useLeadsFilters());

    expect(typeof result.current.setSearchTerm).toBe('function');
    expect(typeof result.current.setStatusFilter).toBe('function');
    expect(typeof result.current.toggleScoreSort).toBe('function');
    expect(typeof result.current.resetFilters).toBe('function');
  });
});
