import { fmtPeriod, fullName, initials, lines } from '../lib/cvData.js'

const PAGE_W = 794 // A4 à 96 dpi
export const PAGE_H = 1123

const ink = '#0f172a'
const gray = '#475569'

function Dots({ n = 0, color, dark }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }} aria-label={`Niveau ${n} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} style={{ width: 8, height: 8, borderRadius: 8, background: i <= n ? color : dark ? 'rgba(255,255,255,.25)' : '#e2e8f0', display: 'inline-block' }} />
      ))}
    </span>
  )
}

function Bullets({ text, size = 12.5 }) {
  const ls = lines(text)
  if (!ls.length) return null
  return (
    <ul style={{ margin: '4px 0 0', paddingLeft: 16, listStyle: 'disc', fontSize: size, color: gray, lineHeight: 1.45 }}>
      {ls.map((l, i) => <li key={i} style={{ marginBottom: 2 }}>{l}</li>)}
    </ul>
  )
}

function Avatar({ cv, size, border = '#fff', radius }) {
  const r = radius ?? size / 2
  return cv.photo ? (
    <img src={cv.photo} alt="" style={{ width: size, height: size * 1.25, objectFit: 'cover', borderRadius: r, border: `4px solid ${border}` }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: r, border: `4px solid ${border}`, display: 'grid', placeItems: 'center', fontSize: size / 3, fontWeight: 800, color: '#fff', background: 'rgba(255,255,255,.14)' }}>{initials(cv)}</div>
  )
}

const sheet = (extra) => ({
  width: PAGE_W, minHeight: PAGE_H, boxSizing: 'border-box', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', color: ink, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', ...extra,
})

/* ---------- Modèle « Nuit » : colonne latérale foncée ---------- */
function Nuit({ cv }) {
  const c = cv.color
  const H = ({ children }) => <h3 style={{ fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', margin: '22px 0 8px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,.3)', paddingBottom: 5 }}>{children}</h3>
  const M = ({ children }) => <h3 style={{ fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', margin: '24px 0 10px', color: c, borderBottom: `2px solid ${c}`, paddingBottom: 5 }}>{children}</h3>
  const contact = [['✉', cv.email], ['☎', cv.telephone], ['⌂', cv.ville], ['in', cv.linkedin], ['⌘', cv.site]].filter(([, v]) => v)
  return (
    <div style={sheet({ display: 'grid', gridTemplateColumns: '250px 1fr', background: `linear-gradient(to right, ${c} 250px, #fff 250px)` })}>
      <aside style={{ padding: '36px 24px', color: '#e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar cv={cv} size={130} radius={cv.photo ? 65 : 65} /></div>
        {contact.length > 0 && <><H>Contact</H>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12, lineHeight: 1.5 }}>
            {contact.map(([i, v]) => <li key={i + v} style={{ display: 'flex', gap: 8, marginBottom: 7, wordBreak: 'break-word' }}><b style={{ width: 14, opacity: .8 }}>{i}</b><span>{v}</span></li>)}
          </ul></>}
        {cv.competences.length > 0 && <><H>Compétences</H>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12.5 }}>
            {cv.competences.map((s, i) => <li key={i} style={{ marginBottom: 9 }}><div style={{ marginBottom: 3 }}>{s.nom}</div><Dots n={s.niveau} color="#fff" dark /></li>)}
          </ul></>}
        {cv.langues.length > 0 && <><H>Langues</H>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12.5 }}>
            {cv.langues.map((s, i) => <li key={i} style={{ marginBottom: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>{s.nom}</span><Dots n={s.niveau} color="#fff" dark /></li>)}
          </ul></>}
        {cv.interets && <><H>Centres d’intérêt</H><p style={{ fontSize: 12, lineHeight: 1.5, margin: 0 }}>{cv.interets}</p></>}
      </aside>
      <main style={{ padding: '40px 36px 40px 34px' }}>
        <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.05, fontWeight: 800, color: c, textTransform: 'uppercase', letterSpacing: .5 }}>{fullName(cv) || 'Votre nom'}</h1>
        {cv.titre && <p style={{ margin: '8px 0 0', fontSize: 15, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: gray }}>{cv.titre}</p>}
        {cv.resume && <><M>Profil</M><p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: gray }}>{cv.resume}</p></>}
        {cv.experiences.length > 0 && <><M>Expérience professionnelle</M>
          {cv.experiences.map((e, i) => (
            <div key={i} style={{ marginBottom: 14, breakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><b style={{ fontSize: 13.5 }}>{e.role}</b><span style={{ fontSize: 11.5, color: c, fontWeight: 700, whiteSpace: 'nowrap' }}>{fmtPeriod(e.debut, e.fin, e.enCours)}</span></div>
              <div style={{ fontSize: 12, color: gray, fontStyle: 'italic' }}>{[e.entreprise, e.ville].filter(Boolean).join(' · ')}</div>
              <Bullets text={e.description} />
            </div>
          ))}</>}
        {cv.formations.length > 0 && <><M>Formation</M>
          {cv.formations.map((f, i) => (
            <div key={i} style={{ marginBottom: 12, breakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><b style={{ fontSize: 13.5 }}>{f.diplome}</b><span style={{ fontSize: 11.5, color: c, fontWeight: 700, whiteSpace: 'nowrap' }}>{fmtPeriod(f.debut, f.fin)}</span></div>
              <div style={{ fontSize: 12, color: gray, fontStyle: 'italic' }}>{[f.ecole, f.ville].filter(Boolean).join(' · ')}</div>
              {f.description && <p style={{ margin: '3px 0 0', fontSize: 12, color: gray }}>{f.description}</p>}
            </div>
          ))}</>}
      </main>
    </div>
  )
}

/* ---------- Modèle « Élégant » : bandeau + deux colonnes ---------- */
function Elegant({ cv }) {
  const c = cv.color
  const T = ({ children }) => <h3 style={{ fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase', color: c, margin: '22px 0 10px', display: 'flex', alignItems: 'center', gap: 10 }}>{children}<i style={{ flex: 1, height: 1, background: '#e2e8f0' }} /></h3>
  const contact = [cv.email, cv.telephone, cv.ville, cv.linkedin, cv.site].filter(Boolean)
  return (
    <div style={sheet({ background: '#fff' })}>
      <header style={{ background: c, color: '#fff', padding: '36px 44px', display: 'flex', alignItems: 'center', gap: 26 }}>
        {cv.photo && <img src={cv.photo} alt="" style={{ width: 104, height: 130, objectFit: 'cover', borderRadius: 14, border: '3px solid rgba(255,255,255,.7)' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.05, fontWeight: 800 }}>{fullName(cv) || 'Votre nom'}</h1>
          {cv.titre && <p style={{ margin: '8px 0 0', fontSize: 16, opacity: .92, fontWeight: 500 }}>{cv.titre}</p>}
          <p style={{ margin: '14px 0 0', fontSize: 11.5, opacity: .9, display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>{contact.map((x) => <span key={x}>{x}</span>)}</p>
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 218px', gap: 32, padding: '8px 44px 40px' }}>
        <main>
          {cv.resume && <><T>Profil</T><p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: gray }}>{cv.resume}</p></>}
          {cv.experiences.length > 0 && <><T>Expérience</T>
            {cv.experiences.map((e, i) => (
              <div key={i} style={{ marginBottom: 15, paddingLeft: 14, borderLeft: `3px solid ${c}33`, breakInside: 'avoid' }}>
                <b style={{ fontSize: 13.5 }}>{e.role}</b>
                <div style={{ fontSize: 12, color: gray }}>{[e.entreprise, e.ville].filter(Boolean).join(' · ')} <span style={{ color: c, fontWeight: 700 }}> — {fmtPeriod(e.debut, e.fin, e.enCours)}</span></div>
                <Bullets text={e.description} />
              </div>
            ))}</>}
          {cv.formations.length > 0 && <><T>Formation</T>
            {cv.formations.map((f, i) => (
              <div key={i} style={{ marginBottom: 12, paddingLeft: 14, borderLeft: `3px solid ${c}33`, breakInside: 'avoid' }}>
                <b style={{ fontSize: 13.5 }}>{f.diplome}</b>
                <div style={{ fontSize: 12, color: gray }}>{[f.ecole, f.ville].filter(Boolean).join(' · ')} <span style={{ color: c, fontWeight: 700 }}> — {fmtPeriod(f.debut, f.fin)}</span></div>
                {f.description && <p style={{ margin: '3px 0 0', fontSize: 12, color: gray }}>{f.description}</p>}
              </div>
            ))}</>}
        </main>
        <aside>
          {cv.competences.length > 0 && <><T>Compétences</T>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12.5 }}>
              {cv.competences.map((s, i) => <li key={i} style={{ marginBottom: 9 }}><div style={{ marginBottom: 3, fontWeight: 600 }}>{s.nom}</div><div style={{ height: 5, borderRadius: 5, background: '#e2e8f0' }}><div style={{ width: `${s.niveau * 20}%`, height: 5, borderRadius: 5, background: c }} /></div></li>)}
            </ul></>}
          {cv.langues.length > 0 && <><T>Langues</T>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12.5 }}>
              {cv.langues.map((s, i) => <li key={i} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 600 }}>{s.nom}</span><Dots n={s.niveau} color={c} /></li>)}
            </ul></>}
          {cv.interets && <><T>Intérêts</T><p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: gray }}>{cv.interets}</p></>}
        </aside>
      </div>
    </div>
  )
}

