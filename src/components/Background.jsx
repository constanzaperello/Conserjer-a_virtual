export default function Background({ variant }) {
  return <div className={`bg bg-${variant || 'n'}`} aria-hidden><i className="b1" /><i className="b2" /></div>
}
