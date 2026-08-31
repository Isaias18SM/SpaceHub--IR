// 📁 src/layouts/MainLayout/MainLayout.tsx — SESIÓN 3
// Todavía no existe <Outlet />: el layout simplemente envuelve el contenido
// que App.tsx decide renderizar según el estado `moduloActivo`.
import React from 'react';
import SenaHeader from '../../components/SenaHeader/SenaHeader';
import Navbar from '../../components/Navbar/Navbar';
import type { ModuloActivo } from '../../App';

export interface MainLayoutProps {
  children: React.ReactNode;
  moduloActivo: ModuloActivo;
  onCambiarModulo: (m: ModuloActivo) => void;
  onAbrirLogin: () => void;
}

export default function MainLayout({ children, moduloActivo, onCambiarModulo, onAbrirLogin }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <SenaHeader tituloPortal="SENA SpaceHub" centroFormacion="Centro de Gestión de Mercados, Logística y TI" />
      <Navbar moduloActivo={moduloActivo} onCambiarModulo={onCambiarModulo} onAbrirLogin={onAbrirLogin} />
      <main className="flex-grow p-6">{children}</main>
      <footer className="text-center text-[11px] text-slate-500 py-4 border-t border-slate-800">
        SENA • ADSO • Proyecto Integrador SpaceHub
      </footer>
    </div>
  );
}
