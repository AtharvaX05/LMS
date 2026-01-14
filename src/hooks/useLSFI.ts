// useLSFI Hook - Fixed to prevent score recalculation
import { useState, useCallback, useEffect, useRef } from 'react';
import { getLSFIData } from '../services/lsfiService';

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
  const [lsfi, setLSFI] = useState<LSFIState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Prevent multiple fetches
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!profileCompleted) {
      setLSFI(null);
      hasFetched.current = false;
      return;
    }

    // Only fetch once
    if (hasFetched.current) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getLSFIData();

        // Use the data directly from service
        setLSFI({
          score: data.score,
          status: data.status,
          factors: data.factors,
        });

        hasFetched.current = true;
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