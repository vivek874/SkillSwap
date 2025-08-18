import {  useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContextInstance';



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access')
  );

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access', accessToken);
    } else {
      localStorage.removeItem('access');
    }
  }, [accessToken]);

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

