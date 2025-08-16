import { Users, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

import { LeadsList } from '@/components/LeadsList';
import { OpportunitiesList } from '@/components/OpportunitiesList';
import { TypographyH1, Button, Container } from '@/components/ui';

export const Home = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'opportunities'>(
    'leads'
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Bar */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <Container fullWidth className="py-4">
          <div className="flex items-center justify-between">
            <TypographyH1 className="text-xl sm:text-2xl font-semibold text-white">
              Mini Seller Console
            </TypographyH1>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 border border-gray-700/50">
              <Button
                variant={activeTab === 'leads' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('leads')}
                size="sm"
                className={`h-8 px-3 text-xs font-medium transition-all duration-200 ${
                  activeTab === 'leads'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Users className="w-3 h-3 mr-2" />
                Leads
              </Button>
              <Button
                variant={activeTab === 'opportunities' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('opportunities')}
                size="sm"
                className={`h-8 px-3 text-xs font-medium transition-all duration-200 ${
                  activeTab === 'opportunities'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <TrendingUp className="w-3 h-3 mr-2" />
                Opportunities
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container fullWidth className="py-6">
        <div className="min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
          {activeTab === 'leads' ? <LeadsList /> : <OpportunitiesList />}
        </div>
      </Container>
    </div>
  );
};
