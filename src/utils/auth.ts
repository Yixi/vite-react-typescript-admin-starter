const Auth = {
  TOKEN_KEY: 'Y-admin-token',
  getToken: () => localStorage.getItem(Auth.TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(Auth.TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(Auth.TOKEN_KEY),
  isAuthenticated: () => !!localStorage.getItem(Auth.TOKEN_KEY),
}

export default Auth
