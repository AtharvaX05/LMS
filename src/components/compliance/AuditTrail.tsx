import React from 'react';

const AuditTrail: React.FC = () => {
  const events = [
    { id: 1, action: 'Loan Approved', date: '2024-01-10', user: 'Officer' },
    { id: 2, action: 'Document Uploaded', date: '2024-01-09', user: 'System' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Audit Trail</h3>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex justify-between p-3 border border-gray-200 rounded text-sm">
            <span className="text-gray-700">{event.action}</span>
            <span className="text-gray-500">{event.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditTrail;
