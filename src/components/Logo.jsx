import { Link } from 'react-router-dom'

export default function Logo({ to = '/' }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 font-extrabold tracking-tight" aria-label="CVFlash — accueil">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3h8l4 4v14H6z" /><path d="M9 12h6M9 16h6M9 8h2" />
        </svg>
      </span>
      <span className="text-lg">CV<span className="text-brand-600">Flash</span></span>
    </Link>
  )
}
