import React from 'react';

interface PortfolioHeatmapProps {
  stableCount: number;
  monitorCount: number;
  atRiskCount: number;
}

const PortfolioHeatmap: React.FC<PortfolioHeatmapProps> = ({ stableCount, monitorCount, atRiskCount }) => {
  const total = stableCount + monitorCount + atRiskCount;
  const stablePercent = (stableCount / total) * 100;
  const monitorPercent = (monitorCount / total) * 100;
  const atRiskPercent = (atRiskCount / total) * 100;

  return (
    <div className="space-y-4">
      {/* Stable */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Stable</span>
          <span className="text-sm text-gray-600">{stableCount} loans ({stablePercent.toFixed(1)}%)</span>
        </div>
        <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
          <div className="h-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${stablePercent}%` }}>
            {stablePercent > 10 && stablePercent.toFixed(0) + '%'}
          </div>
        </div>
      </div>

      {/* Monitor */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Monitor</span>
          <span className="text-sm text-gray-600">{monitorCount} loans ({monitorPercent.toFixed(1)}%)</span>
        </div>
        <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
          <div className="h-full bg-yellow-400 flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${monitorPercent}%` }}>
            {monitorPercent > 10 && monitorPercent.toFixed(0) + '%'}
          </div>
        </div>
      </div>

      {/* At Risk */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">At Risk</span>
          <span className="text-sm text-gray-600">{atRiskCount} loans ({atRiskPercent.toFixed(1)}%)</span>
        </div>
        <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
          <div className="h-full bg-red-500 flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${atRiskPercent}%` }}>
            {atRiskPercent > 10 && atRiskPercent.toFixed(0) + '%'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeatmap;
