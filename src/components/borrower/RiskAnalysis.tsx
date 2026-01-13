import React from 'react';

const RiskAnalysis: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Analysis</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 mb-1">Payment Momentum</p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">85/100</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Affordability Resilience</p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '88%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">88/100</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Servicing Integrity</p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">92/100</p>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
