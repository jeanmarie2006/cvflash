import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CvSheet, { PAGE_H } from './Templates.jsx'

/** Aperçu A4 réduit pour tenir dans son conteneur, avec repères de pages. */
export default function Preview({ cv }) {
  const box = useRef(null)
  const inner = useRef(null)
  const [scale, setScale] = useState(0.7)
  const [h, setH] = useState(PAGE_H)

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(1, (box.current?.clientWidth || 794) / 794))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    const ro = new ResizeObserver(() => setH(inner.current?.offsetHeight || PAGE_H))
    ro.observe(inner.current)
    return () => ro.disconnect()
  }, [])

  const pages = Math.max(1, Math.ceil((h - 4) / PAGE_H))
  return (
    <div>
      <div ref={box} className="w-full">
        <div style={{ height: h * scale, position: 'relative' }} className="overflow-hidden rounded-lg bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
          <div ref={inner} style={{ width: 794, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
            <CvSheet cv={cv} />
          </div>
          {Array.from({ length: pages - 1 }, (_, i) => (
            <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: PAGE_H * (i + 1) * scale }} className="border-t-2 border-dashed border-rose-400/80">
              <span className="absolute right-2 -top-5 rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">Page {i + 2}</span>
            </div>
          ))}
        </div>
      </div>
      <p className={`mt-2 text-center text-xs font-semibold ${pages > 2 ? 'text-rose-600' : 'text-slate-400'}`}>
        {pages} page{pages > 1 ? 's' : ''} A4{pages > 2 ? ' — un CV de plus de 2 pages est déconseillé' : pages === 1 ? ' — idéal pour un premier emploi' : ''}
      </p>
    </div>
  )
}
