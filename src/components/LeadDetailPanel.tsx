import React, { useState } from 'react';

interface LeadDetailPanelProps {
  lead: {
    id: string;
    name: string;
    company: string;
    email: string;
    source: string;
    score: number;
    status: string;
  };
  onClose: () => void;
  onSave: (updatedLead: any) => void;
}

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, onClose, onSave }) => {
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState(lead.status);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    onSave({ ...lead, email, status });
    onClose();
  };

  const validateEmail = (email: string) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end">
      <div className="bg-white w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPanel;

