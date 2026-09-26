// Données du CV, exemples, indicateur de qualité, suggestions et partage par lien.

export const EMPTY_CV = {
  template: 'nuit',
  color: '#1e3a8a',
  photo: '',
  titre: '',
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  ville: '',
  linkedin: '',
  site: '',
  resume: '',
  experiences: [],
  formations: [],
  competences: [],
  langues: [],
  interets: '',
}

export const SAMPLES = {
  dev: {
    ...EMPTY_CV,
    template: 'nuit', color: '#1e3a8a',
    titre: 'Développeur web junior', prenom: 'Koffi', nom: 'Dossou',
    email: 'koffi.dossou@exemple.com', telephone: '+229 01 90 00 00 00', ville: 'Cotonou, Bénin',
    linkedin: 'linkedin.com/in/koffi-dossou', site: 'koffidossou.dev',
    resume: 'Développeur web junior passionné par la création d’applications modernes et fonctionnelles. Je maîtrise HTML, CSS, JavaScript, React, PHP/Laravel et MySQL, et je cherche un premier poste pour mettre ces compétences au service de projets web concrets.',
    experiences: [
      { role: 'Développeur web (stage)', entreprise: 'Agence Digitale Bénin', ville: 'Cotonou', debut: '2025-07', fin: '2025-09', enCours: false, description: 'Développement de pages responsives en React et Tailwind CSS.\nIntégration d’une API Laravel pour la gestion des commandes.\nCorrection de 30 bugs et amélioration des performances de 25 %.' },
      { role: 'Développeur freelance', entreprise: 'Indépendant', ville: 'Cotonou', debut: '2024-02', fin: '', enCours: true, description: 'Création de 5 sites vitrines pour des commerces locaux.\nMise en ligne et maintenance des sites (hébergement, SEO de base).' },
    ],
    formations: [
      { diplome: 'Licence en Génie logiciel', ecole: 'Université EIG Bénin', ville: 'Cotonou', debut: '2023', fin: '2026', description: 'Programmation web, bases de données, algorithmique, gestion de projet.' },
      { diplome: 'Baccalauréat série C', ecole: 'Lycée Béhanzin', ville: 'Porto-Novo', debut: '2020', fin: '2023', description: '' },
    ],
    competences: [
      { nom: 'JavaScript', niveau: 4 }, { nom: 'React', niveau: 4 }, { nom: 'HTML / CSS', niveau: 5 },
      { nom: 'PHP / Laravel', niveau: 3 }, { nom: 'MySQL', niveau: 3 }, { nom: 'Git & GitHub', niveau: 4 },
    ],
    langues: [{ nom: 'Français', niveau: 5 }, { nom: 'Anglais', niveau: 3 }, { nom: 'Fon', niveau: 5 }],
    interets: 'Open source, football, lecture de romans policiers.',
  },
  marketing: {
    ...EMPTY_CV,
    template: 'elegant', color: '#be185d',
    titre: 'Chargée de marketing digital', prenom: 'Amina', nom: 'Traoré',
    email: 'amina.traore@exemple.com', telephone: '+229 01 96 00 00 00', ville: 'Abomey-Calavi, Bénin',
    linkedin: 'linkedin.com/in/amina-traore', site: '',
    resume: 'Chargée de marketing digital avec 3 ans d’expérience en gestion de réseaux sociaux, campagnes publicitaires et création de contenu. J’ai fait progresser l’audience de plusieurs marques locales de 150 % et je cherche à rejoindre une équipe ambitieuse.',
    experiences: [
      { role: 'Community manager', entreprise: 'Studio Kpanon', ville: 'Cotonou', debut: '2024-01', fin: '', enCours: true, description: 'Animation de 4 comptes de marques (Facebook, Instagram, TikTok).\nAugmentation de l’audience de 150 % en 8 mois.\nPilotage de campagnes publicitaires avec un budget mensuel de 300 000 FCFA.' },
      { role: 'Assistante marketing', entreprise: 'Sodeco Distribution', ville: 'Cotonou', debut: '2022-06', fin: '2023-12', enCours: false, description: 'Rédaction des newsletters et des fiches produits.\nOrganisation de 3 événements clients (plus de 200 participants).' },
    ],
    formations: [{ diplome: 'Licence en Marketing et communication', ecole: 'Université d’Abomey-Calavi', ville: 'Abomey-Calavi', debut: '2019', fin: '2022', description: '' }],
    competences: [
      { nom: 'Réseaux sociaux', niveau: 5 }, { nom: 'Canva / Photoshop', niveau: 4 }, { nom: 'Meta Ads', niveau: 4 },
      { nom: 'Rédaction web', niveau: 4 }, { nom: 'Google Analytics', niveau: 3 },
    ],
    langues: [{ nom: 'Français', niveau: 5 }, { nom: 'Anglais', niveau: 4 }],
    interets: 'Photographie, mode africaine, bénévolat.',
  },
  compta: {
    ...EMPTY_CV,
    template: 'minimal', color: '#0f766e',
    titre: 'Assistant comptable', prenom: 'Serge', nom: 'Hounkpatin',
    email: 'serge.hounkpatin@exemple.com', telephone: '+229 01 95 00 00 00', ville: 'Porto-Novo, Bénin',
    linkedin: '', site: '',
    resume: 'Assistant comptable rigoureux, à l’aise avec la saisie des écritures, les déclarations fiscales et le classement des pièces. Je souhaite mettre mon sens de l’organisation au service d’un cabinet ou d’une PME.',
    experiences: [
      { role: 'Stagiaire comptable', entreprise: 'Cabinet EXCCA', ville: 'Cotonou', debut: '2025-04', fin: '2025-07', enCours: false, description: 'Saisie comptable de 12 dossiers clients.\nPréparation des déclarations mensuelles de TVA.\nClassement et archivage des pièces justificatives.' },
    ],
    formations: [
      { diplome: 'Licence 1 en Gestion', ecole: 'FASEG — Université d’Abomey-Calavi', ville: 'Abomey-Calavi', debut: '2024', fin: '2025', description: '' },
      { diplome: 'Baccalauréat série G2', ecole: 'Lycée technique', ville: 'Porto-Novo', debut: '2021', fin: '2024', description: '' },
    ],
    competences: [
      { nom: 'Saisie comptable', niveau: 4 }, { nom: 'Excel', niveau: 4 }, { nom: 'Déclarations fiscales', niveau: 3 },
      { nom: 'Sage / Ciel Compta', niveau: 3 }, { nom: 'Classement & archivage', niveau: 5 }, { nom: 'Rigueur', niveau: 5 },
    ],
    langues: [{ nom: 'Français', niveau: 5 }, { nom: 'Anglais', niveau: 2 }],
    interets: 'Échecs, football, bénévolat associatif.',
  },
}

