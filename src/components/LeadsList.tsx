import React, { useState, useEffect } from 'react';
import { Input } from "./ui/input";
import { Select, SelectItem, SelectContent } from "./ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";

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
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetch('/src/leads.json')
      .then(response => response.json())
      .then(data => setLeads(data));
  }, []);

  const filteredLeads = leads.filter(lead =>
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? lead.status === statusFilter : true)
  );

  return (
    <div className="leads-list">
      <Input
        type="text"
        placeholder="Search by name or company"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mt-4"
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map(lead => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>{lead.score}</TableCell>
              <TableCell>{lead.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LeadsList;
