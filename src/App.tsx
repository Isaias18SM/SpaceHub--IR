// 📁 src/App.tsx — SESIÓN 3
// SPA "simulada": el cambio de pantalla ocurre por estado de React (useState),
// NO por react-router-dom. La URL del navegador nunca cambia.
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout/MainLayout';
import LoginModal from './components/LoginModal/LoginModal';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import PrestamosPage from './pages/PrestamosPage/PrestamosPage';
import IncidenciasPage from './pages/IncidenciasPage/IncidenciasPage';
import { equiposIniciales, prestamosIniciales, incidenciasIniciales } from './data/mockData';
import type { EquipoData, PrestamoData, IncidenciaData } from './types/spacehub.types';

export type ModuloActivo = 'dashboard' | 'equipos' | 'prestamos' | 'incidencias';

function SpaceHubApp() {
  const [moduloActivo, setModuloActivo] = useState<ModuloActivo>('dashboard');
  const [loginVisible, setLoginVisible] = useState(false);

  const [equipos, setEquipos] = useState<EquipoData[]>(equiposIniciales);
  const [prestamos, setPrestamos] = useState<PrestamoData[]>(prestamosIniciales);
  const [incidencias, setIncidencias] = useState<IncidenciaData[]>(incidenciasIniciales);

  const renderModulo = () => {
    switch (moduloActivo) {
      case 'dashboard':
        return <DashboardPage equipos={equipos} prestamos={prestamos} incidencias={incidencias} />;
      case 'equipos':
        return (
          <EquiposPage
            equipos={equipos}
            onAgregarEquipo={(eq) => setEquipos((prev) => [...prev, eq])}
            onCambiarEstado={(id) =>
              setEquipos((prev) =>
                prev.map((e) => (e.id === id ? { ...e, estado: e.estado === 'Operativo' ? 'En Mantenimiento' : 'Operativo' } : e))
              )
            }
          />
        );
      case 'prestamos':
        return (
          <PrestamosPage
            equipos={equipos}
            prestamos={prestamos}
            onCrearPrestamo={(p) => setPrestamos((prev) => [...prev, p])}
            onDevolver={(id) => setPrestamos((prev) => prev.map((p) => (p.id === id ? { ...p, estado: 'Devuelto' } : p)))}
          />
        );
      case 'incidencias':
        return (
          <IncidenciasPage
            incidencias={incidencias}
            onCrear={(i) => setIncidencias((prev) => [...prev, i])}
            onResolver={(id) => setIncidencias((prev) => prev.map((i) => (i.id === id ? { ...i, resuelta: true } : i)))}
          />
        );
    }
  };

  return (
    <>
      <MainLayout moduloActivo={moduloActivo} onCambiarModulo={setModuloActivo} onAbrirLogin={() => setLoginVisible(true)}>
        {renderModulo()}
      </MainLayout>
      <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SpaceHubApp />
    </AuthProvider>
  );
}