export const TEMPLATES = [
  { id: 'nuit', nom: 'Nuit', desc: 'Colonne latérale foncée avec photo' },
  { id: 'elegant', nom: 'Élégant', desc: 'Bandeau d’en-tête et deux colonnes' },
  { id: 'minimal', nom: 'Minimal', desc: 'Une colonne sobre, adaptée aux logiciels de tri (ATS)' },
]
export const COLORS = ['#1e3a8a', '#0f766e', '#be185d', '#b45309', '#4338ca', '#111827']

export const fullName = (cv) => [cv.prenom, cv.nom].filter(Boolean).join(' ')
export const initials = (cv) => ((cv.prenom?.[0] || '') + (cv.nom?.[0] || '')).toUpperCase() || 'CV'
export const lines = (t) => (t || '').split('\n').map((l) => l.trim()).filter(Boolean)

const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
export function fmtPeriod(start, end, current) {
  const f = (d) => {
    if (!d) return ''
    const m = /^(\d{4})-(\d{2})$/.exec(d)
    return m ? `${MOIS[Number(m[2]) - 1]} ${m[1]}` : d
  }
  const a = f(start)
  const b = current ? 'Aujourd’hui' : f(end)
  return [a, b].filter(Boolean).join(' – ')
}

// ---------- Indicateur de qualité ----------
const VERBES = ['développé', 'créé', 'conçu', 'géré', 'organisé', 'animé', 'augmenté', 'réduit', 'mis en place', 'piloté', 'rédigé', 'intégré', 'amélioré', 'réalisé', 'préparé', 'coordonné', 'déployé', 'analysé', 'négocié', 'formé']

