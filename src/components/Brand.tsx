export function Brand({ light = false }: { light?: boolean }) {
  return <div className="brand"><span className="brand-mark">F</span><span className={light ? 'brand-word light' : 'brand-word'}>flowpilot<span>ai</span></span></div>
}
