import { useState } from 'react';
import { Dashboard } from './pages/Dashboardpage/DashboardPage';
import InventarioPage from './pages/Inventariopage/InventarioPage';
import PrestamosPage from './pages/Prestamospage/PrestamosPage';
import TicketeraPage from './pages/Ticketerapage/TicketeraPage';

export default function App() {
  const [paginaActual, setPaginaActual] = useState<'dashboard' | 'inventario' | 'prestamos' | 'ticketera'>('dashboard');

  return (
    <div>
      {paginaActual === 'dashboard' && <Dashboard onNavigate={(pag) => setPaginaActual(pag as any)} />}
      {paginaActual === 'inventario' && <InventarioPage onNavigate={(pag) => setPaginaActual(pag as any)} />}
      {paginaActual === 'prestamos' && <PrestamosPage onNavigate={(pag) => setPaginaActual(pag as any)} />}
      {paginaActual === 'ticketera' && <TicketeraPage onNavigate={(pag) => setPaginaActual(pag as any)} />}
    </div>
  );
}