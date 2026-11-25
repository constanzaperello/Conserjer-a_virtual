import Background from './Background'
import Pill from './Pill'
import Label from './Label'
import Keypad from './Keypad'
import Checkbox from './Checkbox'
import HelpButton from './HelpButton'

export default function Screen({ def, go, code, setCode, onHelp }) {
  return (
    <div className={`screen ${def.bg === 'w' ? 'welcome' : ''}`}>
      {def.bg !== 'e' && <Background variant={def.bg} />}
      {def.items.map((it, i) => {
        if (it.k === 'pill') return <Pill key={i} {...it} go={go} />
        if (it.k === 't') return <Label key={i} {...it} />
        if (it.k === 'kp') return <Keypad key={i} {...it} code={code} setCode={setCode} go={go} />
        if (it.k === 'cb') return <Checkbox key={i} {...it} />
        if (it.k === 'hit') return <div key={i} className={`hit ${it.to ? 'on' : ''}`} style={{ left: it.x, top: it.y, width: it.w, height: it.h }} onClick={() => it.to && go(it.to)} />
        if (it.k === 'welcome') return (
          <button key={i} className="wel" onClick={() => go('opciones')}>
            <span className="orb" /><h1>Bienvenido</h1><p>Tocar para continuar</p>
          </button>)
        return null
      })}
      {def.help && <HelpButton onClick={onHelp} />}
      <div className="brand">seguritech.cl</div>
    </div>
  )
}
