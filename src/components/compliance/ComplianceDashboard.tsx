import React from 'react';

const ComplianceDashboardComponent: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Status</h3>
      <div className="space-y-2">
        <div className="flex justify-between p-3 border border-gray-200 rounded">
          <span className="text-gray-700">Regulatory Compliance</span>
          <span className="text-green-600 font-medium">✓ Compliant</span>
        </div>
        <div className="flex justify-between p-3 border border-gray-200 rounded">
          <span className="text-gray-700">Data Security</span>
          <span className="text-green-600 font-medium">✓ Protected</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboardComponent;
