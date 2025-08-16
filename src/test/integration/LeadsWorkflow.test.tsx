import { describe, expect, it, vi } from 'vitest';

import { LeadsList } from '@/components/LeadsList';
import { render, screen } from '@/test/utils';

// Mock the stores to provide test data
vi.mock('@/stores/leadsStore', () => ({
  useLeadsStore: vi.fn(() => ({
    leads: [
      {
        id: '1',
        name: 'João Silva',
        company: 'TechCorp',
        email: 'joao.silva@techcorp.com',
        source: 'Website',
        score: 85,
        status: 'NEW',
      },
    ],
    setLeads: vi.fn(),
    updateLead: vi.fn(),
  })),
}));

describe('Leads Workflow Integration', () => {
  it('should render leads list component', () => {
    render(<LeadsList />);

    // Should show the filters section
    expect(
      screen.getByPlaceholderText('Search by name or company...')
    ).toBeInTheDocument();
    expect(screen.getByText('All Statuses')).toBeInTheDocument();
  });

  it('should display leads table when data is available', async () => {
    render(<LeadsList />);

    // Wait for the table to be rendered
    await screen.findByRole('table');

    // Verify basic table structure
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
