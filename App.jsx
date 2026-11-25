import { useEffect, useState } from 'react'
import Screen from './components/Screen'
import { screens, helpTarget } from './data'

const useScale = () => {
  const f = () => Math.min(innerWidth / 1366, innerHeight / 1024)
  const [s, set] = useState(f)
  useEffect(() => { const h = () => set(f()); addEventListener('resize', h); return () => removeEventListener('resize', h) }, [])
  return s
}

export default function App() {
  const [cur, setCur] = useState('welcome')
  const [code, setCode] = useState('0') // variable "Código" del prototipo
  const s = useScale()
  const go = (id) => setCur(id)
  const def = screens[cur]
  return (
    <div className="viewport">
      <div className="stage" style={{ transform: `translate(-50%,-50%) scale(${s})` }}>
        <Screen key={cur} def={def} go={go} code={code} setCode={setCode} onHelp={() => go(helpTarget[def.help])} />
      </div>
    </div>
  )
}
