import React from 'react';

interface RiskChipProps {
  level: 'Stable' | 'Monitor' | 'At Risk';
  label?: string;
}

const RiskChip: React.FC<RiskChipProps> = ({ level, label }) => {
  const colorMap = {
    Stable: 'bg-green-100 text-green-800 border-green-300',
    Monitor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'At Risk': 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorMap[level]}`}>
      {label || level}
    </span>
  );
};

export default RiskChip;
