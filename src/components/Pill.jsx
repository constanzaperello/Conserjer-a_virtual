// Botón "píldora" con brillo cian (Rectangle + texto del diseño)
export default function Pill({ x, y, w, h, l, to, f, a, r, go }) {
  return (
    <button className={`pill f-${f} ${to ? '' : 'inert'}`} style={{ left: x, top: y, width: w, height: h, borderRadius: r, '--a': a }}
      onClick={() => to && go(to)} aria-disabled={!to}>{l}</button>
  )
}
