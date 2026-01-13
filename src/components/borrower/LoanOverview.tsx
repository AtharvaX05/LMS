import React from 'react';

const LoanOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Overview</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Loan ID:</span>
          <span className="font-medium">L-112-789</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">$15,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Interest Rate:</span>
          <span className="font-medium">7.5%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tenure:</span>
          <span className="font-medium">36 months</span>
        </div>
      </div>
    </div>
  );
};

export default LoanOverview;