/* ---------- Modèle « Minimal » : une colonne, lisible par les ATS ---------- */
function Minimal({ cv }) {
  const c = cv.color
  const T = ({ children }) => <h3 style={{ fontSize: 12, letterSpacing: 2.2, textTransform: 'uppercase', margin: '22px 0 9px', paddingBottom: 5, borderBottom: `1.5px solid ${c}`, color: c }}>{children}</h3>
  const contact = [cv.email, cv.telephone, cv.ville, cv.linkedin, cv.site].filter(Boolean)
  return (
    <div style={sheet({ background: '#fff', padding: '46px 54px' })}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, borderBottom: '1px solid #e2e8f0', paddingBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: -.5 }}>{fullName(cv) || 'Votre nom'}</h1>
          {cv.titre && <p style={{ margin: '6px 0 0', fontSize: 15, color: c, fontWeight: 600 }}>{cv.titre}</p>}
          <p style={{ margin: '10px 0 0', fontSize: 11.5, color: gray, display: 'flex', flexWrap: 'wrap', gap: '3px 14px' }}>{contact.map((x) => <span key={x}>{x}</span>)}</p>
        </div>
        {cv.photo && <img src={cv.photo} alt="" style={{ width: 88, height: 110, objectFit: 'cover', borderRadius: 8 }} />}
      </header>
      {cv.resume && <><T>Profil</T><p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: gray }}>{cv.resume}</p></>}
      {cv.experiences.length > 0 && <><T>Expérience professionnelle</T>
        {cv.experiences.map((e, i) => (
          <div key={i} style={{ marginBottom: 14, breakInside: 'avoid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 13.5 }}>{e.role}{e.entreprise ? ` — ${e.entreprise}` : ''}</b><span style={{ fontSize: 11.5, color: gray }}>{fmtPeriod(e.debut, e.fin, e.enCours)}</span></div>
            {e.ville && <div style={{ fontSize: 12, color: gray }}>{e.ville}</div>}
            <Bullets text={e.description} />
          </div>
        ))}</>}
      {cv.formations.length > 0 && <><T>Formation</T>
        {cv.formations.map((f, i) => (
          <div key={i} style={{ marginBottom: 11, breakInside: 'avoid' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 13.5 }}>{f.diplome}{f.ecole ? ` — ${f.ecole}` : ''}</b><span style={{ fontSize: 11.5, color: gray }}>{fmtPeriod(f.debut, f.fin)}</span></div>
            {f.description && <p style={{ margin: '3px 0 0', fontSize: 12, color: gray }}>{f.description}</p>}
          </div>
        ))}</>}
      {cv.competences.length > 0 && <><T>Compétences</T><p style={{ margin: 0, fontSize: 12.5, color: gray, lineHeight: 1.7 }}>{cv.competences.map((s) => s.nom).join('  •  ')}</p></>}
      {cv.langues.length > 0 && <><T>Langues</T><p style={{ margin: 0, fontSize: 12.5, color: gray }}>{cv.langues.map((s) => `${s.nom} (${['', 'notions', 'scolaire', 'courant', 'avancé', 'langue maternelle'][s.niveau] || ''})`).join('  •  ')}</p></>}
      {cv.interets && <><T>Centres d’intérêt</T><p style={{ margin: 0, fontSize: 12.5, color: gray }}>{cv.interets}</p></>}
    </div>
  )
}

export default function CvSheet({ cv }) {
  const Comp = { nuit: Nuit, elegant: Elegant, minimal: Minimal }[cv.template] || Nuit
  return <div id="cv-sheet"><Comp cv={cv} /></div>
}
