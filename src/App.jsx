import { useMemo, useState, useEffect, useRef } from 'react'
import products from './content/products.json'
import services from './content/services.json'
import site from './content/site.json'
import works from './content/works.json'
import catalogs from './content/catalogs.json'
import { InstagramEmbed } from './components/InstagramEmbed.jsx'
import { CatalogCard } from './components/CatalogCard.jsx'
import { Calculator } from './components/Calculator.jsx'
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

  const instagramGallery = useMemo(() => {
    const posts = []
    if (site?.media?.heroReel) {
      posts.push({ id: 'hero', title: 'Resultados de Excelencia', url: site.media.heroReel })
    }
    if (site?.media?.featuredReel) {
      posts.push({ id: 'proceso', title: 'Proceso de Detallado', url: site.media.featuredReel })
    }
    products?.forEach((p) => {
      if (p.instagramPermalink) {
        posts.push({ id: `prod-${p.id}`, title: p.name, url: p.instagramPermalink })
      }
    })
    return posts
  }, [])

  const carouselRef = useRef(null)
  const isHovered = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Si el mouse o el dedo está encima, o si un iframe interno (video) tiene focus, pausamos
      if (
        carouselRef.current && 
        !isHovered.current && 
        !(document.activeElement && carouselRef.current.contains(document.activeElement))
      ) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Desplazar el tamaño aproximado de una tarjeta + el gap
          const scrollAmount = clientWidth > 640 ? 424 : clientWidth * 0.85 + 24
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }, 2000)
    return () => clearInterval(interval)
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

        {/* CALCULADORA DE PRESUPUESTOS */}
        <section id="cotizador" className="mt-20 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-4">
              Cotizador Inteligente
              <span className="inline-flex items-center justify-center rounded-full bg-red-600/20 px-3 py-1 text-xs font-black uppercase text-red-500 tracking-wider">
                NUEVO
              </span>
            </h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Personaliza el servicio ideal para tu vehículo y obtén tu presupuesto instantáneo por WhatsApp.
            </p>
          </div>
          
          <Calculator
            catalogs={catalogs}
            phone={site?.contact?.whatsappPhone}
            currency={site?.currency}
          />
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Servicios & Catálogos</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Nuestros tratamientos especializados, segmentados por tipo de vehículo para garantizar resultados perfectos.
            </p>
          </div>

          <div className="space-y-24">
            {catalogs.map((category) => (
              <div key={category.id} className="scroll-mt-24">
                <div className="mb-12">
                  <h3 className="text-2xl font-black text-white flex items-center gap-4">
                    <span className="h-8 w-1 bg-red-600 rounded-full"></span>
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="mt-4 text-white/50 max-w-3xl ml-5 border-l border-white/10 pl-4 py-1">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {category.services.map((service) => (
                    <div key={service.id} className="h-full">
                      <CatalogCard
                        service={service}
                        categoryId={category.id}
                        currency={site?.currency}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERÍA INSTAGRAM (CARRUSEL HORIZONTAL) */}
        <section id="galeria" className="mt-24 scroll-mt-24 w-full overflow-hidden">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Galería & Proceso</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Desliza horizontalmente para ver nuestros resultados, procesos e insumos en acción.
            </p>
          </div>

          <div 
            ref={carouselRef}
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            onTouchStart={() => (isHovered.current = true)}
            onTouchEnd={() => (isHovered.current = false)}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 sm:px-0 -mx-4 sm:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {instagramGallery.map((post) => (
              <div 
                key={post.id}
                className="shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] snap-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-2xl flex flex-col transition-all hover:-translate-y-1 hover:border-white/20 backdrop-blur-sm"
              >
                <div className="p-6 pb-4 border-b border-white/5 bg-zinc-950/80">
                  <h3 className="font-bold text-white text-lg flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
                    {post.title}
                  </h3>
                </div>
                {/* Contenedor responsivo para el Iframe de Instagram */}
                <div className="bg-white/[0.01] w-full relative">
                   <InstagramEmbed permalink={post.url} captioned={false} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRABAJOS (CHAT LIST) */}
        <section id="trabajos" className="mt-24 scroll-mt-24">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white">Proyectos Detallados</h2>
            <div className="h-1 w-20 bg-red-600 mt-4 mx-auto sm:mx-0" />
            <p className="mt-4 text-white/50">
              Abre el historial de chat para ver el registro visual de nuestras transformaciones.
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
              
              <div className="space-y-6 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                  © {new Date().getFullYear()} {site?.workshopName || 'Kembla\'s Garage'} · Todos los derechos reservados
                </p>
                
                <a 
                  href="https://torresingenieria.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl bg-zinc-900 border border-white/5 px-6 py-3 shadow-xl transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-red-500/10 group"
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">
                    Plataforma desarrollada e impulsada por
                  </p>
                  <p className="text-sm font-black uppercase tracking-widest text-red-500 group-hover:text-red-400 transition-colors">
                    Torres Ingeniería
                  </p>
                </a>
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
