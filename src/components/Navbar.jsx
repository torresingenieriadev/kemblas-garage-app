function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Z" />
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      <path d="M17.6 6.4a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    </svg>
  )
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.131.57-.074 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.551 4.193 1.597 6.013L0 24l6.135-1.61a11.771 11.771 0 005.911 1.64h.005c6.637 0 12.032-5.395 12.035-12.032a11.762 11.762 0 00-3.489-8.452" />
    </svg>
  )
}

export function Navbar({ site }) {
  const workshopName = site?.workshopName || 'Taller'
  const logoSrc = site?.brand?.logo
  const instagramUrl = site?.contact?.instagram
  const whatsappPhone = site?.contact?.whatsappPhone?.replace(/\D/g, '')
  const whatsappUrl = whatsappPhone ? `https://wa.me/${whatsappPhone}` : null

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={workshopName}
              className="h-10 w-auto shrink-0 sm:h-12 brightness-110"
            />
          ) : (
            <div className="h-9 w-9 shrink-0 rounded-xl bg-white/10" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide text-white">
              {workshopName}
            </p>
            {site?.tagline ? (
              <p className="truncate text-xs text-white/60">
                {site.tagline}
              </p>
            ) : null}
          </div>
        </a>

        <nav className="ml-auto hidden items-center gap-5 text-sm lg:flex">
          <a
            href="#servicios"
            className="text-white/70 hover:text-white transition-colors"
          >
            Servicios
          </a>
          <a
            href="#destacado"
            className="text-white/70 hover:text-white transition-colors"
          >
            Destacado
          </a>
          <a
            href="#proceso"
            className="text-white/70 hover:text-white transition-colors"
          >
            Proceso
          </a>
          <a
            href="#trabajos"
            className="text-white/70 hover:text-white transition-colors"
          >
            Trabajos
          </a>
          <a
            href="#productos"
            className="text-white/70 hover:text-white transition-colors"
          >
            Productos
          </a>
          <a
            href="#certificado"
            className="text-white/70 hover:text-white transition-colors"
          >
            Certificado
          </a>
          <a
            href="#contacto"
            className="text-white/70 hover:text-white transition-colors"
          >
            Contacto
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:ml-4">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 transition-colors shadow-lg shadow-black/20"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          )}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 transition-colors shadow-lg shadow-black/20"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-3 lg:hidden">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 text-sm no-scrollbar">
          <a
            href="#servicios"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Servicios
          </a>
          <a
            href="#destacado"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Destacado
          </a>
          <a
            href="#proceso"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Proceso
          </a>
          <a
            href="#trabajos"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Trabajos
          </a>
          <a
            href="#productos"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Productos
          </a>
          <a
            href="#certificado"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Certificado
          </a>
          <a
            href="#contacto"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            Contacto
          </a>
        </div>
      </div>
    </header>
  )
}


