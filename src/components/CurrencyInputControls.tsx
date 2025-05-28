
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { X, GripVertical } from 'lucide-react';

interface CurrencyInputControlsProps {
  isBase: boolean;
  onRemove?: () => void;
  dragHandleProps?: any;
}

const CurrencyInputControls: React.FC<CurrencyInputControlsProps> = ({
  isBase,
  onRemove,
  dragHandleProps
}) => {
  return (
    <>
      {/* Drag Handle - only for non-base currencies */}
      {!isBase && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div {...dragHandleProps} className="cursor-move text-blue-400 hover:text-blue-600 flex-shrink-0">
              <GripVertical size={20} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-inter">Drag to reorder currencies</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
};

export default CurrencyInputControls;
