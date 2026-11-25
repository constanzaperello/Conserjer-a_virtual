// Teclado numérico: reproduce la variable "Código" de Figma (inicia en "0", cada dígito se concatena, Borrar la vacía)
const K = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const Key = ({ x, y, w, h, children, cls, onClick }) =>
  <button className={cls} style={{ left: x, top: y, width: w, height: h }} onClick={onClick}>{children}</button>
export default function Keypad({ fy, to, code, setCode, go }) {
  return (<>
    <div className="field" style={{ left: 427, top: fy, width: 513, height: 78 }}>{code}</div>
    {K.flatMap((row, i) => row.map((d, j) =>
      <Key key={d} cls="key" x={427 + j * 178} y={466 + i * 109} w={157} h={75} onClick={() => setCode(code + d)}>{d}</Key>))}
    <Key cls="key" x={605} y={793} w={157} h={75} onClick={() => setCode(code + '0')}>0</Key>
    <Key cls="pill f-j small" x={426} y={793} w={157} h={78} onClick={() => setCode('')}>Borrar</Key>
    <Key cls="pill f-j small" x={785} y={793} w={157} h={78} onClick={() => go(to)}>Aceptar</Key>
  </>)
}
