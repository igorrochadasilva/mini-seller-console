import React, { useState } from 'react';
import { Lead, LeadDetailPanelProps } from '@/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Save, User, Building, Mail, TrendingUp, AlertCircle, Zap } from 'lucide-react';

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, onClose, onSave, onConvertToOpportunity }) => {
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

  const handleConvertToOpportunity = () => {
    onConvertToOpportunity(lead);
    onClose();
  };

  const validateEmail = (email: string) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  const clearError = () => {
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-gray-900 w-full max-w-md h-full overflow-y-auto border-l border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-xl font-bold text-white">Edit Lead</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Lead Info Display */}
          <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Lead Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-blue-400" />
                <div>
                  <Label className="text-xs text-gray-400">Name</Label>
                  <p className="text-white font-medium">{lead.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-green-400" />
                <div>
                  <Label className="text-xs text-gray-400">Company</Label>
                  <p className="text-white font-medium">{lead.company}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <div>
                  <Label className="text-xs text-gray-400">Score</Label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    lead.score >= 80 ? 'bg-green-900/30 text-green-400' :
                    lead.score >= 60 ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {lead.score}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Edit Fields</h3>
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            {/* Status Field */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="New" className="hover:bg-gray-700 text-white">New</SelectItem>
                  <SelectItem value="Contacted" className="hover:bg-gray-700 text-white">Contacted</SelectItem>
                  <SelectItem value="Qualified" className="hover:bg-gray-700 text-white">Qualified</SelectItem>
                  <SelectItem value="Disqualified" className="hover:bg-gray-700 text-white">Disqualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Convert to Opportunity Button */}
          <div className="pt-4 border-t border-gray-700">
            <Button
              variant="default"
              size="lg"
              onClick={handleConvertToOpportunity}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Convert to Opportunity
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-700 bg-gray-800/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPanel;

