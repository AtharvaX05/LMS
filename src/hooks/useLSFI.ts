import { useState, useCallback, useEffect } from 'react';
import { getLSFIData, calculateLSFI } from '../services/lsfiService';

interface LSFIState {
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

export const useLSFI = (profileCompleted: boolean = false) => {
  const [lsfi, setLSFI] = useState<LSFIState | null>(profileCompleted ? {
    score: 85,
    status: 'Stable',
    factors: {
      affordabilityResilience: 88,
      loanStructuralFairness: 75,
      servicingIntegrity: 92,
      paymentMomentum: 85,
      externalStressSensitivity: 65,
    },
  } : null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profileCompleted) {
      setLSFI(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getLSFIData();

        const score = calculateLSFI(data.factors);
        const status =
          score >= 80 ? 'Stable' : score >= 70 ? 'Monitor' : 'At Risk';

        setLSFI({
          score,
          status,
          factors: data.factors,
        });
      } catch (err) {
        console.error('Failed to fetch LSFI data:', err);
        setError('Failed to fetch LSFI data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profileCompleted]);

  const updateLSFI = useCallback((newData: Partial<LSFIState>) => {
    setLSFI((prevLSFI) => {
      if (!prevLSFI) return prevLSFI;
      const updated = { ...prevLSFI, ...newData };
      return updated;
    });
  }, []);

  return {
    lsfi,
    lsfiScore: lsfi?.score ?? 0,
    lsfiStatus: lsfi?.status ?? 'At Risk',
    lsfiFactors: lsfi?.factors ?? {
      affordabilityResilience: 0,
      loanStructuralFairness: 0,
      servicingIntegrity: 0,
      paymentMomentum: 0,
      externalStressSensitivity: 0,
    },
    loading,
    error,
    updateLSFI,
    profileCompleted,
  };
};