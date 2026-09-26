import { useFieldArray, useFormContext } from 'react-hook-form'
import { Card, Field, Suggest } from './Fields.jsx'

const LEVELS = [[1, 'Notions'], [2, 'Scolaire'], [3, 'Courant'], [4, 'Avancé'], [5, 'Expert / natif']]

function resizePhoto(file, cb) {
  const img = new Image()
  const url = URL.createObjectURL(file)
  img.onload = () => {
    const w = 360, h = Math.round(w * (img.height / img.width))
    const c = document.createElement('canvas'); c.width = w; c.height = h
    c.getContext('2d').drawImage(img, 0, 0, w, h)
    URL.revokeObjectURL(url)
    cb(c.toDataURL('image/jpeg', 0.85))
  }
  img.src = url
}

export function StepInfos() {
  const { register, setValue, watch, formState: { errors } } = useFormContext()
  const photo = watch('photo')
  const resume = watch('resume') || ''
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="grid h-24 w-20 shrink-0 place-items-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
          {photo ? <img src={photo} alt="Votre photo" className="h-full w-full object-cover" /> : 'Photo'}
        </div>
        <div className="space-y-2">
          <label className="btn-ghost cursor-pointer !py-2 text-xs">
            Choisir une photo
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files[0] && resizePhoto(e.target.files[0], (d) => setValue('photo', d, { shouldDirty: true }))} />
          </label>
          {photo && <button type="button" className="ml-2 text-xs font-semibold text-rose-600" onClick={() => setValue('photo', '', { shouldDirty: true })}>Retirer</button>}
          <p className="text-xs text-slate-400">Facultative. Elle reste sur votre appareil.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" error={errors.prenom?.message}><input className="input" autoComplete="given-name" {...register('prenom', { required: 'Le prénom est obligatoire' })} /></Field>
        <Field label="Nom" error={errors.nom?.message}><input className="input" autoComplete="family-name" {...register('nom', { required: 'Le nom est obligatoire' })} /></Field>
        <Field label="Poste visé / intitulé" className="sm:col-span-2" error={errors.titre?.message}><input className="input" placeholder="Ex. Développeur web junior" {...register('titre', { required: 'Indiquez le poste visé' })} /></Field>
        <Field label="E-mail" error={errors.email?.message}><input className="input" type="email" autoComplete="email" {...register('email', { pattern: { value: /^\S+@\S+\.\S+$/, message: 'Adresse e-mail invalide' } })} /></Field>
        <Field label="Téléphone" error={errors.telephone?.message}><input className="input" type="tel" autoComplete="tel" placeholder="+229 01 …" {...register('telephone', { pattern: { value: /^[+\d][\d\s.()-]{7,}$/, message: 'Numéro invalide' } })} /></Field>
        <Field label="Ville, pays"><input className="input" autoComplete="address-level2" placeholder="Cotonou, Bénin" {...register('ville')} /></Field>
        <Field label="LinkedIn"><input className="input" placeholder="linkedin.com/in/…" {...register('linkedin')} /></Field>
        <Field label="Site web / portfolio" className="sm:col-span-2"><input className="input" placeholder="monportfolio.com" {...register('site')} /></Field>
      </div>
      <div>
        <Field label="Résumé / accroche" hint={`${resume.length} caractères — visez 150 à 500`}>
          <textarea className="input min-h-28" {...register('resume')} placeholder="Présentez-vous en 2 ou 3 phrases : votre profil, vos points forts, ce que vous cherchez." />
        </Field>
        <Suggest group="Accroches" onPick={(t) => setValue('resume', t, { shouldDirty: true })} />
      </div>
    </div>
  )
}

function ArrayHeader({ title, onAdd, addLabel }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
      <button type="button" onClick={onAdd} className="btn-primary !py-2 text-xs">＋ {addLabel}</button>
    </div>
  )
}

