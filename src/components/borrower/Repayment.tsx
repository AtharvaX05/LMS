import React from 'react';

const Repayment: React.FC = () => {
  const schedule = [
    { month: 'Month 1', amount: 450, status: 'Paid' },
    { month: 'Month 2', amount: 450, status: 'Paid' },
    { month: 'Month 3', amount: 450, status: 'Upcoming' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Repayment Schedule</h3>
      <div className="space-y-2">
        {schedule.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded">
            <div>
              <p className="font-medium text-gray-800">{item.month}</p>
              <p className="text-sm text-gray-600">${item.amount}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                item.status === 'Paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repayment;