export function analyzeCv(cv) {
  const checks = []
  const add = (ok, label, tip, pts) => checks.push({ ok, label, tip, pts })
  const contact = [cv.email, cv.telephone, cv.ville].filter(Boolean).length
  add(!!(cv.prenom && cv.nom && cv.titre), 'Nom et intitulé du poste', 'Indiquez votre nom complet et le poste visé.', 10)
  add(contact === 3, 'Coordonnées complètes', 'Ajoutez e-mail, téléphone et ville.', 10)
  const rl = (cv.resume || '').length
  add(rl >= 150 && rl <= 500, 'Résumé de 150 à 500 caractères', rl < 150 ? `Votre résumé est trop court (${rl} caractères).` : `Votre résumé est trop long (${rl} caractères).`, 15)
  add(cv.experiences.length >= 1, 'Au moins une expérience', 'Ajoutez un stage, un job ou un projet.', 15)
  const descs = cv.experiences.map((e) => e.description || '').join(' ').toLowerCase()
  add(cv.experiences.length > 0 && cv.experiences.every((e) => lines(e.description).length >= 2), 'Expériences détaillées (2 puces ou plus)', 'Décrivez vos missions avec au moins 2 points par expérience.', 15)
  add(/\d/.test(descs), 'Résultats chiffrés', 'Ajoutez des chiffres (%, nombre de clients, délais) pour prouver votre impact.', 10)
  add(VERBES.some((v) => descs.includes(v)), 'Verbes d’action', 'Commencez vos puces par des verbes comme « Développé », « Géré », « Organisé ».', 5)
  add(cv.formations.length >= 1, 'Formation renseignée', 'Ajoutez votre diplôme le plus récent.', 10)
  add(cv.competences.length >= 5, 'Au moins 5 compétences', 'Listez 5 à 10 compétences clés.', 5)
  add(cv.langues.length >= 1, 'Langues', 'Ajoutez au moins une langue.', 5)
  const score = checks.reduce((s, c) => s + (c.ok ? c.pts : 0), 0)
  const words = [cv.resume, descs].join(' ').split(/\s+/).filter(Boolean).length
  const verdict = score >= 85 ? 'Excellent' : score >= 65 ? 'Bon' : score >= 40 ? 'À améliorer' : 'Incomplet'
  return { score, checks, verdict, words }
}

// ---------- Suggestions de formulation ----------
export const SUGGESTIONS = {
  Accroches: [
    'Développeur web junior motivé, à l’aise avec React et Laravel, à la recherche d’un premier poste pour concevoir des applications utiles et bien conçues.',
    'Jeune diplômé rigoureux et curieux, doté d’un bon esprit d’équipe, je souhaite mettre mes compétences au service d’une entreprise ambitieuse.',
    'Professionnel du marketing digital orienté résultats, spécialisé dans les réseaux sociaux et la création de contenu qui engage.',
    'Comptable rigoureux, à l’aise avec la saisie, les déclarations et le suivi des pièces, je cherche à rejoindre un cabinet dynamique.',
  ],
  'Puces d’expérience': [
    'Développé des interfaces responsives avec React et Tailwind CSS pour plus de 10 pages.',
    'Géré un portefeuille de 25 clients et suivi leurs demandes du premier contact à la livraison.',
    'Organisé 3 événements réunissant plus de 200 participants.',
    'Réduit le temps de traitement des dossiers de 30 % grâce à un nouveau classement.',
    'Mis en place un tableau de bord Excel pour suivre les ventes chaque semaine.',
    'Rédigé et publié 40 contenus par mois sur les réseaux sociaux (+150 % d’audience).',
  ],
}

// ---------- Partage par lien (données encodées dans l'adresse, aucune donnée envoyée à un serveur) ----------
const b64 = {
  enc: (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  dec: (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))),
}
export function encodeShare(cv) {
  const { photo, ...rest } = cv
  return b64.enc(JSON.stringify(rest))
}
export function decodeShare(hash) {
  try { return { ...EMPTY_CV, ...JSON.parse(b64.dec(hash)) } } catch { return null }
}
