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
        relative text-gray-500 p-10 border-2 border-slate-100 border-solid rounded-2xl
        transition-all duration-150 cubic-bezier(0.4, 0, 0.2, 1)
        hover:shadow-sm hover:-translate-y-0.5
        ${status === 'available' ? 'cursor-pointer' : ''}
      `}
    >
      {/* Icon - No background box */}
      <div className="mb-8">
        <div className="w-12 h-12 text-blue-600">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-gray-900 text-[1.38rem] leading-7 font-bold mb-4 font-sora">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-base leading-relaxed font-inter mb-6">
        {description}
      </p>

      {/* Action Button */}
      {status === 'available' && href ? (
        <Link to={href} className="block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-base py-3 font-inter transition-colors duration-150">
            Try Now
          </Button>
        </Link>
      ) : (
        <Button disabled className="w-full font-inter text-base py-3 bg-gray-100 text-gray-400 cursor-not-allowed">
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