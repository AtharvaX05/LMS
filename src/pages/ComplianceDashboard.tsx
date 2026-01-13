import React, { useState } from 'react';

const ComplianceDashboard: React.FC = () => {
  const [auditTrail, setAuditTrail] = useState([
    {
      id: 1,
      action: 'Loan Approved',
      user: 'officer@bank.com',
      timestamp: '2024-01-13 10:30 AM',
      details: 'Loan L-112-789 approved for $15,000',
    },
    {
      id: 2,
      action: 'Document Updated',
      user: 'borrower@email.com',
      timestamp: '2024-01-13 09:15 AM',
      details: 'Income verification document uploaded',
    },
    {
      id: 3,
      action: 'Risk Assessment',
      user: 'system',
      timestamp: '2024-01-13 08:00 AM',
      details: 'Automated risk evaluation completed',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">LSFI Platform</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">Role: Compliance</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Compliance Dashboard</h2>
              <p className="text-gray-500">Audit trail and governance controls</p>
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Audit Trail</h2>
              <div className="space-y-4">
                {auditTrail.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{entry.action}</h3>
                        <p className="text-sm text-gray-600 mt-1">{entry.details}</p>
                        <p className="text-xs text-gray-500 mt-2">By: {entry.user}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{entry.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Controls */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Governance Controls</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Regulatory Compliance</h3>
                  <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Compliant</span></p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Data Security</h3>
                  <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Protected</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
