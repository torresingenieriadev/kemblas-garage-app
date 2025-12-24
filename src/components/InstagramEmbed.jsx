import { useEffect, useMemo } from 'react'

function getEmbedScript() {
  const candidates = [
    'https://www.instagram.com/embed.js',
    '//www.instagram.com/embed.js',
  ]

  for (const src of candidates) {
    const el = document.querySelector(`script[src="${src}"]`)
    if (el) return el
  }

  return null
}

function loadEmbedScript() {
  const existing = getEmbedScript()
  if (existing) return existing

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.instagram.com/embed.js'
  document.body.appendChild(script)
  return script
}

function processEmbeds() {
  // La API la expone el script oficial de Instagram
  window.instgrm?.Embeds?.process?.()
}

export function InstagramEmbed({ permalink, captioned = true }) {
  const cleanPermalink = useMemo(() => {
    if (typeof permalink !== 'string') return null
    const trimmed = permalink.trim()
    return trimmed.length ? trimmed : null
  }, [permalink])

  useEffect(() => {
    if (!cleanPermalink) return

    const script = loadEmbedScript()

    // Si ya estaba cargado, procesamos de una.
    if (window.instgrm) {
      processEmbeds()
      return
    }

    // Si se está cargando, procesamos al terminar.
    const onLoad = () => processEmbeds()
    script.addEventListener('load', onLoad, { once: true })

    return () => script.removeEventListener('load', onLoad)
  }, [cleanPermalink])

  useEffect(() => {
    if (!cleanPermalink) return
    // Re-procesa cuando React re-renderiza el bloque.
    processEmbeds()
  }, [cleanPermalink])

  if (!cleanPermalink) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-white">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={cleanPermalink}
        data-instgrm-version="14"
        data-instgrm-captioned={captioned}
        style={{
          margin: 0,
          width: '100%',
        }}
      >
        <a
          href={cleanPermalink}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block', padding: 16 }}
        >
          Ver en Instagram
        </a>
      </blockquote>
    </div>
  )
}


