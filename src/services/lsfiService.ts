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

// Generate mock LSFI data for demo purposes
const generateMockLSFIData = (): LSFIData => {
  return {
    score: 85,
    status: 'Stable',
    factors: {
      affordabilityResilience: Math.floor(50 + Math.random() * 50),
      loanStructuralFairness: Math.floor(50 + Math.random() * 50),
      servicingIntegrity: Math.floor(50 + Math.random() * 50),
      paymentMomentum: Math.floor(50 + Math.random() * 50),
      externalStressSensitivity: Math.floor(50 + Math.random() * 50),
    },
  };
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
    // Try to fetch from API, fall back to mock data if not available
    const response = await apiClient.get('/lsfi');
    return response.data;
  } catch (error) {
    console.log('Using mock LSFI data');
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
