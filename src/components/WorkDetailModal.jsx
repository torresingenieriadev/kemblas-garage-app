import { useEffect, useMemo } from 'react'
import { Gallery } from './Gallery.jsx'

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" />
    </svg>
  )
}

export function WorkDetailModal({ open, work, service, onClose }) {
  const title = useMemo(() => work?.title || 'Detalle del trabajo', [work])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || !work) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => onClose?.()}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-5xl overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-2xl sm:rounded-2xl dark:border-white/10 dark:bg-zinc-950"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-white/10">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-zinc-900 dark:text-white">
              {work.title || 'Trabajo'}
            </p>
            <p className="mt-1 truncate text-sm text-zinc-600 dark:text-white/60">
              {service?.name ? `${service.name} · ` : ''}
              {work.vehicle || ''}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
            aria-label="Cerrar"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[85vh] overflow-auto px-5 py-5">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Antes
              </p>
              <Gallery images={work.beforePhotos} altPrefix="Antes" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Resultado
              </p>
              <Gallery images={work.afterPhotos} altPrefix="Resultado" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Notas
              </p>
              {Array.isArray(work.notes) && work.notes.length > 0 ? (
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-white/70">
                  {work.notes.map((n, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-white/30" />
                      <span className="min-w-0">{n}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Sin notas.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Productos usados
              </p>
              {Array.isArray(work.productsUsed) && work.productsUsed.length > 0 ? (
                <ul className="space-y-2">
                  {work.productsUsed.map((p, idx) => (
                    <li
                      key={`${p.name}-${idx}`}
                      className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {p.name}
                      </p>
                      {p.detail ? (
                        <p className="mt-1 text-zinc-600 dark:text-white/60">
                          {p.detail}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-600 dark:text-white/60">
                  Sin productos registrados.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


