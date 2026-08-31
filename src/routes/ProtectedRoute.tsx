// 📁 src/routes/ProtectedRoute.tsx — SESIÓN 4
// El "portero virtual": intercepta el acceso a rutas privadas.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { RolUsuario } from '../types/spacehub.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  rolPermitido?: RolUsuario;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, rolPermitido }) => {
  const { user, isAuthenticated } = useAuth();

  // Paso 1: ¿Inició sesión?
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Paso 2: ¿Tiene el rol exigido?
  if (rolPermitido && user?.rol !== rolPermitido) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">⛔</div>
        <h2 className="text-xl font-bold text-rose-500">Acceso Denegado por Guardia RBAC</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Tu rol actual de <strong className="text-rose-400">{user?.rol}</strong> no tiene permisos para esta
          sección. Se requiere el rol de <strong>{rolPermitido}</strong>.
        </p>
      </div>
    );
  }

  // Paso 3: acceso permitido
  return <>{children}</>;
};
