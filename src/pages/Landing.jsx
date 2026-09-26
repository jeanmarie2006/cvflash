import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import CvSheet from '../components/Templates.jsx'
import { SAMPLES } from '../lib/cvData.js'

const STEPS = [
  ['1', 'Remplissez', 'Un formulaire guidé en 5 étapes : informations, expériences, formations, compétences.'],
  ['2', 'Visualisez', 'Votre CV se met à jour en direct pendant la saisie, avec trois modèles au choix.'],
  ['3', 'Exportez', 'Téléchargez un PDF prêt à envoyer, ou partagez un lien de consultation.'],
]
const FEATS = [
  ['🎨', 'Trois modèles soignés', 'Nuit, Élégant et Minimal, avec la couleur de votre choix.'],
  ['✅', 'Indicateur de qualité', 'Un score sur 100 et des conseils concrets pour améliorer votre CV.'],
  ['✨', 'Suggestions de formulation', 'Des phrases d’accroche et des puces prêtes à personnaliser.'],
  ['📁', 'Plusieurs CV', 'Un CV par type de poste, enregistrés automatiquement dans votre navigateur.'],
  ['🔗', 'Lien de partage', 'Envoyez votre CV par simple lien, sans compte ni serveur.'],
  ['🔒', 'Vos données restent chez vous', 'Rien n’est envoyé sur Internet : tout se passe dans votre navigateur.'],
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <nav className="flex items-center gap-2">
          <Link to="/exemples" className="btn-ghost hidden sm:inline-flex">Exemples</Link>
          <Link to="/editeur" className="btn-primary">Créer mon CV</Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-6 lg:grid-cols-[1.05fr_.95fr] lg:pt-12">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-500" /> Gratuit · Sans inscription · Export PDF
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
              Un CV professionnel <span className="text-brand-600">en 10 minutes</span>, sans outil de design.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Remplissez un formulaire guidé, voyez votre CV se construire en direct et téléchargez-le en PDF. Pensé pour les étudiants, les chercheurs d’emploi et les freelances.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/editeur" className="btn-primary px-6 py-3 text-base">Créer mon CV →</Link>
              <Link to="/exemples" className="btn-ghost px-6 py-3 text-base">Voir des exemples</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500"><li>✓ 3 modèles</li><li>✓ Aperçu en direct</li><li>✓ Sauvegarde automatique</li></ul>
          </div>

          <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-500/25 via-fuchsia-400/10 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200" style={{ height: 1123 * 0.52 }}>
              <div style={{ width: 794, transform: 'scale(0.52)', transformOrigin: 'top left' }}><CvSheet cv={SAMPLES.dev} /></div>
            </div>
            <div className="absolute -left-4 top-24 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100 sm:block">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Qualité du CV</p>
              <p className="text-2xl font-extrabold text-emerald-600">92 <span className="text-sm text-slate-400">/ 100</span></p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16">
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(([n, t, d]) => (
              <article key={n} className="card relative p-6">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-lg font-extrabold text-white">{n}</span>
                <h2 className="text-lg font-extrabold text-slate-900">{t}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Tout ce qu’il faut pour un CV qui se remarque</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATS.map(([i, t, d]) => (
              <article key={t} className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">{i}</div>
                <h3 className="font-bold text-slate-900">{t}</h3>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <div className="rounded-3xl bg-slate-900 p-10 text-center text-white">
            <h2 className="text-3xl font-extrabold">Votre prochain CV est à quelques clics</h2>
            <Link to="/editeur" className="btn-primary mt-6 px-7 py-3 text-base">Commencer maintenant</Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        CVFlash — projet de démonstration · Réalisé par <a className="font-semibold text-brand-700 hover:underline" href="https://sedjame-vianney.vercel.app" target="_blank" rel="noopener">Sedjame Vianney</a>
      </footer>
    </div>
  )
}
