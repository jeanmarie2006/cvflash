import { useCallback, useEffect, useState } from 'react'
import { makeDb, uid } from './db.js'
import { EMPTY_CV, SAMPLES } from './cvData.js'

const db = makeDb('cvflash')

function initial() {
  let list = db.read('cvs', null)
  if (!list || !list.length) {
    list = [{ id: uid(), name: 'Mon premier CV', data: structuredClone(SAMPLES.dev), updated: Date.now() }]
    db.write('cvs', list)
  }
  const cur = db.read('current', null)
  return { list, current: list.find((c) => c.id === cur)?.id || list[0].id }
}

/** Plusieurs CV sauvegardés dans le navigateur (brouillons enregistrés automatiquement). */
export function useCvs() {
  const [{ list, current }, setState] = useState(initial)
  useEffect(() => { db.write('cvs', list); db.write('current', current) }, [list, current])

  const active = list.find((c) => c.id === current) || list[0]
  const save = useCallback((id, data) => setState((s) => ({ ...s, list: s.list.map((c) => (c.id === id ? { ...c, data, updated: Date.now() } : c)) })), [])
  const select = useCallback((id) => setState((s) => ({ ...s, current: id })), [])
  const create = useCallback((data, name) => {
    const c = { id: uid(), name: name || 'Nouveau CV', data: structuredClone(data || EMPTY_CV), updated: Date.now() }
    setState((s) => ({ list: [...s.list, c], current: c.id }))
  }, [])
  const rename = useCallback((id, name) => setState((s) => ({ ...s, list: s.list.map((c) => (c.id === id ? { ...c, name } : c)) })), [])
  const remove = useCallback((id) => setState((s) => {
    const next = s.list.filter((c) => c.id !== id)
    if (!next.length) { const c = { id: uid(), name: 'Nouveau CV', data: structuredClone(EMPTY_CV), updated: Date.now() }; return { list: [c], current: c.id } }
    return { list: next, current: s.current === id ? next[0].id : s.current }
  }), [])
  return { list, active, save, select, create, rename, remove }
}
