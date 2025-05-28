
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X } from 'lucide-react';

interface CurrencyRemoveButtonProps {
  isBase: boolean;
  onRemove?: () => void;
}

const CurrencyRemoveButton: React.FC<CurrencyRemoveButtonProps> = ({
  isBase,
  onRemove
}) => {
  if (isBase || !onRemove) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-auto flex-shrink-0"
        >
          <X size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-inter">Remove this currency</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CurrencyRemoveButton;
