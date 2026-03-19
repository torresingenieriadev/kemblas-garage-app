import { formatCurrency } from '../lib/format'

function CarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  )
}

function SUVIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.18 7.32l-1.87-3.23A1.996 1.996 0 0015.58 3H8.42c-.73 0-1.4.39-1.73 1.05L4.82 7.32C4.31 8.21 4 9.22 4 10.27V18c0 1.1.9 2 2 2h1v-1c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v1h1c1.1 0 2-.9 2-2v-7.73c0-1.05-.31-2.06-.82-2.95zM7.5 16c-.83 0-1.5-.67-1.5-1.5S6.67 13 7.5 13s1.5.67 1.5 1.5S8.33 16 7.5 16zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-10-6l1.3-2.3c.16-.27.45-.43.76-.43h6.88c.31 0 .6.16.76.43L17.5 10h-11z" />
    </svg>
  )
}

function VanIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 6h-2c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h1v1c0 .55.45 1 1 1s1-.45 1-1v-1h8v1c0 .55.45 1 1 1s1-.45 1-1v-1h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 11H7v-4h10v4zm0-6H7V8h10v3z" />
    </svg>
  )
}

function CheckIcon({ className }) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" className={className}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export function CatalogCard({ service, categoryId, currency = 'COP' }) {
  const isInterior = categoryId === 'limpieza-interior'
  const suvLabel = isInterior ? 'SUV 5 Pts / Platón' : 'SUV 5 Puestos'
  const vanLabel = isInterior ? 'SUV 7 Puestos' : '7 Pts / Platón'

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-1 hover:bg-zinc-800/80 transition-all hover:-translate-y-1 shadow-2xl h-full backdrop-blur-sm">
      <div className="flex flex-col h-full bg-zinc-950/80 rounded-[22px] p-6 lg:p-8">
        {/* ENCABEZADO */}
        <div className="mb-6 flex justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-black text-white group-hover:text-red-500 transition-colors">
              {service.name}
            </h3>
            {service.description && (
              <p className="mt-3 text-sm text-white/60 leading-relaxed font-medium">
                {service.description}
              </p>
            )}
          </div>
        </div>

        {/* PRECIOS POR VEHÍCULO */}
        {service.prices && (
          <div className="mb-8 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 text-center transition-colors hover:bg-white/10 hover:border-red-500/30">
              <CarIcon className="h-6 w-6 text-red-500 mb-2 opacity-80" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Automóvil</p>
              <p className="text-sm lg:text-base font-black text-white">
                {formatCurrency(service.prices.auto, currency)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 text-center transition-colors hover:bg-white/10 hover:border-red-500/30">
              <SUVIcon className="h-6 w-6 text-red-500 mb-2 opacity-80" />
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{suvLabel}</p>
              <p className="text-sm lg:text-base font-black text-white">
                {formatCurrency(service.prices.suv, currency)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 text-center transition-colors hover:bg-white/10 hover:border-red-500/30">
              <VanIcon className="h-6 w-6 text-red-500 mb-2 opacity-80" />
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{vanLabel}</p>
              <p className="text-sm lg:text-base font-black text-white">
                {formatCurrency(service.prices.van7, currency)}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6 flex-grow">
          {/* CARACTERÍSTICAS / PROCESO */}
          {Array.isArray(service.features) && service.features.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                Qué incluye
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                {service.features.map((f, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckIcon className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                    <span className="min-w-0 font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BENEFICIOS */}
          {Array.isArray(service.benefits) && service.benefits.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                Beneficios clave
              </p>
              <div className="flex flex-wrap gap-2">
                {service.benefits.map((b, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-lg bg-red-950/30 px-3 py-1.5 text-xs font-semibold text-red-200 border border-red-900/30 backdrop-blur-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PIE DE TARJETA (Protección y Addons) */}
        <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
          {service.protection && (
            <div className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-red-600/10 to-transparent p-4 border border-red-500/10">
              <svg className="h-5 w-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 19.93c-3.95-1.17-7-5.27-7-9.93V6.3l7-3.11 7 3.11v4.63c0 4.66-3.05 8.76-7 9.93z" />
                <path d="M10.5 14.5l-2.5-2.5 1.41-1.41L10.5 11.67l4.59-4.59L16.5 8.5z" />
              </svg>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-200 mb-1">Protección</p>
                <p className="text-sm font-medium text-white/80">{service.protection}</p>
              </div>
            </div>
          )}

          {Array.isArray(service.addons) && service.addons.length > 0 && (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Opcionales</p>
              <ul className="space-y-2">
                {service.addons.map((a, idx) => (
                  <li key={idx} className="flex justify-between items-center text-white/60">
                    <span className="font-medium">+{a.name}</span>
                    <span className="font-bold text-white bg-white/10 px-2 py-1 rounded-md text-xs">{formatCurrency(a.price, currency)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
