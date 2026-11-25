import { useState } from 'react'
// Variante "Predeterminado" <-> "Variante 2" (ON_CLICK CHANGE_TO) del componente Rectangle 39
export default function Checkbox({ x, y, l }) {
  const [on, set] = useState(false)
  return (<>
    <button className={`cb ${on ? 'on' : ''}`} style={{ left: x, top: y }} role="checkbox" aria-checked={on} onClick={() => set(!on)} />
    <div className="lbl cbl" style={{ left: 294, top: y + 6, width: 700, height: 51 }}><span>{l}</span></div>
  </>)
}
