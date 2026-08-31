// 📁 src/components/LoginModal/LoginModal.tsx — SESIÓN 3
// El login vive como un MODAL sobre la misma pantalla (no es una ruta /login todavía).
import { useAuth } from '../../context/AuthContext';
import type { RolUsuario } from '../../types/spacehub.types';

export interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
  const { loginSimulado } = useAuth();
  if (!visible) return null;

  const entrarComo = (rol: RolUsuario) => {
    if (rol === 'Aprendiz') {
      loginSimulado('ana.fajardo@sena.edu.co', 'Aprendiz', '2879451');
    } else {
      loginSimulado('roberto.gomez@sena.edu.co', 'Administrador', 'STAFF-TI');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h4 className="font-bold text-sm text-sena-green uppercase font-mono">
            🔐 Iniciar Sesión (Probar Roles)
          </h4>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        <button
          onClick={() => entrarComo('Aprendiz')}
          className="w-full text-left bg-slate-950 hover:bg-slate-800 p-3 rounded-2xl border border-slate-800 flex items-center justify-between"
        >
          <div>
            <span className="font-bold text-sena-green block">👨‍🎓 Ana María Fajardo</span>
            <span className="text-[10px] text-slate-400">Rol: Aprendiz ADSO • Ficha 2879451</span>
          </div>
          <span className="text-xs bg-sena-green/20 text-sena-green px-2 py-0.5 rounded font-bold">
            Aprendiz
          </span>
        </button>

        <button
          onClick={() => entrarComo('Administrador')}
          className="w-full text-left bg-slate-950 hover:bg-slate-800 p-3 rounded-2xl border border-slate-800 flex items-center justify-between"
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
