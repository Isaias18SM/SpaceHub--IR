// 📁 src/pages/DetalleEquipoPage/DetalleEquipoPage.tsx — SESIÓN 4
// Ruta dinámica: /inventario/:placaSena — lee el parámetro con useParams().
import { useParams, Link } from 'react-router-dom';
import type { EquipoData } from '../../types/spacehub.types';

export interface DetalleEquipoPageProps {
  equipos: EquipoData[];
}

export default function DetalleEquipoPage({ equipos }: DetalleEquipoPageProps) {
  const { placaSena } = useParams<{ placaSena: string }>();
  const equipo = equipos.find((e) => e.placaSena === placaSena);

  if (!equipo) {
    return (
      <div className="space-y-3">
        <p className="text-rose-400">No se encontró el equipo con placa {placaSena}.</p>
        <Link to="/inventario" className="text-sena-green underline text-sm">
          ← Volver al inventario
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-sky-400">🔍 Ficha Técnica del Computador</h3>
        <span className="bg-sky-500/20 text-sky-400 text-[10px] font-mono px-2 py-0.5 rounded">useParams()</span>
      </div>
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-sm">
        <p className="text-slate-400">
          Placa leída de la URL: <strong className="text-sena-green">{equipo.placaSena}</strong>
        </p>
        <p className="text-slate-300">
          <strong>Equipo:</strong> {equipo.marcaModelo}
        </p>
        <p className="text-slate-300">
          <strong>RAM:</strong> {equipo.ram}
        </p>
        <p className="text-slate-300">
          <strong>Estado:</strong> {equipo.estado}
        </p>
      </div>
      <Link to="/inventario" className="text-sena-green underline text-sm inline-block">
        ← Volver al inventario
      </Link>
    </div>
  );
}
