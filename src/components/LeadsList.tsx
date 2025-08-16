import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { useLeadsQuery } from '@/hooks/leads/useLeadsQuery';
import { useLeadsStore } from '@/stores/leadsStore';
import LeadDetailPanel from './LeadDetailPanel';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { Lead, LeadsListProps } from '../types';

const LeadsList: React.FC<LeadsListProps> = ({ className }) => {
  const { isLoading, error } = useLeadsQuery();
  const { filteredAndSortedLeads } = useLeadsStore();
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSave = (updatedLead: Lead) => {
    // For now, just close the panel
    setSelectedLead(null);
  };

  if (isLoading) return <LoadingSpinner message="Loading leads..." size="lg" />
  
  if (error) {
    return (
      <EmptyState 
        title="Error loading leads"
        message="There was a problem loading the leads. Please try again later."
      />
    );
  }

  if (filteredAndSortedLeads.length === 0) {
    return (
      <EmptyState 
        title="No leads available"
        message="There are no leads to display at the moment."
      />
    );
  }

  return (
    <div className={`leads-list ${className || ''}`}>
      <Table className="w-full mt-4 bg-gray-900 text-white rounded-lg shadow-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-700 text-lg font-semibold text-white">Name</TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-700 text-lg font-semibold text-white">Company</TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-700 text-lg font-semibold text-white">Email</TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-700 text-lg font-semibold text-white">Source</TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-700 text-lg font-semibold text-white">Score</TableHead>
            <TableHead className="p-4 border-b border-gray-700 bg-gray-700 text-lg font-semibold text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedLeads.map((lead: Lead) => (
            <TableRow key={lead.id} className="hover:bg-gray-800 cursor-pointer" onClick={() => handleRowClick(lead)}>
              <TableCell className="p-4 border-b border-gray-700">{lead.name}</TableCell>
              <TableCell className="p-4 border-b border-gray-700">{lead.company}</TableCell>
              <TableCell className="p-4 border-b border-gray-700">{lead.email}</TableCell>
              <TableCell className="p-4 border-b border-gray-700">{lead.source}</TableCell>
              <TableCell className="p-4 border-b border-gray-700">{lead.score}</TableCell>
              <TableCell className="p-4 border-b border-gray-700">{lead.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {selectedLead && (
        <LeadDetailPanel 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default LeadsList;
