// 📁 src/pages/NuevoEquipoPage/NuevoEquipoPage.tsx — SESIÓN 4
// Antes (Sesión 3) era un formulario inline dentro de EquiposPage.
// Ahora es una RUTA propia: /inventario/nuevo, protegida solo para Administrador.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EquipoData } from '../../types/spacehub.types';

export interface NuevoEquipoPageProps {
  onAgregarEquipo: (equipo: EquipoData) => void;
}

export default function NuevoEquipoPage({ onAgregarEquipo }: NuevoEquipoPageProps) {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [ram, setRam] = useState('16GB DDR4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placa || !marca) return;
    onAgregarEquipo({ id: Date.now(), placaSena: placa, marcaModelo: marca, ram, estado: 'Operativo' });
    // Navegación programática de vuelta al catálogo
    navigate('/inventario');
  };

  return (
    <div className="max-w-lg space-y-4">
      <h3 className="text-lg font-bold text-amber-400">➕ Registrar Nuevo Equipo (Ruta Protegida)</h3>
      <form onSubmit={handleSubmit} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-sm">
        <div>
          <label className="block text-slate-400 text-xs mb-1">Placa SENA:</label>
          <input
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            placeholder="SENA-8942"
            className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg w-full text-white"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs mb-1">Marca / Modelo:</label>
          <input
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Lenovo ThinkPad E14"
            className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg w-full text-white"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs mb-1">RAM:</label>
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg w-full text-white"
          >
            <option>16GB DDR4</option>
            <option>32GB DDR5</option>
            <option>8GB DDR4</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-sena-green text-white font-bold py-2 rounded-xl">
          Guardar Registro
        </button>
      </form>
    </div>
  );
}
