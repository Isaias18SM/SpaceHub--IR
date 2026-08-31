// 📁 src/pages/LoginPage/LoginPage.tsx — SESIÓN 4
// El login ya NO es un modal: es una página propia en la ruta pública "/login".
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { RolUsuario } from '../../types/spacehub.types';

export default function LoginPage() {
  const { loginSimulado } = useAuth();
  const navigate = useNavigate();

  const entrarComo = (rol: RolUsuario) => {
    if (rol === 'Aprendiz') {
      loginSimulado('ana.fajardo@sena.edu.co', 'Aprendiz', '2879451');
    } else {
      loginSimulado('roberto.gomez@sena.edu.co', 'Administrador', 'STAFF-TI');
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
        <h4 className="font-bold text-sm text-sena-green uppercase font-mono">
          🔐 Iniciar Sesión — SENA SpaceHub
        </h4>
        <p className="text-xs text-slate-400">Selecciona un usuario de prueba para cambiar de contexto.</p>

        <button
          onClick={() => entrarComo('Aprendiz')}
          className="w-full text-left bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl border border-slate-800 flex items-center justify-between"
        >
          <div>
            <span className="font-bold text-sena-green block">👨‍🎓 Ana María Fajardo</span>
            <span className="text-[10px] text-slate-400">Rol: Aprendiz ADSO • Ficha 2879451</span>
          </div>
          <span className="text-xs bg-sena-green/20 text-sena-green px-2 py-0.5 rounded font-bold">Aprendiz</span>
        </button>

        <button
          onClick={() => entrarComo('Administrador')}
          className="w-full text-left bg-slate-900 hover:bg-slate-800 p-3 rounded-2xl border border-slate-800 flex items-center justify-between"
        >
          <div>
            <span className="font-bold text-sky-400 block">👨‍💼 Ing. Roberto Gómez</span>
            <span className="text-[10px] text-slate-400">Rol: Administrador • Gestión Total</span>
          </div>
          <span className="text-xs bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-bold">Admin</span>
        </button>
      </div>
    </div>
  );
}
