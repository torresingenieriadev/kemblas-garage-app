import { useMemo, useState } from 'react'
import products from './content/products.json'
import services from './content/services.json'
import site from './content/site.json'
import works from './content/works.json'
import { InstagramEmbed } from './components/InstagramEmbed.jsx'
import { Navbar } from './components/Navbar.jsx'
import { WorkChatList } from './components/WorkChatList.jsx'
import { WorkDetailModal } from './components/WorkDetailModal.jsx'
import { formatCurrency, buildWhatsAppUrl } from './lib/format.js'
import { applyTheme, getInitialTheme } from './lib/theme.js'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Z" />
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      <path d="M17.6 6.4a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    </svg>
  )
}

function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.25c-3.94 0-7.15 3.17-7.15 7.08 0 5.47 6.09 11.79 6.35 12.05.44.44 1.16.44 1.6 0 .26-.26 6.35-6.58 6.35-12.05C19.15 5.42 15.94 2.25 12 2.25Zm0 10.5a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeWorkId, setActiveWorkId] = useState(null)

  const servicesById = useMemo(
    () => Object.fromEntries(services.map((s) => [s.id, s])),
    [],
  )
  const activeWork = useMemo(
    () => works.find((w) => w.id === activeWorkId) || null,
    [activeWorkId],
  )
  const activeService = activeWork ? servicesById[activeWork.serviceId] : null

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(site?.contact?.whatsappPhone, site?.cta?.whatsappMessage),
    [],
  )
  const instagramHandle = useMemo(() => {
    const url = site?.contact?.instagram
    if (!url) return null
    try {
      const u = new URL(url)
      const first = u.pathname.split('/').filter(Boolean)[0]
      return first ? `@${first}` : 'Instagram'
    } catch {
      return 'Instagram'
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar
        site={site}
        theme={theme}
        onToggleTheme={() => {
          const next = theme === 'dark' ? 'light' : 'dark'
          setTheme(next)
          applyTheme(next)
        }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* HERO */}
        <section id="inicio" className="py-2 sm:py-4">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 p-7 sm:p-10 dark:border-white/10 dark:bg-white/[0.03] min-h-[650px] sm:min-h-[750px] flex items-center">
            {/* Blurs de fondo */}
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
            
            {/* Logo León como Marca de Agua - Bajado un poco con -translate-y */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.15] dark:opacity-[0.25] pointer-events-none -translate-y-6 sm:-translate-y-8">
              <img
                src="/logokemblas.jpg"
                alt=""
                className="h-full w-full object-contain scale-110 sm:scale-100"
              />
            </div>

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-stretch w-full h-full">
              <div className="lg:col-span-7 self-center py-12">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                  {site?.hero?.title || 'Detailing automotriz'}
                </h1>
                <p className="mt-4 text-base text-zinc-700 sm:text-lg dark:text-white/70">
                  {site?.hero?.subtitle ||
                    'Servicios, productos y trabajos realizados.'}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl || '#contacto'}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {site?.cta?.primaryLabel || 'Cotizar por WhatsApp'}
                  </a>
                  <a
                    href="#trabajos"
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    Ver trabajos
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-end">
                {/* Cuadro movido hacia abajo para despejar el logo */}
                <div className="flex flex-col items-center justify-center pt-48 sm:pt-64">
                  <div className="w-full rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-950/60 shadow-xl">
                    <p className="text-sm font-bold tracking-wider uppercase text-zinc-900 dark:text-white">
                      Compromiso con la Perfección
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-white/80">
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                        <span className="min-w-0">
                          <span className="font-semibold text-zinc-900 dark:text-white">Tratamientos Premium:</span> Soluciones de alta gama adaptadas a la necesidad de tu vehículo.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                        <span className="min-w-0">
                          <span className="font-semibold text-zinc-900 dark:text-white">Metodología Rigurosa:</span> Transparencia total con registro detallado de cada fase del proceso.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                        <span className="min-w-0">
                          <span className="font-semibold text-zinc-900 dark:text-white">Resultados Comprobados:</span> Galería de transformaciones impactantes con acabados de exhibición.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Servicios
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Precios “desde”. El valor final depende del estado del vehículo.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-zinc-900 dark:text-white">
                      {s.name}
                    </p>
                    {s.description ? (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
                        {s.description}
                      </p>
                    ) : null}
                  </div>

                  {typeof s.priceFrom === 'number' ? (
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-zinc-500 dark:text-white/50">
                        Desde
                      </p>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {formatCurrency(s.priceFrom, site.currency) ||
                          String(s.priceFrom)}
                      </p>
                    </div>
                  ) : null}
                </div>

                {Array.isArray(s.bullets) && s.bullets.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-white/70">
                    {s.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-white/30" />
                        <span className="min-w-0">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {s.duration ? (
                  <p className="mt-4 text-xs text-zinc-500 dark:text-white/50">
                    Duración estimada: {s.duration}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* TRABAJO DESTACADO (CAMIONETA) */}
        <section id="destacado" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Resultados de Excelencia
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Pasión por cada detalle, reflejada en cada entrega.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <InstagramEmbed permalink={site?.media?.heroReel} captioned />
          </div>
        </section>

        {/* PROCESO (REEL) */}
        <section id="proceso" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Proceso
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Transiciones del proceso de detallado.
            </p>
          </div>

          <InstagramEmbed permalink={site?.media?.featuredReel} captioned />
        </section>

        {/* TRABAJOS */}
        <section id="trabajos" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Trabajos realizados
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Lista tipo chat (WhatsApp). Toca un trabajo para ver el detalle.
            </p>
          </div>

          <WorkChatList
            works={works}
            servicesById={servicesById}
            onOpenWork={(id) => setActiveWorkId(id)}
          />
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Productos
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
            {products.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {p.name}
                </p>

                <div className="mt-4">
                  <InstagramEmbed permalink={p.instagramPermalink} captioned />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICADO */}
        <section id="certificado" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Certificado
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              {site?.certificate?.description}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {site?.certificate?.title || 'Certificado'}
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
              <img
                src={site?.certificate?.image || '/certificado.svg'}
                alt={site?.certificate?.title || 'Certificado'}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="mt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Contacto
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-white/60">
              Respuesta rápida por WhatsApp.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                WhatsApp
              </p>
              {site?.contact?.whatsappPhone ? (
                <a
                  href={whatsappUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  {site.contact.whatsappPhone}
                </a>
              ) : null}

              <a
                href={whatsappUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Abrir WhatsApp
        </a>
      </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Redes y ubicación
              </p>

              <div className="mt-4 space-y-3">
                {site?.contact?.instagram ? (
                  <div className="flex items-center gap-3">
                    <a
                      href={site.contact.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                    <p className="text-sm font-medium text-zinc-700 dark:text-white/70">
                      {instagramHandle || 'Instagram'}
        </p>
      </div>
                ) : null}

                {site?.contact?.address || site?.contact?.city ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-white/70">
                      {site.contact.address ? `${site.contact.address} · ` : ''}
                      {site.contact.city || ''}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-white/50">
            © {new Date().getFullYear()} {site?.workshopName || 'Taller'}
          </footer>
        </section>
      </main>

      <WorkDetailModal
        open={Boolean(activeWorkId)}
        work={activeWork}
        service={activeService}
        onClose={() => setActiveWorkId(null)}
      />
    </div>
  )
}

export default App
