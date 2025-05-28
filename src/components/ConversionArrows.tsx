
import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const ConversionArrows: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full max-w-[100px] mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-center w-16 h-16">
        <ArrowRightLeft className="text-blue-600" size={20} />
      </div>
    </div>
  );
};

export default ConversionArrows;
