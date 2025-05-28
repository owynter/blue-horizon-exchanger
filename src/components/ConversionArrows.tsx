
import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const ConversionArrows: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-center">
        <ArrowRightLeft className="text-blue-600" size={24} />
      </div>
    </div>
  );
};

export default ConversionArrows;
