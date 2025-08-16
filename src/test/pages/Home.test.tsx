import { describe, expect, it } from 'vitest';

import { Home } from '@/pages/Home';
import { render, screen } from '@/test/utils';

describe('Home', () => {
  it('should render the page title', () => {
    render(<Home />);

    expect(screen.getByText('Mini Seller Console')).toBeInTheDocument();
  });

  it('should render tabs for leads and opportunities', () => {
    render(<Home />);

    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Opportunities')).toBeInTheDocument();
  });

  it('should switch between leads and opportunities tabs', async () => {
    const user = (await import('@testing-library/user-event')).default.setup();
    render(<Home />);

    // Initially should show leads content (filters)
    expect(
      screen.getByPlaceholderText('Search by name or company...')
    ).toBeInTheDocument();

    // Click on opportunities tab
    const opportunitiesTab = screen.getByText('Opportunities');
    await user.click(opportunitiesTab);

    // Should now show opportunities content
    expect(screen.getByText('No opportunities yet')).toBeInTheDocument();
  });
});
