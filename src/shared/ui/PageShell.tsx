import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

export function PageShell({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="shell">
      <header className="brand">
        <div className="brand-row">
          <span className="brand-mark" aria-hidden="true">
            mg
          </span>
          <span className="brand-name">mi-ganancia</span>
          <span className="pill">Sin registro</span>
        </div>
        <p className="brand-chip">Gratis • simple • pensado para personas reales</p>
      </header>
      <nav className="nav" aria-label="Qué quieres saber">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/estimar">¿Cuánto cobro?</NavLink>
        <NavLink to="/evaluar">¿Este precio?</NavLink>
        <NavLink to="/trabajo">¿Este trabajo?</NavLink>
      </nav>
      <main className="panel">
        {title ? <h1 className="page-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
