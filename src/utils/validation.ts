export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isValidLoanAmount = (amount: number): boolean => {
  return amount >= 1000 && amount <= 500000;
};

export const isValidInterestRate = (rate: number): boolean => {
  return rate >= 0 && rate <= 20;
};

export const validateLoanData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.amount || !isValidLoanAmount(data.amount)) {
    errors.push('Invalid loan amount');
  }

  if (!data.interestRate || !isValidInterestRate(data.interestRate)) {
    errors.push('Invalid interest rate');
  }

  if (!data.tenure || data.tenure < 12 || data.tenure > 360) {
    errors.push('Invalid tenure');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
