
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import MainLayout from './layouts/MainLayout/MainLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import NuevoEquipoPage from './pages/NuevoEquipoPage/NuevoEquipoPage';
import DetalleEquipoPage from './pages/DetalleEquipoPage/DetalleEquipoPage';
import PrestamosPage from './pages/PrestamosPage/PrestamosPage';
import IncidenciasPage from './pages/IncidenciasPage/IncidenciasPage';
import { equiposIniciales, prestamosIniciales, incidenciasIniciales } from './data/mockData';
import type { EquipoData, PrestamoData, IncidenciaData } from './types/spacehub.types';

function SpaceHubRoutes() {
  const [equipos, setEquipos] = useState<EquipoData[]>(equiposIniciales);
  const [prestamos, setPrestamos] = useState<PrestamoData[]>(prestamosIniciales);
  const [incidencias, setIncidencias] = useState<IncidenciaData[]>(incidenciasIniciales);

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas anidadas dentro de MainLayout (con <Outlet />) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage equipos={equipos} prestamos={prestamos} incidencias={incidencias} />
            </ProtectedRoute>
          }
        />

        <Route
          path="inventario"
          element={
            <ProtectedRoute>
              <EquiposPage
                equipos={equipos}
                onCambiarEstado={(id) =>
                  setEquipos((prev) =>
                    prev.map((e) =>
                      e.id === id ? { ...e, estado: e.estado === 'Operativo' ? 'En Mantenimiento' : 'Operativo' } : e
                    )
                  )
                }
              />
            </ProtectedRoute>
          }
        />

        {/* Ruta dinámica: useParams() lee :placaSena */}
        <Route
          path="inventario/:placaSena"
          element={
            <ProtectedRoute>
              <DetalleEquipoPage equipos={equipos} />
            </ProtectedRoute>
          }
        />

        {/* Exclusiva Administrador */}
        <Route
          path="inventario/nuevo"
          element={
            <ProtectedRoute rolPermitido="Administrador">
              <NuevoEquipoPage onAgregarEquipo={(eq) => setEquipos((prev) => [...prev, eq])} />
            </ProtectedRoute>
          }
        />

        <Route
          path="prestamos"
          element={
            <ProtectedRoute>
              <PrestamosPage
                equipos={equipos}
                prestamos={prestamos}
                onCrearPrestamo={(p) => setPrestamos((prev) => [...prev, p])}
                onDevolver={(id) => setPrestamos((prev) => prev.map((p) => (p.id === id ? { ...p, estado: 'Devuelto' } : p)))}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="incidencias"
          element={
            <ProtectedRoute>
              <IncidenciasPage
                incidencias={incidencias}
                onCrear={(i) => setIncidencias((prev) => [...prev, i])}
                onResolver={(id) => setIncidencias((prev) => prev.map((i) => (i.id === id ? { ...i, resuelta: true } : i)))}
              />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SpaceHubRoutes />
    </AuthProvider>
  );
}
