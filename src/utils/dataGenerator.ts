import { v4 as uuidv4 } from 'uuid';

export const generateLoanData = (count: number): { [key: string]: any }[] => {
  const loanData: { [key: string]: any }[] = [];
  const riskLevels = ['Stable', 'Monitor', 'At Risk'];
  const statuses = ['On Track', 'Attention Required', 'At Risk'];
  
  for (let i = 0; i < count; i++) {
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const riskAlerts: string[] = [];
    
    // Add risk alerts based on status
    if (riskLevel === 'At Risk') {
      riskAlerts.push('Missed Payment: 2');
      riskAlerts.push('Document Missing: Income Verification');
    } else if (riskLevel === 'Monitor') {
      riskAlerts.push('Missed Payment: 1');
    }
    
    const data = {
      id: `L-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
      loanId: `L-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
      amount: Math.floor(5000 + Math.random() * 150000),
      interestRate: Math.round(Math.random() * 8) + 3,
      tenure: `${Math.floor(Math.random() * 4 + 24)} months`,
      riskLevel,
      status,
      riskAlerts,
      lsfiScore: 0,
      lsfiFactors: {
        affordabilityResilience: 0,
        loanStructuralFairness: 0,
        servicingIntegrity: 0,
        paymentMomentum: 0,
        externalStressSensitivity: 0
      }
    };

    // Generate random LSFI factors
    data.lsfiFactors = {
      affordabilityResilience: Math.floor(50 + Math.random() * 50),
      loanStructuralFairness: Math.floor(50 + Math.random() * 50),
      servicingIntegrity: Math.floor(50 + Math.random() * 50),
      paymentMomentum: Math.floor(50 + Math.random() * 50),
      externalStressSensitivity: Math.floor(50 + Math.random() * 50)
    };
    
    // Calculate LSFI score
    data.lsfiScore = calculateLSFI(data.lsfiFactors);
    
    loanData.push(data);
  }
  
  return loanData;
};

export const generateBankDashboardData = (count: number) => {
  const atRiskCount = Math.floor(count * 0.015);
  const monitorCount = Math.floor(count * 0.055);
  const stableCount = count - (atRiskCount + monitorCount);
  
  const mockData = {
    totalLoans: count,
    atRiskCount,
    monitorCount,
    stableCount,
    heatmapData: [
      { riskLevel: 'Stable', count: stableCount, color: '#4CAF50' },
      { riskLevel: 'Monitor', count: monitorCount, color: '#FFB400' },
      { riskLevel: 'At Risk', count: atRiskCount, color: '#FF0000' }
    ],
    scenarios: [
      { id: 'scenario-1', name: 'Interest Rate Change', description: 'Scenario analysis for 0.5% interest increase' },
      { id: 'scenario-2', name: 'Tenure Extension', description: 'Effect of extending loan tenure by 1 year' },
      { id: 'scenario-3', name: 'Payment Delinquency', description: 'Impact of 30-day payment delay' }
    ],
    approvalQueue: generateMockApprovals(10)
  };
  
  return mockData;
};

export const generateMockApprovals = (count: number): { 
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

// LSFI calculation logic
export const calculateLSFI = (factors: { 
  affordabilityResilience: number; 
  loanStructuralFairness: number; 
  servicingIntegrity: number; 
  paymentMomentum: number; 
  externalStressSensitivity: number 
}) => {
  return Math.round(
    (factors.affordabilityResilience * 0.3) +
    (factors.loanStructuralFairness * 0.2) +
    (factors.servicingIntegrity * 0.2) +
    (factors.paymentMomentum * 0.2) +
    (factors.externalStressSensitivity * 0.1)
  );
};