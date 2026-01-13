import React, { useState, useEffect } from 'react';
import { useLSFI } from '../../hooks/useLSFI';
import { useBankDashboardData } from '../../services/loanService';
import PortfolioHeatmap from './PortfolioHeatmap';
import ScenarioTester from './ScenarioTester';
import ApprovalWorkflow from './ApprovalWorkflow';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthContext';

const BankDashboard = () => {
  const { lsfiScore, lsfiStatus, lsfiFactors, updateLSFI } = useLSFI();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { 
    loans,
    totalLoans,
    atRiskCount,
    monitorCount,
    stableCount,
    loading,
    error
  } = useBankDashboardData();
  
  // Simulate data for demo
  const [portfolioData, setPortfolioData] = useState({
    totalLoans: 1520,
    atRiskCount: 23,
    monitorCount: 84,
    stableCount: 1413,
    heatmapData: [
      { riskLevel: 'Stable', count: 1413, color: '#4CAF50' },
      { riskLevel: 'Monitor', count: 84, color: '#FFB400' },
      { riskLevel: 'At Risk', count: 23, color: '#FF0000' }
    ],
    scenarios: [
      { id: 'scenario-1', name: 'Interest Rate Change', description: 'Scenario analysis for 0.5% interest increase' },
      { id: 'scenario-2', name: 'Tenure Extension', description: 'Effect of extending loan tenure by 1 year' },
      { id: 'scenario-3', name: 'Payment Delinquency', description: 'Impact of 30-day payment delay' }
    ],
    approvalQueue: [
      { id: 'approval-1', loanId: 'L-112-789', status: 'Pending', amount: 15000, days: 2 },
      { id: 'approval-2', loanId: 'L-345-678', status: 'Pending', amount: 25000, days: 3 },
      { id: 'approval-3', loanId: 'L-223-456', status: 'Pending', amount: 18000, days: 1 }
    ]
  });

  const handleInterestRateChange = (newRate: number) => {
    const updated = {
      ...portfolioData,
      scenarios: portfolioData.scenarios.map(scenario => 
        scenario.id === 'scenario-1' ? { ...scenario, results: `Increased interest rate: ${newRate}%` } : scenario
      )
    };
    setPortfolioData(updated);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Loan Stability & Fairness Platform</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">Role: Bank Officer</span>
              <button 
                onClick={handleLogout}
                className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="pt-6">
          {/* Portfolio Overview */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Portfolio Health Overview</h2>
              <p className="text-gray-500">Real-time monitoring of your loan portfolio</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Loans</h3>
                  <p className="text-3xl font-bold text-gray-900">{portfolioData.totalLoans}</p>
                  <p className="mt-2 text-sm text-gray-500">All active loans in portfolio</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Risk Distribution</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">At Risk</div>
                    <div className="text-sm text-red-600 font-semibold">{portfolioData.atRiskCount}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(portfolioData.atRiskCount / portfolioData.totalLoans) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Portfolio Heatmap */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Portfolio Risk Heatmap</h2>
              <PortfolioHeatmap 
                stableCount={stableCount} 
                monitorCount={monitorCount} 
                atRiskCount={atRiskCount} 
              />
            </div>
            
            {/* Scenario Testing */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Scenario Testing</h2>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="inline-block mr-2 text-gray-500">Interest Rate Change:</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="10"
                    step="0.5"
                    value={5}
                    onChange={(e) => handleInterestRateChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full cursor-pointer"
                  />
                  <span className="ml-2 text-gray-500">{5}%</span>
                </div>
                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">This scenario analysis shows how a <strong>0.5% increase</strong> in interest rates would affect your portfolio:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li className="text-gray-600">- Potential increase in risk by 3.2%</li>
                    <li className="text-gray-600">- Estimated impact on LSFI: -4.8 points</li>
                    <li className="text-gray-600">- Recommendation: Review 15% of high-risk loans</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Scenario Results</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium">Risk Level Change</div>
                      <div className="text-3xl font-bold text-red-600">+3.2%</div>
                    </div>
                    <div>
                      <div className="font-medium">LSFI Impact</div>
                      <div className="text-3xl font-bold text-red-600">-4.8 points</div>
                    </div>
                    <div>
                      <div className="font-medium">Critical Loans</div>
                      <div className="text-3xl font-bold text-red-600">15%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Approval Workflow */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Approvals</h2>
              <div className="mb-4">
                <p className="text-gray-500">13 pending approvals for loans requiring attention</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-3">
                  {portfolioData.approvalQueue.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {item.loanId.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.loanId}</h4>
                        <p className="text-gray-500 mt-1">Amount: ${item.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-yellow-700">Pending</span>
                        <span className="text-gray-400 ml-1">• {item.days} days</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;