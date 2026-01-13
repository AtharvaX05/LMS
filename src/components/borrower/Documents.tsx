import React from 'react';

const Documents: React.FC = () => {
  const documents = [
    { id: 1, name: 'Income Verification', status: 'Approved', date: '2024-01-10' },
    { id: 2, name: 'Identity Proof', status: 'Approved', date: '2024-01-09' },
    { id: 3, name: 'Address Proof', status: 'Pending', date: '2024-01-12' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
            <div>
              <p className="font-medium text-gray-800">{doc.name}</p>
              <p className="text-xs text-gray-500">{doc.date}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                doc.status === 'Approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
