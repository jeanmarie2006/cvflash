import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import Preview from '../components/Preview.jsx'
import CvSheet from '../components/Templates.jsx'
import { decodeShare, fullName, SAMPLES, TEMPLATES } from '../lib/cvData.js'

/** Page publique en lecture seule : /partage#<données> ou /exemples/:cle */
export default function Viewer({ sample }) {
  const { key } = useParams()
  const loc = useLocation()
  const cv = useMemo(() => (sample ? SAMPLES[key] : decodeShare(loc.hash.slice(1))), [key, loc.hash, sample])
  if (!cv) {
    return (
      <div className="grid min-h-screen place-items-center px-5 text-center">
        <div><Logo /><p className="mt-8 text-lg font-bold">Ce lien de partage est invalide ou incomplet.</p><Link to="/editeur" className="btn-primary mt-5">Créer mon CV</Link></div>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <div className="no-print">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
            <Logo />
            <div className="ml-auto flex gap-2">
              <button className="btn-primary !py-2" onClick={() => window.print()}>⬇ Télécharger / imprimer</button>
              <Link to="/editeur" className="btn-ghost !py-2">Créer le mien</Link>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="mb-4 text-center text-xl font-extrabold text-slate-900">CV de {fullName(cv)}{sample ? ' (exemple)' : ''}</h1>
          <Preview cv={cv} />
        </div>
      </div>
      <div className="print-only"><CvSheet cv={cv} /></div>
    </div>
  )
}

export function Exemples() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3"><Logo /><Link to="/editeur" className="btn-primary ml-auto !py-2">Créer mon CV</Link></div></header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Exemples de CV</h1>
        <p className="mt-2 text-slate-600">Trois profils fictifs, trois modèles. Ouvrez-en un pour l’imprimer ou l’enregistrer en PDF, ou chargez-le dans l’éditeur.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {Object.entries(SAMPLES).map(([k, cv]) => (
            <Link key={k} to={`/exemples/${k}`} className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-72 overflow-hidden bg-slate-100"><div style={{ width: 794, transform: 'scale(0.37)', transformOrigin: 'top left' }}><CvSheet cv={cv} /></div></div>
              <div className="p-4"><b>{fullName(cv)}</b><p className="text-sm text-slate-500">{cv.titre} · modèle {TEMPLATES.find((t) => t.id === cv.template)?.nom}</p></div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
