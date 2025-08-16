import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LeadUpdateFormData } from '@/schemas/leads';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, TrendingUp, AlertCircle } from 'lucide-react';
import { LeadStatus } from '@/types/enums';

const EditFields: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<LeadUpdateFormData>();

  const watchedStatus = watch('status');

  return (
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
        <Select value={watchedStatus} onValueChange={(value) => setValue('status', value as LeadStatus)}>
          <SelectTrigger id="status" className="bg-gray-800/50 border-gray-600 text-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value={LeadStatus.NEW} className="hover:bg-gray-700 text-white">{LeadStatus.NEW}</SelectItem>
            <SelectItem value={LeadStatus.CONTACTED} className="hover:bg-gray-700 text-white">{LeadStatus.CONTACTED}</SelectItem>
            <SelectItem value={LeadStatus.QUALIFIED} className="hover:bg-gray-700 text-white">{LeadStatus.QUALIFIED}</SelectItem>
            <SelectItem value={LeadStatus.DISQUALIFIED} className="hover:bg-gray-700 text-white">{LeadStatus.DISQUALIFIED}</SelectItem>
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
  );
};

export default EditFields;
