function ChevronRightIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function WorkChatList({ works, servicesById, onOpenWork }) {
  const list = Array.isArray(works) ? works : []

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
        Aún no hay trabajos cargados.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
      <ul className="divide-y divide-zinc-200 dark:divide-white/10">
        {list.map((work) => {
          const service = servicesById?.[work.serviceId]
          const avatar = work.avatar || '/works/placeholder.svg'

          return (
            <li key={work.id}>
              <button
                type="button"
                onClick={() => onOpenWork?.(work.id)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-zinc-50 dark:hover:bg-white/[0.05]"
              >
                <img
                  src={avatar}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full border border-zinc-200 bg-zinc-50 object-cover dark:border-white/10 dark:bg-white/5"
                  loading="lazy"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                      {work.title || 'Trabajo'}
                    </p>
                    {service?.name ? (
                      <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        {service.name}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 truncate text-sm text-zinc-600 dark:text-white/60">
                    {work.summary || work.vehicle || ''}
                  </p>
                </div>

                <ChevronRightIcon className="h-5 w-5 shrink-0 text-zinc-400 dark:text-white/30" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


