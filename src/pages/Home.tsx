import React from 'react';
import { TypographyH1 } from "../components/ui/typograph";
import LeadsList from '@/components/LeadsList';


function Home() {
  return (
    <div className="App">
      <TypographyH1>Mini Seller Console</TypographyH1>
      <LeadsList />
    </div>
  );
}

export default Home;
