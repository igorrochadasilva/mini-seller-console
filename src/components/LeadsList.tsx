import React, { useState } from 'react';
import { Input } from "./ui/input";
import { Select, SelectItem, SelectContent } from "./ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import { useLeadsQuery } from '@/hooks/leads/useLeadsQuery';
import LeadDetailPanel from './LeadDetailPanel';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

function LeadsList() {
  const { data: leads = [], isLoading, error } = useLeadsQuery();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredLeads = leads.filter(lead =>
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? lead.status === statusFilter : true)
  );

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleSave = (updatedLead: Lead) => {
    // Update the lead in the list (this would typically involve an API call)
    const updatedLeads = leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead);
    setSelectedLead(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leads</div>;

  return (
    <div className="leads-list">
      <Input
        type="text"
        placeholder="Search by name or company"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-sm transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
      />
      <Select
        value={statusFilter}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setStatusFilter(e.target.value)}
      >
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Contacted">Contacted</SelectItem>
        </SelectContent>
      </Select>
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
          {filteredLeads.map(lead => (
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
      {selectedLead && <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} onSave={handleSave} />}
    </div>
  );
}

export default LeadsList;
