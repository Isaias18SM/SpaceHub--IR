// 📁 src/pages/EquiposPage/EquiposPage.tsx — SESIÓN 3
// El registro de un nuevo equipo se hace con un formulario inline (toggle),
// NO con una ruta separada como /inventario/nuevo (eso llega en Sesión 4).
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { EquipoData } from '../../types/spacehub.types';

export interface EquiposPageProps {
  equipos: EquipoData[];
  onAgregarEquipo: (equipo: EquipoData) => void;
  onCambiarEstado: (id: number) => void;
}

export default function EquiposPage({ equipos, onAgregarEquipo, onCambiarEstado }: EquiposPageProps) {
  const { user } = useAuth();
  const esAprendiz = user?.rol === 'Aprendiz';
  const [mostrarForm, setMostrarForm] = useState(false);
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [ram, setRam] = useState('16GB DDR4');

  const guardar = () => {
    if (!placa || !marca) return;
    onAgregarEquipo({ id: Date.now(), placaSena: placa, marcaModelo: marca, ram, estado: 'Operativo' });
    setPlaca('');
    setMarca('');
    setMostrarForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">💻 Catálogo General de Computadores</h3>
        {/* RBAC visual: solo Admin ve el botón para registrar equipos */}
        {!esAprendiz && (
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="bg-sena-green text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-600"
          >
            + Registrar Equipo
          </button>
        )}
      </div>

      {mostrarForm && !esAprendiz && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              placeholder="Placa SENA (ej. SENA-8942)"
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white"
            />
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca / Modelo"
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white"
            />
            <select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white"
            >
              <option>16GB DDR4</option>
              <option>32GB DDR5</option>
              <option>8GB DDR4</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setMostrarForm(false)} className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-xl">
              Cancelar
            </button>
            <button onClick={guardar} className="bg-sena-green text-white font-bold text-xs px-4 py-1.5 rounded-xl">
              Guardar
            </button>
          </div>
        </div>
      )}

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
                <td className="p-3 text-sena-green font-bold">{eq.placaSena}</td>
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
