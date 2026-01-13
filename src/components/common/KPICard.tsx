import React from 'react';
import { cn } from '../../utils/cn';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const KPICard = ({ 
  title, 
  value, 
  trend = 'neutral',
  icon = '',
  size = 'md',
  className = ''
}: KPICardProps) => {
  const sizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];

  const trendClass = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }[trend];

  return (
    <div className={`rounded-lg shadow-md overflow-hidden border border-gray-100 ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold text-gray-700 ${sizeClass}`}>
            {title}
          </h3>
          <div className="text-xs text-gray-500">
            {trend !== 'neutral' && <span className={`inline-block mr-1 ${trendClass}`}>▲ {trend === 'up' ? '+' : '-'}</span>}
            {icon && <span className={`icon ${icon} text-gray-400`}></span>}
          </div>
        </div>
        
        <div className="flex items-baseline">
          <span className={`text-2xl font-bold text-gray-800 ${sizeClass}`}>
            {value}
          </span>
          
          {trend !== 'neutral' && (
            <span className="ml-2 text-sm text-gray-500">
              {trend === 'up' ? '+2.3%' : '-1.7%'}
            </span>
          )}
        </div>
      </div>
      
      {trend !== 'neutral' && (
        <div className="h-1 bg-gray-100 px-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {trend === 'up' ? 'Improving' : 'Declining'}
            </div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICard;