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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600/30">
      <Navbar site={site} />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* HERO */}
        <section id="inicio" className="py-2 sm:py-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] min-h-[650px] sm:min-h-[750px] flex items-center shadow-2xl">
            {/* Blurs de fondo */}
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red-600/10 blur-[100px] animate-pulse" />
            <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-zinc-600/10 blur-[100px]" />
            
            {/* Logo León como Marca de Agua - Bajado más para que se vea completo */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.25] pointer-events-none translate-y-16 sm:translate-y-8">
              <img
                src="/logokemblas.jpg"
                alt=""
                className="h-full w-full object-contain scale-110 sm:scale-100 transition-transform duration-[20s] hover:scale-110"
              />
            </div>

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-stretch w-full h-full">
              <div className="lg:col-span-7 self-center py-12">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-sm">
                  {site?.hero?.title || 'Estética Automotriz'}
                </h1>
                <p className="mt-6 text-lg text-white/60 sm:text-xl max-w-2xl leading-relaxed">
                  {site?.hero?.subtitle ||
                    'Protección y cuidado profesional para tu patrimonio.'}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={whatsappUrl || '#contacto'}
                    className="inline-flex items-center justify-center rounded-xl bg-red-600 px-8 py-4 text-base font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
                  >
                    {site?.cta?.primaryLabel || 'Cotizar ahora'}
                  </a>
                  <a
                    href="#destacado"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95"
                  >
                    Ver trabajos
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-end">
                {/* Cuadro movido hacia abajo para despejar el logo */}
                <div className="flex flex-col items-center justify-center pt-48 sm:pt-64">
                  <div className="w-full rounded-2xl border border-white/5 bg-zinc-900/60 p-6 backdrop-blur-md shadow-2xl">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 mb-4">
                      Compromiso con la Perfección
                    </p>
                    <ul className="space-y-4 text-sm text-white/70">
                      <li className="flex gap-4 group">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] group-hover:scale-125 transition-transform" />
                        <span className="min-w-0">
                          <span className="font-bold text-white block mb-0.5">Tratamientos Premium</span> Soluciones de alta gama adaptadas a tu vehículo.
                        </span>
                      </li>
                      <li className="flex gap-4 group">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] group-hover:scale-125 transition-transform" />
                        <span className="min-w-0">
                          <span className="font-bold text-white block mb-0.5">Metodología Rigurosa</span> Registro detallado de cada fase del proceso.
                        </span>
                      </li>
                      <li className="flex gap-4 group">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] group-hover:scale-125 transition-transform" />
                        <span className="min-w-0">
                          <span className="font-bold text-white block mb-0.5">Resultados de Exhibición</span> Transformaciones impactantes comprobadas.
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
        <section id="servicios" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Servicios</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Precios base sujetos a valoración técnica del vehículo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.id}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                      {s.name}
                    </p>
                    {s.description ? (
                      <p className="mt-2 text-sm text-white/50 leading-relaxed">
                        {s.description}
                      </p>
                    ) : null}
                  </div>

                  {typeof s.priceFrom === 'number' ? (
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                        Desde
                      </p>
                      <p className="text-lg font-black text-white">
                        {formatCurrency(s.priceFrom, site.currency) ||
                          String(s.priceFrom)}
                      </p>
                    </div>
                  ) : null}
                </div>

                {Array.isArray(s.bullets) && s.bullets.length > 0 ? (
                  <ul className="mt-6 space-y-3 text-sm text-white/60">
                    {s.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600/50" />
                        <span className="min-w-0">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {s.duration ? (
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{s.duration}</span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* TRABAJO DESTACADO (CAMIONETA) */}
        <section id="destacado" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white">Resultados de Excelencia</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto" />
            <p className="mt-4 text-white/50">
              Pasión por cada detalle, reflejada en cada entrega.
            </p>
          </div>

          <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <InstagramEmbed permalink={site?.media?.heroReel} captioned />
          </div>
        </section>

        {/* PROCESO (REEL) */}
        <section id="proceso" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Proceso</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Transiciones y fases del detallado profesional.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-white/[0.01]">
            <InstagramEmbed permalink={site?.media?.featuredReel} captioned />
          </div>
        </section>

        {/* TRABAJOS */}
        <section id="trabajos" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Trabajos realizados</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Desliza para ver nuestras transformaciones recientes.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01] shadow-2xl">
            <WorkChatList
              works={works}
              servicesById={servicesById}
              onOpenWork={(id) => setActiveWorkId(id)}
            />
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Insumos de Alta Gama</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Utilizamos solo lo mejor para garantizar resultados duraderos.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
            {products.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 shadow-2xl"
              >
                <p className="text-xl font-bold text-white mb-6">
                  {p.name}
                </p>

                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <InstagramEmbed permalink={p.instagramPermalink} captioned />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICADO */}
        <section id="certificado" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white">Capacitación y Respaldo</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto" />
            <p className="mt-4 text-white/50">
              {site?.certificate?.description}
            </p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            
            <div className="relative z-10 flex flex-col gap-10">
              <div className="text-center">
                <p className="text-2xl font-black text-white tracking-tight">
                  {site?.certificate?.title || 'Certificación Oficial'}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-inner">
                <img
                  src={site?.certificate?.image || '/certificado.svg'}
                  alt={site?.certificate?.title || 'Certificado'}
                  loading="lazy"
                  className="h-auto w-full object-contain brightness-95 hover:brightness-110 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="mt-24 mb-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Hablemos</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Estamos listos para transformar tu vehículo.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-10 hover:bg-white/[0.04] transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl -translate-y-16 translate-x-16" />
              
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
                Vía WhatsApp
              </p>
              
              <div className="space-y-6">
                {site?.contact?.whatsappPhone && (
                  <a
                    href={whatsappUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-2xl font-black text-white hover:text-red-500 transition-colors"
                  >
                    {site.contact.whatsappPhone}
                  </a>
                )}

                <a
                  href={whatsappUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-10 py-4 text-base font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
                >
                  Iniciar Conversación
        </a>
      </div>
            </div>

            <div className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-10 hover:bg-white/[0.04] transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-600/5 blur-3xl -translate-y-16 translate-x-16" />
              
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/30 mb-6">
                Presencia Digital
              </p>

              <div className="space-y-8">
                {site?.contact?.instagram && (
                  <div className="flex items-center gap-6">
                    <a
                      href={site.contact.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all shadow-xl active:scale-90"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="h-6 w-6" />
                    </a>
                    <div>
                      <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Síguenos</p>
                      <p className="text-xl font-bold text-white">
                        {instagramHandle || 'Instagram'}
                      </p>
                    </div>
                  </div>
                )}

                {site?.contact?.address || site?.contact?.city ? (
                  <div className="flex items-center gap-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-xl">
                      <MapPinIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Ubicación</p>
                      <p className="text-xl font-bold text-white">
                        {site.contact.address ? `${site.contact.address} · ` : ''}
                        {site.contact.city || ''}
        </p>
      </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <footer className="mt-20 border-t border-white/5 pt-10 pb-10 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/logokemblas.jpg"
                  alt="Kembla's Garage León"
                  className="h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-2xl transition-all duration-500 hover:scale-110"
                />
                <img src={site?.brand?.logo} alt="" className="h-6 w-auto opacity-30 grayscale hover:grayscale-0 transition-all" />
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                  © {new Date().getFullYear()} {site?.workshopName || 'Kembla\'s Garage'} · Todos los derechos reservados
                </p>
                <p className="text-[9px] font-medium uppercase tracking-widest text-white/10">
                  Powered by <span className="text-white/30">Torres Ingeniería</span>
                </p>
              </div>
            </div>
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
