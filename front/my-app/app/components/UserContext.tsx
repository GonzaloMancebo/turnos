// contexts/UserContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
  token: string | null;
  email: string | null;
  id: string | null;
  setUser: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedToken = await AsyncStorage.getItem('jwt_token');
      if (storedToken) {
        setUser(storedToken);
      }
    };
    loadUserFromStorage();
  }, []);

  const setUser = (newToken: string) => {
    setToken(newToken);
    const decodedToken: any = jwtDecode(newToken);
    setEmail(decodedToken.email);
    setId(decodedToken.id || decodedToken.userId || decodedToken._id);

    console.log("Contexto actualizado:", {
      token: newToken,
      email: decodedToken.email,
      id: decodedToken.id || decodedToken.userId || decodedToken._id,
    });
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setId(null);
    AsyncStorage.removeItem('jwt_token');
  };

  return (
    <UserContext.Provider value={{ token, email, id, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
