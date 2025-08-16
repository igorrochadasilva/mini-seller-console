import React, { useState } from 'react';
import { TypographyH1, Button, Card, CardContent, CardHeader } from "@/components/ui";
import LeadsList from '@/components/LeadsList';
import OpportunitiesList from '@/components/OpportunitiesList';
import { Users, TrendingUp } from 'lucide-react';

function Home() {
  const [activeTab, setActiveTab] = useState<'leads' | 'opportunities'>('leads');

  return (
    <div className="w-full h-screen p-3 sm:p-4 lg:p-6">
      <Card className="w-full">
        <CardHeader className="pb-6">
          <TypographyH1 className="text-2xl sm:text-3xl lg:text-4xl">
            Mini Seller Console
          </TypographyH1>
        </CardHeader>

        <CardContent className="space-y-8 flex-1 h-full">
          {/* Tab Navigation */}
          <div className="flex space-x-2 p-2 bg-gray-800/30 rounded-xl border border-gray-700/30 backdrop-blur-sm">
            <Button
              variant={activeTab === 'leads' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('leads')}
              className={`flex-1 sm:flex-none items-center gap-3 text-sm sm:text-base px-4 sm:px-6 py-3 transition-all duration-200 ${
                activeTab === 'leads'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Leads</span>
              <span className="sm:hidden">L</span>
            </Button>
            <Button
              variant={activeTab === 'opportunities' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('opportunities')}
              className={`flex-1 sm:flex-none items-center gap-3 text-sm sm:text-base px-4 sm:px-6 py-3 transition-all duration-200 ${
                activeTab === 'opportunities'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Opportunities</span>
              <span className="sm:hidden">O</span>
            </Button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-0 overflow-auto">
            {activeTab === 'leads' ? (
              <LeadsList />
            ) : (
              <OpportunitiesList />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
