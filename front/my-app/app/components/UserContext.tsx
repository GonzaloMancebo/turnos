import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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

  // Cargar el token desde AsyncStorage cuando el componente se monte
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedToken = await AsyncStorage.getItem('jwt_token');
      if (storedToken) {
        setUser(storedToken);
      }
    };

    loadUserFromStorage();
  }, []); // Se ejecuta solo cuando el componente se monta

  const setUser = (newToken: string) => {
    setToken(newToken);

    const decodedToken: any = jwtDecode(newToken);
    const decodedEmail = decodedToken.email;
    const decodedId = decodedToken.id || decodedToken.userId || decodedToken._id;

    setEmail(decodedEmail);
    setId(decodedId);

    console.log("Contexto actualizado:", {
      token: newToken,
      email: decodedEmail,
      id: decodedId,
    });
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setId(null);
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
