// Hata Kodları
const tErrors = {
  10: 'Access to your account has been suspended. Please contact TMDb',
  14: 'Authentication failed',
  30: 'Invalid username and/or password',
  31: 'Your account is no longer active. Please contact TMDb',
  32: 'Your email address has not been verified',
  default: 'Something went wrong. Please try again later.',
};

// Durumlar
type ErrorCode = keyof typeof tErrors;

export interface tErrorResponse {
  status_code: ErrorCode;
  status_message: string;
}

export const getErrorMessage = (errorCode: ErrorCode) =>
  tErrors[errorCode] || tErrors.default;
