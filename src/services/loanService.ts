import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoanData {
  id: string;
  amount: number;
  interestRate: number;
  tenure: string;
  status: 'On Track' | 'Attention Required' | 'At Risk';
  riskAlerts: string[];
}

interface LSFIFactors {
  affordabilityResilience: number;
  loanStructuralFairness: number;
  servicingIntegrity: number;
  paymentMomentum: number;
  externalStressSensitivity: number;
}

interface LSFI {
  score: number;
  status: 'Stable' | 'Monitor' | 'At Risk';
  factors: LSFIFactors;
}

interface BankDashboardData {
  loans: LoanData[];
  totalLoans: number;
  atRiskCount: number;
  monitorCount: number;
  stableCount: number;
  heatmapData: {
    riskLevel: string;
    count: number;
    color: string;
  }[];
  scenarios: {
    id: string;
    name: string;
    description: string;
    results?: string;
  }[];
  approvalQueue: {
    id: string;
    loanId: string;
    status: string;
    amount: number;
    days: number;
  }[];
}

const useBankDashboardData = () => {
  const [data, setData] = useState<BankDashboardData>({
    loans: [],
    totalLoans: 0,
    atRiskCount: 0,
    monitorCount: 0,
    stableCount: 0,
    heatmapData: [],
    scenarios: [],
    approvalQueue: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      setError('Please log in');
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock data
        const mockData: BankDashboardData = {
          loans: generateMockLoans(1500),
          totalLoans: 1500,
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
          approvalQueue: generateMockApprovals(13)
        };
        
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated]);
  
  return {
    ...data,
    loading,
    error
  };
};

// Utility functions for mock data generation
const generateMockLoans = (count: number): LoanData[] => {
  const loans: LoanData[] = [];
  const loanTypes = ['Personal', 'Business', 'Auto', 'Home'];
  
  for (let i = 0; i < count; i++) {
    const loanType = loanTypes[Math.floor(Math.random() * loanTypes.length)];
    const amount = Math.floor(5000 + Math.random() * 150000);
    const interestRate = Math.round(Math.random() * 8) + 3;
    const tenure = `${Math.floor(Math.random() * 4 + 24)} months`;
    
    // Determine status based on random probability
    const riskLevel = Math.random();
    const status: 'On Track' | 'Attention Required' | 'At Risk' = 
      riskLevel < 0.05 ? 'At Risk' :
      riskLevel < 0.15 ? 'Attention Required' :
      'On Track';
    
    const riskAlerts = [];
    if (status === 'At Risk') {
      riskAlerts.push('Missed Payment: 2');
      riskAlerts.push('Document Missing: Income Verification');
    } else if (status === 'Attention Required') {
      riskAlerts.push('Missed Payment: 1');
    }
    
    loans.push({
      id: `L-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
      amount,
      interestRate,
      tenure,
      status,
      riskAlerts
    });
  }
  
  return loans;
};

const generateMockApprovals = (count: number): { 
  id: string; 
  loanId: string; 
  status: string; 
  amount: number; 
  days: number 
}[] => {
  const approvals: any[] = [];
  
  for (let i = 0; i < count; i++) {
    approvals.push({
      id: `approval-${Math.random().toString(36).substr(2, 5)}`,
      loanId: `L-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
      status: 'Pending',
      amount: Math.floor(5000 + Math.random() * 150000),
      days: Math.floor(Math.random() * 15) + 1
    });
  }
  
  return approvals;
};

export { useBankDashboardData };