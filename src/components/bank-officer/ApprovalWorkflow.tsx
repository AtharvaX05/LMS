import React from 'react';

interface ApprovalWorkflowProps {
  approvals?: Array<{
    id: string;
    loanId: string;
    status: string;
    amount: number;
    days: number;
  }>;
}

const ApprovalWorkflow: React.FC<ApprovalWorkflowProps> = ({
  approvals = [
    { id: 'approval-1', loanId: 'L-112-789', status: 'Pending', amount: 15000, days: 2 },
    { id: 'approval-2', loanId: 'L-345-678', status: 'Pending', amount: 25000, days: 3 },
  ],
}) => {
  const handleApprove = (id: string) => {
    console.log('Approved:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejected:', id);
  };

  return (
    <div className="space-y-3">
      {approvals.map((approval) => (
        <div
          key={approval.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div>
            <h4 className="font-semibold text-gray-800">{approval.loanId}</h4>
            <p className="text-sm text-gray-500">Amount: ${approval.amount.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Pending: {approval.days} day(s)</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleApprove(approval.id)}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(approval.id)}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalWorkflow;
