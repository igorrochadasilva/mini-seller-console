import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Lead } from '@/types';
import { getScoreColor, getStatusColor } from '@/lib/leadUtils';
import { COMMON_STYLES } from '@/lib/constants';

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onRowClick }) => {
  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[900px]">
          <TableHeader>
            <TableRow className={COMMON_STYLES.table.header}>
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
                className={COMMON_STYLES.table.row}
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
