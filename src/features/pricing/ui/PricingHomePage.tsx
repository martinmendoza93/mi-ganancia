import { Link } from 'react-router-dom';
import { PageShell } from '@/shared/ui/PageShell';

export function PricingHomePage() {
  return (
    <PageShell>
      <h1 className="hero">Tú sabes hacer tu trabajo. Nosotros te ayudamos a saber cuánto cobrar.</h1>
      <p className="lede">
        En el celular, sin crear cuenta. Primero eliges la moneda de este cálculo (C$, $, € u otra). Luego
        eliges qué quieres saber hoy.
      </p>
      <div className="cards">
        <Link className="card" to="/estimar">
          <strong>¿Cuánto cobro?</strong>
          <p>Lo que te costó, extras y lo que quieres que te quede.</p>
        </Link>
        <Link className="card" to="/evaluar">
          <strong>¿Este precio me deja algo?</strong>
          <p>Ya tienes un precio; te decimos si ganas, empatas o pierdes.</p>
        </Link>
        <Link className="card" to="/trabajo">
          <strong>¿Cuánto sale este trabajo?</strong>
          <p>Materiales, horas y si hay que moverte. Campos que no aplican se dejan vacíos.</p>
        </Link>
      </div>
    </PageShell>
  );
}
