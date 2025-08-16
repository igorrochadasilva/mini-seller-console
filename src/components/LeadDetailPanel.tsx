import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Lead, LeadDetailPanelProps } from '@/types';
import { useLeadsStore } from '@/stores/leadsStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Save, User, Building, Mail, TrendingUp, AlertCircle, Zap } from 'lucide-react';

// Zod schema for form validation
const leadUpdateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Disqualified'], {
    required_error: 'Please select a status',
  }),
});

type LeadUpdateFormData = z.infer<typeof leadUpdateSchema>;

const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, onClose, onSave, onConvertToOpportunity }) => {
  const { updateLead } = useLeadsStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LeadUpdateFormData>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      email: lead.email,
      status: lead.status,
    },
  });

  const watchedStatus = watch('status');

  const onSubmit = async (data: LeadUpdateFormData) => {
    try {
      // Update lead in Zustand store
      updateLead(lead.id, {
        email: data.email,
        status: data.status,
      });

      // Call parent onSave callback
      onSave({ ...lead, email: data.email, status: data.status });
      
      // Show success toast
      toast.success('Lead updated successfully!', {
        description: `Updated ${lead.name}'s information`,
      });
      
      // Close panel
      onClose();
    } catch (error) {
      // Show error toast
      toast.error('Failed to update lead', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  const handleConvertToOpportunity = () => {
    onConvertToOpportunity(lead);
    onClose();
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
                {...register('email')}
                className={`bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Status Field */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Status
              </Label>
              <Select value={watchedStatus} onValueChange={(value) => setValue('status', value as any)}>
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
              {errors.status && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Convert to Opportunity Button */}
          <div className="pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleConvertToOpportunity}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Convert to Opportunity
            </Button>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadDetailPanel;

