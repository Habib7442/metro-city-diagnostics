export default function Maintenance() {
  return (
    <section className="flex min-h-screen flex-grow items-center justify-center bg-navy-900 px-6 py-16">
      <div className="w-full max-w-xl rounded-xl border border-gold-500/30 bg-navy-800 p-8 text-center shadow-2xl md:p-12">
        {/* Sad browser window illustration */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 220 170"
          fill="none"
          className="mx-auto mb-8 h-40 w-auto md:h-48"
          aria-hidden="true"
        >
          {/* Shadow */}
          <ellipse cx="110" cy="160" rx="70" ry="6" className="fill-gold-500/15" />

          {/* Browser window */}
          <rect x="20" y="10" width="180" height="135" rx="14" className="fill-navy-900 stroke-gold-500" strokeWidth="3" />
          <path d="M20 24a14 14 0 0 1 14-14h152a14 14 0 0 1 14 14v12H20z" className="fill-gold-500/20" />
          <line x1="20" y1="36" x2="200" y2="36" className="stroke-gold-500" strokeWidth="3" />
          <circle cx="36" cy="23" r="4" className="fill-gold-500" />
          <circle cx="50" cy="23" r="4" className="fill-gold-300/70" />
          <circle cx="64" cy="23" r="4" className="fill-navy-100/40" />

          {/* Crack across the screen */}
          <path
            d="M160 36l-8 14 10 6-12 12 6 8"
            className="stroke-gold-300/60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Eyes (X shaped) */}
          <g className="stroke-navy-100" strokeWidth="4" strokeLinecap="round">
            <line x1="76" y1="66" x2="90" y2="80" />
            <line x1="90" y1="66" x2="76" y2="80" />
            <line x1="130" y1="66" x2="144" y2="80" />
            <line x1="144" y1="66" x2="130" y2="80" />
          </g>

          {/* Sad mouth */}
          <path
            d="M84 118c8-12 44-12 52 0"
            className="stroke-navy-100"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Tear */}
          <path d="M83 88c-4 6-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6-6-12z" className="fill-navy-500" />

          {/* Warning badge */}
          <circle cx="192" cy="138" r="20" className="fill-gold-500 stroke-navy-800" strokeWidth="4" />
          <line x1="192" y1="128" x2="192" y2="141" className="stroke-navy-900" strokeWidth="4" strokeLinecap="round" />
          <circle cx="192" cy="149" r="2.5" className="fill-navy-900" />
        </svg>

        <p className="mb-3 font-mono text-[0.8125rem] font-medium uppercase tracking-widest text-gold-300">
          Immediate Action Required
        </p>

        <h1 className="mb-4 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
          This website needs urgent maintenance
        </h1>

        <p className="text-lg leading-relaxed text-navy-100">
          Critical updates for this website are pending and must be completed
          immediately. Until they are done, the website has been taken offline
          and its pages, services and booking features are unavailable.
        </p>

        <div className="mx-auto mt-8 h-px w-24 bg-gold-500/40" />

        <p className="mt-6 text-sm text-navy-100/70">
          Access will be restored only after the required updates are completed.
        </p>
      </div>
    </section>
  );
}
