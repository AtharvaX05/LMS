//lsfiService.ts - Fixed to return consistent data
import apiClient from './api';

interface LSFIData {
  score: number;
  status: 'Stable' | 'Monitor' | 'At Risk';
  factors: {
    affordabilityResilience: number;
    loanStructuralFairness: number;
    servicingIntegrity: number;
    paymentMomentum: number;
    externalStressSensitivity: number;
  };
}

// FIXED: Use fixed values instead of Math.random()
const FIXED_MOCK_DATA: LSFIData = {
  score: 85,
  status: 'Stable',
  factors: {
    affordabilityResilience: 88,
    loanStructuralFairness: 75,
    servicingIntegrity: 92,
    paymentMomentum: 85,
    externalStressSensitivity: 65,
  },
};

// Generate consistent mock LSFI data
const generateMockLSFIData = (): LSFIData => {
  // Return the same fixed data every time
  return { ...FIXED_MOCK_DATA };
};

export const calculateLSFI = (factors: {
  affordabilityResilience: number;
  loanStructuralFairness: number;
  servicingIntegrity: number;
  paymentMomentum: number;
  externalStressSensitivity: number;
}): number => {
  return Math.round(
    factors.affordabilityResilience * 0.3 +
      factors.loanStructuralFairness * 0.2 +
      factors.servicingIntegrity * 0.2 +
      factors.paymentMomentum * 0.2 +
      factors.externalStressSensitivity * 0.1
  );
};

export const getLSFIData = async (): Promise<LSFIData> => {
  try {
    // Try to fetch from API first
    const response = await apiClient.get('/lsfi/score');
    
    // Map the database response to the expected format
    const data = response.data;
    return {
      score: data.score || 85,
      status: data.status || 'Stable',
      factors: {
        affordabilityResilience: data.debt_to_income || 88,
        loanStructuralFairness: data.loan_diversity || 75,
        servicingIntegrity: data.payment_history || 92,
        paymentMomentum: data.income_stability || 85,
        externalStressSensitivity: data.credit_utilization || 65,
      },
    };
  } catch (error) {
    console.log('API not available, using fixed mock LSFI data');
    // Return consistent mock data instead of random values
    return generateMockLSFIData();
  }
};

export const updateLSFIFactors = async (
  factors: LSFIData['factors']
): Promise<LSFIData> => {
  try {
    const response = await apiClient.post('/lsfi/update', { factors });
    return response.data;
  } catch (error) {
    console.log('Using mock update');
    const score = calculateLSFI(factors);
    const status = score >= 80 ? 'Stable' : score >= 70 ? 'Monitor' : 'At Risk';
    return {
      score,
      status,
      factors,
    };
  }
};

// Optional: Add a function to manually trigger recalculation
export const recalculateLSFI = async (): Promise<LSFIData> => {
  try {
    const response = await apiClient.post('/lsfi/calculate');
    
    const data = response.data;
    return {
      score: data.score,
      status: data.status,
      factors: {
        affordabilityResilience: data.debt_to_income || 88,
        loanStructuralFairness: data.loan_diversity || 75,
        servicingIntegrity: data.payment_history || 92,
        paymentMomentum: data.income_stability || 85,
        externalStressSensitivity: data.credit_utilization || 65,
      },
    };
  } catch (error) {
    console.log('Recalculation not available');
    return generateMockLSFIData();
  }
};