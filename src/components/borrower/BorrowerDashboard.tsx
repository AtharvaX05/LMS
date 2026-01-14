import React, { useState } from 'react';
import { useLSFI } from '../../hooks/useLSFI';
import { useAuthContext } from '../../store/AuthContext';
import LSFIGauge from '../common/LSFIGauge';
import KPICard from '../common/KPICard';
import DocumentUpload from './DocumentUpload';
import LoanOverview from './LoanOverview';
import Documents from './Documents';
import Repayment from './Repayment';
import RiskAnalysis from './RiskAnalysis';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';


const BorrowerDashboard = () => {
  const { logout, user } = useAuthContext();
  const { lsfiScore, lsfiStatus, profileCompleted } = useLSFI(user?.profile_completed ?? false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [loanData] = useState({
    id: 'L-112-789',
    amount: 15000,
    interestRate: 7.5,
    tenure: '36 months',
    status: 'On Track',
    riskAlerts: ['Missed Payment: 1']
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Show empty state for new users who haven't completed their profile
  if (!profileCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-800">LSFI Platform</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.first_name} {user?.last_name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                  <p className="text-xs text-gray-500">
                    Status: {user?.verification_status === 'pending' ? '⏳ Pending Verification' : '✓ Verified'}
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded px-4 py-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="max-w-2xl mx-auto py-16 text-center">
            <div className="bg-white rounded-lg shadow-md p-12">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
              <p className="text-gray-600 mb-6">
                Your LSFI (Loan Stability & Fairness Index) score will appear here once you complete your profile and provide financial details.
              </p>
              {user?.id && (
                <DocumentUpload userId={user.id} token={localStorage.getItem('token') || ''} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="LSFI Logo" className="h-12 w-12" />
            <div> 
              <h1 className="text-xl font-bold text-gray-800">LSFI Platform</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.first_name} {user?.last_name}</p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                <p className="text-xs text-gray-500">
                  Status: {user?.verification_status === 'pending' ? '⏳ Pending Verification' : '✓ Verified'}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded px-4 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="py-4 border-b border-gray-200 bg-white">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'text-[#003D82] border-[#003D82]'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 font-medium border-b-2 ${
                activeTab === 'documents'
                  ? 'text-[#003D82] border-[#003D82]'
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Document Verification
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="pt-6">
          {activeTab === 'overview' ? (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Loan Stability & Fairness Index</h2>
              <p className="text-gray-500 mb-8">Real-time monitoring of your loan health</p>
              
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-semibold text-gray-700">Loan Summary</h3>
                    <p className="text-gray-500 mt-1">Your current loan details</p>
                  </div>
                  <div className="md:w-2/3">
                    <LSFIGauge 
                      score={lsfiScore}
                      status={lsfiStatus}
                      size="large"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <KPICard title="Loan Amount" value={`$${loanData.amount.toLocaleString()}`} />
                  <KPICard title="Interest Rate" value={`${loanData.interestRate}%`} />
                  <KPICard title="Tenure" value={loanData.tenure} />
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">Loan Status</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {loanData.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Your loan is performing well. Continue with regular payments.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveTab('documents')}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <p className="font-medium text-blue-600">📄 Verify Documents</p>
                    <p className="text-xs text-gray-500 mt-1">Upload and verify your documents</p>
                  </button>
                  <button 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <p className="font-medium text-blue-600">📊 Repayment Schedule</p>
                    <p className="text-xs text-gray-500 mt-1">View your payment schedule</p>
                  </button>
                </div>
              </div>

              {/* Additional sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <LoanOverview />
                <RiskAnalysis />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Documents />
                <Repayment />
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto pb-8">
              {user && (
                <DocumentUpload userId={user.id} token={localStorage.getItem('token') || ''} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;