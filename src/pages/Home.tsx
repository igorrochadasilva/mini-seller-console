import React, { useState } from 'react';
import { TypographyH1 } from "../components/ui/typograph";
import LeadsList from '@/components/LeadsList';
import OpportunitiesList from '@/components/OpportunitiesList';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp } from 'lucide-react';

function Home() {
  const [activeTab, setActiveTab] = useState<'leads' | 'opportunities'>('leads');

  return (
    <div className="mt-10 min-h-[800px] min-w-[1200px] p-5 rounded-lg bg-[#2a2a2a] shadow-lg">
      <TypographyH1>Mini Seller Console</TypographyH1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 my-6 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <Button
          variant={activeTab === 'leads' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <Users className="w-4 h-4" />
          Leads
        </Button>
        <Button
          variant={activeTab === 'opportunities' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('opportunities')}
          className={`flex items-center gap-2 ${
            activeTab === 'opportunities'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Opportunities
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'leads' ? (
        <LeadsList />
      ) : (
        <OpportunitiesList />
      )}
    </div>
  );
}

export default Home;
