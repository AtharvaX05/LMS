import React from 'react';

const GovernanceControls: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Governance Controls</h3>
      <div className="space-y-3">
        <div className="p-3 border border-gray-200 rounded">
          <p className="font-medium text-gray-800">Access Control</p>
          <p className="text-xs text-gray-500 mt-1">Role-based access enabled</p>
        </div>
        <div className="p-3 border border-gray-200 rounded">
          <p className="font-medium text-gray-800">Data Encryption</p>
          <p className="text-xs text-gray-500 mt-1">AES-256 encryption active</p>
        </div>
        <div className="p-3 border border-gray-200 rounded">
          <p className="font-medium text-gray-800">Audit Logging</p>
          <p className="text-xs text-gray-500 mt-1">All activities logged</p>
        </div>
      </div>
    </div>
  );
};

export default GovernanceControls;
