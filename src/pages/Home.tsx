import React from 'react';
import { TypographyH1 } from "../components/ui/typograph";
import LeadsList from '@/components/LeadsList';

function Home() {
  return (
    <div className="mt-10 min-h-[800px] min-w-[1200px] p-5 rounded-lg bg-[#2a2a2a] shadow-lg">
      <TypographyH1>Mini Seller Console</TypographyH1>
      <LeadsList />
    </div>
  );
}

export default Home;
