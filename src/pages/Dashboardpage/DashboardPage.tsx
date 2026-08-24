import React from 'react';
import './dashboard.css';

// 1. Mueve la interfaz ARRIBA del componente
interface PageProps {
  onNavigate?: (pagina: 'dashboard' | 'inventario' | 'prestamos' | 'ticketera') => void;
}

interface LabOccupancy {
  name: string;
  fillClass: 'progress-fill-green' | 'progress-fill-blue' | 'progress-fill-amber';
  widthPercent: number;
}

interface NavTab {
  id: 'dashboard' | 'inventario' | 'prestamos' | 'ticketera';
  label: string;
  icon: string;
  count: number | null;
}

const labs: LabOccupancy[] = [
  { name: 'Ambiente 301 - Desarrollo Web (ADSO)', fillClass: 'progress-fill-green', widthPercent: 90 },
  { name: 'Ambiente 302 - Redes y Bases de Datos', fillClass: 'progress-fill-blue', widthPercent: 75 },
  { name: 'Ambiente 303 - Mantenimiento Hardware', fillClass: 'progress-fill-amber', widthPercent: 40 },
];

const navTabs: NavTab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', count: null },
  { id: 'inventario', label: 'Inventario', icon: '📦', count: 5 },
  { id: 'prestamos', label: 'Préstamos', icon: '📋', count: 3 },
  { id: 'ticketera', label: 'Ticketera', icon: '🎫', count: 2 },
];

// 2. Usa PageProps en el generics de React.FC
export const Dashboard: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="dashboard-layout">
      {/* Navbar Superior */}
      <header className="dashboard-header">
        <div className="brand-section">
          <span className="brand-badge">SENA SpaceHub</span>
          <span className="text-muted">Centro de Gestión de Mercados, Logística y TI</span>
        </div>

        <nav className="nav-tabs">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate && onNavigate(tab.id)}
              className={`nav-tab ${tab.id === 'dashboard' ? 'active' : ''}`}
            >
              <span>{tab.icon}</span> {tab.label} {tab.count !== null && `(${tab.count})`}
            </button>
          ))}
        </nav>
      </header>

      {/* Botones de Autenticación */}
      <div className="auth-actions">
        <button className="btn btn-green">🔑 Iniciar Sesión</button>
        <button className="btn btn-blue">📝 Registrarse</button>
      </div>

      {/* Banner de Alerta */}
      <div className="alert-box">
        <span>⚠️ No has iniciado sesión. Para solicitar préstamos de equipos, inicia sesión como Aprendiz u Operario.</span>
        <button className="btn-alert">Iniciar Sesión Ahora</button>
      </div>

      {/* Encabezado del Panel */}
      <div className="panel-header">
        <div>
          <h1 className="panel-title">Panel Principal de Ambientes y Tecnología</h1>
          <p className="text-muted">Indicadores en tiempo real de laboratorios de cómputo</p>
        </div>
        <div className="status-badge">
          <span className="status-dot" />
          Estado del Sistema: Óptimo
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <div className="card">
          <span className="stat-label">Total Equipos Cómputo</span>
          <div className="stat-number">5</div>
          <span className="text-mutedd">• 10 Operativos / 2 Mantenimiento</span>
        </div>

        <div className="card">
          <span className="stat-label">Préstamos Activos</span>
          <div className="stat-number text-green">0</div>
          <span className="text-mutedddd">En uso por aprendices ADSO</span>
        </div>

        <div className="card">
          <span className="stat-label">Ocupación Ambientes</span>
          <div className="stat-number text-blue">85%</div>
          <span className="text-muteddd">Laboratorios 301 y 302 activos</span>
        </div>

        <div className="card">
          <span className="stat-label">Incidencias de Hardware</span>
          <div className="stat-number text-amber">0</div>
          <span className="text-muteddddd">1 Prioridad Alta / 1 Media</span>
        </div>
      </div>

      {/* Sección Inferior */}
      <div className="main-grid">
        {/* Ocupación por Laboratorio */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">📊 TASA DE OCUPACIÓN POR LABORATORIO</span>
            <span className="text-muted">EN TIEMPO REAL</span>
          </div>

          {labs.map((lab) => (
            <div key={lab.name} className="lab-item">
              <div className="lab-info">
                <span>{lab.name}</span>
                <strong>{lab.widthPercent}%</strong>
              </div>
              <div className="progress-bar-bg">
                <div className={`progress-bar-fill ${lab.fillClass}`} style={{ width: `${lab.widthPercent}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Distribución de Estado e Historial */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">📈 DISTRIBUCIÓN DE ESTADO E HISTORIAL</span>
            <span className="text-muted">SEMANA ACTUAL</span>
          </div>

          <div className="distribution-wrapper">
            <div className="donut-container">
              <svg width="120" height="120" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="52" fill="none" stroke="#0e1626" strokeWidth="16" />
                <circle cx="65" cy="65" r="52" fill="none" stroke="var(--green-accent)" strokeWidth="16" strokeDasharray="326.7 326.7" transform="rotate(-90 65 65)" />
                <circle cx="65" cy="65" r="52" fill="none" stroke="var(--amber-accent)" strokeWidth="16" strokeDasharray="54.5 326.7" strokeDashoffset="-272.3" transform="rotate(-90 65 65)" />
              </svg>
              <div className="donut-overlay">
                <span className="donut-value">12</span>
                <span className="donut-label">EQUIPOS</span>
              </div>
            </div>

            <div className="weekly-wrapper">
              <span className="text-muted">Préstamos Semanales:</span>
              <div className="weekly-box" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;