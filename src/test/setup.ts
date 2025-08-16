import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock do React Query
vi.mock('@tanstack/react-query', () => ({
  QueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
    getQueryData: vi.fn(),
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isLoading: false,
    error: null,
  })),
}));

// Mock do Zustand stores
vi.mock('@/stores/leadsStore', () => ({
  useLeadsStore: vi.fn(() => ({
    leads: [],
    setLeads: vi.fn(),
    updateLead: vi.fn(),
  })),
}));

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

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock do ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
