import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TypographyH3, TypographyP } from '@/components/ui/typograph';
import { OpportunityCreateFormData } from '@/schemas/opportunities';
import { OpportunityStage } from '@/types/enums';

const OpportunityForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<OpportunityCreateFormData>();

  const watchedStage = watch('stage');

  return (
    <div className="space-y-5">
      <TypographyH3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
        Opportunity Details
      </TypographyH3>

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300 text-sm font-medium">
          Opportunity Name
        </Label>
        <Input
          id="name"
          {...register('name')}
          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter opportunity name"
        />
        {errors.name && (
          <TypographyP className="text-red-400 text-sm">
            {errors.name.message}
          </TypographyP>
        )}
      </div>

      {/* Stage Field */}
      <div className="space-y-2">
        <Label htmlFor="stage" className="text-gray-300 text-sm font-medium">
          Stage
        </Label>
        <Select
          value={watchedStage}
          onValueChange={value => setValue('stage', value as OpportunityStage)}
        >
          <SelectTrigger
            id="stage"
            className="bg-gray-800/50 border-gray-600 text-white"
          >
            <SelectValue placeholder="Select stage" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem
              value={OpportunityStage.PROSPECTING}
              className="hover:bg-gray-700 text-white"
            >
              {OpportunityStage.PROSPECTING}
            </SelectItem>
            <SelectItem
              value={OpportunityStage.QUALIFICATION}
              className="hover:bg-gray-700 text-white"
            >
              {OpportunityStage.QUALIFICATION}
            </SelectItem>
            <SelectItem
              value={OpportunityStage.PROPOSAL}
              className="hover:bg-gray-700 text-white"
            >
              {OpportunityStage.PROPOSAL}
            </SelectItem>
            <SelectItem
              value={OpportunityStage.NEGOTIATION}
              className="hover:bg-gray-700 text-white"
            >
              {OpportunityStage.NEGOTIATION}
            </SelectItem>
            <SelectItem
              value={OpportunityStage.CLOSED_WON}
              className="hover:bg-gray-700 text-white"
            >
              {OpportunityStage.CLOSED_WON}
            </SelectItem>
            <SelectItem
              value={OpportunityStage.CLOSED_LOST}
              className="hover:bg-gray-700 text-white"
            >
              {OpportunityStage.CLOSED_LOST}
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.stage && (
          <TypographyP className="text-red-400 text-sm">
            {errors.stage.message}
          </TypographyP>
        )}
      </div>

      {/* Amount Field */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-gray-300 text-sm font-medium">
          Amount (Optional)
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          {...register('amount', { valueAsNumber: true })}
          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter amount"
        />
        {errors.amount && (
          <TypographyP className="text-red-400 text-sm">
            {errors.amount.message}
          </TypographyP>
        )}
      </div>

      {/* Account Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300 text-sm font-medium">
          Account Name
        </Label>
        <Input
          id="accountName"
          {...register('accountName')}
          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter account name"
        />
        {errors.accountName && (
          <TypographyP className="text-red-400 text-sm">
            {errors.accountName.message}
          </TypographyP>
        )}
      </div>
    </div>
  );
};

export { OpportunityForm };
