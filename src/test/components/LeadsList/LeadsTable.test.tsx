import { describe, expect, it, vi } from 'vitest';

import { LeadsTable } from '@/components/LeadsList/LeadsTable';
import { mockLeads } from '@/test/mocks/leads';
import { render, screen } from '@/test/utils';

describe('LeadsTable', () => {
  const mockOnRowClick = vi.fn();

  it('should render table headers correctly', () => {
    render(<LeadsTable leads={mockLeads} onRowClick={mockOnRowClick} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Source')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should render leads data correctly', () => {
    render(<LeadsTable leads={mockLeads} onRowClick={mockOnRowClick} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('TechCorp')).toBeInTheDocument();
    expect(screen.getByText('joao.silva@techcorp.com')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getAllByText('New')).toHaveLength(2); // João Silva and Carlos Ferreira
  });

  it('should handle row click', async () => {
    const user = (await import('@testing-library/user-event')).default.setup();
    render(<LeadsTable leads={mockLeads} onRowClick={mockOnRowClick} />);

    const firstRow = screen.getByText('João Silva').closest('tr');
    await user.click(firstRow!);

    expect(mockOnRowClick).toHaveBeenCalledWith(mockLeads[0]);
  });

  it('should render empty state when no leads', () => {
    render(<LeadsTable leads={[]} onRowClick={mockOnRowClick} />);

    // Should still show table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // But no lead data
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
  });
});
