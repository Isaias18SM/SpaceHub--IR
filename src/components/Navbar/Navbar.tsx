// 📁 src/components/Navbar/Navbar.tsx — SESIÓN 3
// Navegación por PESTAÑAS controladas con useState. Todavía NO hay React Router:
// cambiar de módulo no modifica la URL del navegador.
import { useAuth } from '../../context/AuthContext';
import type { ModuloActivo } from '../../App';

export interface NavbarProps {
  moduloActivo: ModuloActivo;
  onCambiarModulo: (modulo: ModuloActivo) => void;
  onAbrirLogin: () => void;
}

const modulos: { id: ModuloActivo; label: string }[] = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'equipos', label: '💻 Inventario' },
  { id: 'prestamos', label: '📋 Préstamos' },
  { id: 'incidencias', label: '🛠️ Mesa de Ayuda' },
];

export default function Navbar({ moduloActivo, onCambiarModulo, onAbrirLogin }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {modulos.map((m) => (
          <button
            key={m.id}
            onClick={() => onCambiarModulo(m.id)}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              moduloActivo === m.id
                ? 'bg-sena-green text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {user ? (
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="font-bold text-white">{user.nombreCompleto}</span>
          <span className="bg-sena-green/20 text-sena-green px-2 py-0.5 rounded font-mono text-[10px]">
            {user.rol}
          </span>
          <button onClick={logout} className="text-rose-400 hover:text-rose-300 font-bold underline">
            Salir
          </button>
        </div>
      ) : (
        <button
          onClick={onAbrirLogin}
          className="bg-sena-green hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl"
        >
          🔑 Iniciar Sesión
        </button>
      )}
    </nav>
  );
}
