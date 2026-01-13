import React, { createContext, useContext, ReactNode } from 'react';
import { useLSFI } from '../hooks/useLSFI';

interface LSFIContextType {
  lsfi: any;
  lsfiScore: number;
  lsfiStatus: 'Stable' | 'Monitor' | 'At Risk';
  lsfiFactors: any;
  loading: boolean;
  error: string | null;
  updateLSFI: (data: any) => void;
}

const LSFIStateContext = createContext<LSFIContextType | undefined>(undefined);

export const LSFIStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const lsfi = useLSFI();

  return (
    <LSFIStateContext.Provider value={lsfi}>
      {children}
    </LSFIStateContext.Provider>
  );
};

export const useLSFIContext = (): LSFIContextType => {
  const context = useContext(LSFIStateContext);
  if (!context) {
    throw new Error('useLSFIContext must be used within LSFIStateProvider');
  }
  return context;
};
