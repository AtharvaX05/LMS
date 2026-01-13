import React, { useState, useEffect } from 'react';

interface LSFIGaugeProps {
  score: number;
  status?: 'Stable' | 'Monitor' | 'At Risk';
  size?: 'small' | 'medium' | 'large';
}

const LSFIGauge = ({ score, status = 'Stable', size = 'medium' }: LSFIGaugeProps) => {
  const statusColors = {
    Stable: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
    Monitor: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
    'At Risk': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  };

  const gaugeSize = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64',
  }[size];

  const colors = statusColors[status] || statusColors['Stable'];

  return (
    <div className={`relative ${gaugeSize} mx-auto`}>
      {/* Outer circle */}
      <div className={`absolute inset-0 rounded-full border-8 border-gray-200 flex items-center justify-center`}>
        {/* Inner circle with gradient */}
        <div className={`absolute inset-4 rounded-full ${colors.bg} flex items-center justify-center`}>
          {/* Score display */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-800">{score}</div>
            <div className="text-xs text-gray-600">/ 100</div>
          </div>
        </div>

        {/* Outer ring showing progress */}
        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="2" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={
              status === 'Stable'
                ? '#10b981'
                : status === 'Monitor'
                ? '#f59e0b'
                : '#ef4444'
            }
            strokeWidth="2"
            strokeDasharray={`${(score / 100) * 282.7} 282.7`}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Status badge */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default LSFIGauge;