// 📁 src/layouts/MainLayout/MainLayout.tsx — SESIÓN 4
// Ahora usa <Outlet />: React Router inyecta aquí la página que coincide
// con la ruta activa. El layout ya no recibe `children` manualmente.
import { Outlet } from 'react-router-dom';
import SenaHeader from '../../components/SenaHeader/SenaHeader';
import Navbar from '../../components/Navbar/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <SenaHeader tituloPortal="SENA SpaceHub" centroFormacion="Centro de Gestión de Mercados, Logística y TI" />
      <Navbar />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <footer className="text-center text-[11px] text-slate-500 py-4 border-t border-slate-800">
        SENA • ADSO • Proyecto Integrador SpaceHub
      </footer>
    </div>
  );
}
