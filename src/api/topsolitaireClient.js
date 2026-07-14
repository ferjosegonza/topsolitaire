export const topsolitaireClient = {
  auth: {
    loginViaEmailPassword: async () => ({}) ,
    loginWithProvider: () => {},
    register: async () => ({}),
    verifyOtp: async () => ({ access_token: '' }),
    resendOtp: async () => ({}),
    resetPasswordRequest: async () => ({}),
    resetPassword: async () => ({}),
    me: async () => null,
    setToken: () => {},
    logout: () => {},
    redirectToLogin: () => {}
  }
};
