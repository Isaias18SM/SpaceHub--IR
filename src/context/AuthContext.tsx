// 📁 src/context/AuthContext.tsx
// Simulación de sesión de usuario sin backend (localStorage como persistencia local)
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthState, UsuarioData, RolUsuario } from '../types/spacehub.types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioData | null>(null);

  // Hidratación de sesión al cargar la app (o al refrescar con F5)
  useEffect(() => {
    const saved = localStorage.getItem('spacehub_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const loginSimulado = (correo: string, rol: RolUsuario, ficha?: string) => {
    const mockUser: UsuarioData = {
      id: Date.now(),
      nombreCompleto: correo.split('@')[0].replace('.', ' '),
      correo,
      rol,
      ficha: ficha ?? (rol === 'Aprendiz' ? '2879451' : 'STAFF-TI'),
    };
    setUser(mockUser);
    localStorage.setItem('spacehub_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spacehub_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginSimulado, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
