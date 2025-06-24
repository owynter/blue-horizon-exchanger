import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  href?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  status,
  href
}) => {
  return (
    <div
      className={`
        relative bg-white border border-gray-200 rounded-xl p-6 
        transition-all duration-150 cubic-bezier(0.4, 0, 0.2, 1)
        hover:shadow-sm hover:-translate-y-0.5
        ${status === 'available' ? 'cursor-pointer' : ''}
      `}
    >
      {/* Icon Box */}
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900 mb-3 font-inter leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-normal font-inter mb-6">
        {description}
      </p>

      {/* Action Button */}
      {status === 'available' && href ? (
        <Link to={href} className="block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 font-inter transition-colors duration-150">
            Try Now
          </Button>
        </Link>
      ) : (
        <Button disabled className="w-full font-inter text-sm py-2.5 bg-gray-100 text-gray-400 cursor-not-allowed">
          Coming Soon
        </Button>
      )}

      {/* Status Badge */}
      {status === 'available' && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full font-inter shadow-sm">
          Live
        </div>
      )}
    </div>
  );
};

export default FeatureCard; 