export function StepExperiences() {
  const { register, watch, setValue, control } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'experiences' })
  return (
    <div className="space-y-4">
      <ArrayHeader title="Expériences professionnelles" addLabel="Ajouter" onAdd={() => append({ role: '', entreprise: '', ville: '', debut: '', fin: '', enCours: false, description: '' })} />
      {fields.length === 0 && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Aucune expérience. Ajoutez un emploi, un stage ou un projet marquant.</p>}
      {fields.map((f, i) => {
        const current = watch(`experiences.${i}.enCours`)
        return (
          <Card key={f.id} title={watch(`experiences.${i}.role`) || `Expérience ${i + 1}`} onRemove={() => remove(i)} onUp={i > 0 ? () => move(i, i - 1) : null} onDown={i < fields.length - 1 ? () => move(i, i + 1) : null}>
            <Field label="Poste"><input className="input" {...register(`experiences.${i}.role`)} /></Field>
            <Field label="Entreprise"><input className="input" {...register(`experiences.${i}.entreprise`)} /></Field>
            <Field label="Ville"><input className="input" {...register(`experiences.${i}.ville`)} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Début"><input className="input" type="month" {...register(`experiences.${i}.debut`)} /></Field>
              <Field label="Fin"><input className="input" type="month" disabled={current} {...register(`experiences.${i}.fin`)} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2"><input type="checkbox" className="h-4 w-4 accent-blue-700" {...register(`experiences.${i}.enCours`)} /> J’occupe encore ce poste</label>
            <div className="sm:col-span-2">
              <Field label="Missions et réalisations" hint="Une puce par ligne. Commencez par un verbe d’action et ajoutez des chiffres."><textarea className="input min-h-28" {...register(`experiences.${i}.description`)} /></Field>
              <Suggest group="Puces d’expérience" onPick={(t) => setValue(`experiences.${i}.description`, ((watch(`experiences.${i}.description`) || '') + '\n' + t).trim(), { shouldDirty: true })} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export function StepFormations() {
  const { register, watch, control } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'formations' })
  return (
    <div className="space-y-4">
      <ArrayHeader title="Formations et diplômes" addLabel="Ajouter" onAdd={() => append({ diplome: '', ecole: '', ville: '', debut: '', fin: '', description: '' })} />
      {fields.length === 0 && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Ajoutez votre diplôme le plus récent en premier.</p>}
      {fields.map((f, i) => (
        <Card key={f.id} title={watch(`formations.${i}.diplome`) || `Formation ${i + 1}`} onRemove={() => remove(i)} onUp={i > 0 ? () => move(i, i - 1) : null} onDown={i < fields.length - 1 ? () => move(i, i + 1) : null}>
          <Field label="Diplôme / intitulé" className="sm:col-span-2"><input className="input" {...register(`formations.${i}.diplome`)} /></Field>
          <Field label="École / université"><input className="input" {...register(`formations.${i}.ecole`)} /></Field>
          <Field label="Ville"><input className="input" {...register(`formations.${i}.ville`)} /></Field>
          <Field label="Année de début"><input className="input" inputMode="numeric" placeholder="2023" {...register(`formations.${i}.debut`)} /></Field>
          <Field label="Année de fin"><input className="input" inputMode="numeric" placeholder="2026" {...register(`formations.${i}.fin`)} /></Field>
          <Field label="Détails (facultatif)" className="sm:col-span-2"><input className="input" {...register(`formations.${i}.description`)} /></Field>
        </Card>
      ))}
    </div>
  )
}

function LevelRow({ base, i, remove, placeholder }) {
  const { register } = useFormContext()
  return (
    <div className="flex items-center gap-2">
      <input className="input flex-1" placeholder={placeholder} aria-label="Nom" {...register(`${base}.${i}.nom`)} />
      <select className="input !w-40" aria-label="Niveau" {...register(`${base}.${i}.niveau`, { valueAsNumber: true })}>
        {LEVELS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <button type="button" onClick={() => remove(i)} className="rounded-lg px-2 py-2 text-rose-500 hover:bg-rose-50" aria-label="Supprimer">🗑</button>
    </div>
  )
}

export function StepSkills() {
  const { register, control } = useFormContext()
  const sk = useFieldArray({ control, name: 'competences' })
  const lg = useFieldArray({ control, name: 'langues' })
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <ArrayHeader title="Compétences" addLabel="Ajouter" onAdd={() => sk.append({ nom: '', niveau: 3 })} />
        {sk.fields.map((f, i) => <LevelRow key={f.id} base="competences" i={i} remove={sk.remove} placeholder="Ex. React" />)}
        {sk.fields.length === 0 && <p className="text-sm text-slate-500">Ajoutez 5 à 10 compétences clés.</p>}
      </div>
      <div className="space-y-3">
        <ArrayHeader title="Langues" addLabel="Ajouter" onAdd={() => lg.append({ nom: '', niveau: 3 })} />
        {lg.fields.map((f, i) => <LevelRow key={f.id} base="langues" i={i} remove={lg.remove} placeholder="Ex. Anglais" />)}
      </div>
      <Field label="Centres d’intérêt"><input className="input" placeholder="Football, lecture, bénévolat…" {...register('interets')} /></Field>
    </div>
  )
}
