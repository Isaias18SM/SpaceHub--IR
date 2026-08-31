// 📁 src/pages/DashboardPage/DashboardPage.tsx
import type { EquipoData, PrestamoData, IncidenciaData } from '../../types/spacehub.types';

export interface DashboardPageProps {
  equipos: EquipoData[];
  prestamos: PrestamoData[];
  incidencias: IncidenciaData[];
}

export default function DashboardPage({ equipos, prestamos, incidencias }: DashboardPageProps) {
  const activos = prestamos.filter((p) => p.estado === 'Activo').length;
  const pendientes = incidencias.filter((i) => !i.resuelta).length;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">📊 Panel General SENA SpaceHub</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Total Equipos</span>
          <div className="text-2xl font-black text-white">{equipos.length}</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Préstamos Activos</span>
          <div className="text-2xl font-black text-sena-green">{activos}</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Incidencias Pendientes</span>
          <div className="text-2xl font-black text-amber-400">{pendientes}</div>
        </div>
      </div>
    </div>
  );
}
