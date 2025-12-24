export function Gallery({ images, altPrefix }) {
  const list = Array.isArray(images) ? images : []

  if (list.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60">
        Sin fotos aún.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {list.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt={`${altPrefix || 'Foto'} ${idx + 1}`}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-xl border border-zinc-200 bg-zinc-50 object-cover dark:border-white/10 dark:bg-white/5"
        />
      ))}
    </div>
  )
}


