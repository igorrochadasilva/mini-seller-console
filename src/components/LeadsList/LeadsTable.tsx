import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Lead, LeadStatus } from '@/types';

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onRowClick }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/20 text-green-400 border-green-800/30';
    if (score >= 60) return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
    return 'bg-red-900/20 text-red-400 border-red-800/30';
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW:
        return 'bg-blue-900/20 text-blue-400 border-blue-800/30';
      case LeadStatus.CONTACTED:
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30';
      case LeadStatus.QUALIFIED:
        return 'bg-green-900/20 text-green-400 border-green-800/30';
      default:
        return 'bg-red-900/20 text-red-400 border-red-800/30';
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow className="bg-gray-800/80 border-b border-gray-700">
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Name
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Company
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Email
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Source
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Score
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead: Lead) => (
              <TableRow
                key={lead.id}
                className="hover:bg-gray-800/30 cursor-pointer transition-colors duration-150 border-b border-gray-800/50"
                onClick={() => onRowClick(lead)}
              >
                <TableCell className="px-4 py-3 font-medium text-sm text-gray-100">
                  {lead.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-300">
                  {lead.company}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-300">
                  {lead.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-gray-300">
                  {lead.source}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeadsTable;
