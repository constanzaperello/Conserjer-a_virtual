export default function Label({ x, y, w, h, t, c }) {
  return <div className={`lbl ${c}`} style={{ left: x, top: y, width: w, height: h }}><span>{t}</span></div>
}
