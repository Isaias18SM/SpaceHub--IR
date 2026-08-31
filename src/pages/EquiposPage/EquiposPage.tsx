// 📁 src/pages/EquiposPage/EquiposPage.tsx — SESIÓN 4
// El formulario inline de Sesión 3 desapareció: ahora "Registrar Equipo"
// navega a la ruta protegida /inventario/nuevo, y cada fila navega a
// /inventario/:placaSena (ruta dinámica) en vez de mostrar el detalle inline.
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { EquipoData } from '../../types/spacehub.types';

export interface EquiposPageProps {
  equipos: EquipoData[];
  onCambiarEstado: (id: number) => void;
}

export default function EquiposPage({ equipos, onCambiarEstado }: EquiposPageProps) {
  const { user } = useAuth();
  const esAprendiz = user?.rol === 'Aprendiz';
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">💻 Catálogo General de Computadores</h3>
        {!esAprendiz && (
          <button
            onClick={() => navigate('/inventario/nuevo')}
            className="bg-sena-green text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-600"
          >
            + Registrar Equipo
          </button>
        )}
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <th className="p-3">Placa</th>
              <th className="p-3">Equipo</th>
              <th className="p-3">RAM</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {equipos.map((eq) => (
              <tr key={eq.id} className="hover:bg-slate-900/50">
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/inventario/${eq.placaSena}`)}
                    className="text-sena-green font-bold hover:underline"
                  >
                    {eq.placaSena}
                  </button>
                </td>
                <td className="p-3 font-bold text-white">{eq.marcaModelo}</td>
                <td className="p-3 text-slate-400">{eq.ram}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      eq.estado === 'Operativo'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {eq.estado}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {esAprendiz ? (
                    <span className="text-[10px] text-slate-500">Solo Operarios</span>
                  ) : (
                    <button
                      onClick={() => onCambiarEstado(eq.id)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-300"
                    >
                      Cambiar Estado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
