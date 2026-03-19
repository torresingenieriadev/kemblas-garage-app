import { useState, useMemo, useEffect } from 'react'
import { formatCurrency, buildWhatsAppUrl } from '../lib/format'

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

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Calculator({ catalogs, phone, currency = 'COP' }) {
  const defaultCategory = catalogs?.[0] || { services: [{}] }
  
  const [categoryId, setCategoryId] = useState(defaultCategory.id)
  const category = useMemo(() => catalogs?.find((c) => c.id === categoryId) || defaultCategory, [catalogs, categoryId])
  
  const vehicles = useMemo(() => {
    const isInterior = categoryId === 'limpieza-interior'
    return [
      { id: 'auto', label: 'Automóvil', icon: CarIcon },
      { id: 'suv', label: isInterior ? 'SUV 5 Pts / Platón' : 'SUV 5 Puestos', icon: SUVIcon },
      { id: 'van7', label: isInterior ? 'SUV 7 Puestos' : '7 Pts / Platón', icon: VanIcon },
    ]
  }, [categoryId])

  const defaultService = category?.services?.[0] || {}
  const [serviceId, setServiceId] = useState(defaultService.id)
  const service = useMemo(() => category?.services?.find((s) => s.id === serviceId) || defaultService, [category, serviceId])

  const [vehicleId, setVehicleId] = useState('auto')
  const [activeAddonIndices, setActiveAddonIndices] = useState([])

  // Reiniciar selecciones dependientes cuando se cambia de categoría
  useEffect(() => {
    if (category?.services?.[0]) {
      setServiceId(category.services[0].id)
    }
    setActiveAddonIndices([])
  }, [category])

  // Reiniciar addons cuando se cambia de servicio
  useEffect(() => {
    setActiveAddonIndices([])
  }, [serviceId])

  if (!catalogs || catalogs.length === 0) return null

  const basePrice = service.prices[vehicleId] || 0
  const addonsTotal = activeAddonIndices.reduce((sum, idx) => {
    const addon = service.addons?.[idx]
    return sum + (addon ? addon.price : 0)
  }, 0)
  const totalPrice = basePrice + addonsTotal

  const handleToggleAddon = (index) => {
    if (activeAddonIndices.includes(index)) {
      setActiveAddonIndices(activeAddonIndices.filter((i) => i !== index))
    } else {
      setActiveAddonIndices([...activeAddonIndices, index])
    }
  }

  const handleWhatsApp = () => {
    const vLabel = vehicles.find(v => v.id === vehicleId)?.label
    let msg = `Hola! Me interesa cotizar este servicio:\n\n`
    msg += `\u{1F4CC} *Servicio:* ${category.title} - ${service.name}\n`
    msg += `\u{1F697} *Vehículo:* ${vLabel}\n`
    if (activeAddonIndices.length > 0) {
      msg += `\u2795 *Complementos:*\n`
      activeAddonIndices.forEach(idx => {
        msg += `   - ${service.addons[idx].name}\n`
      })
    }
    msg += `\n\u{1F4B0} *Presupuesto Estimado:* ${formatCurrency(totalPrice, currency)}\n\n`
    msg += `¿Qué disponibilidad tienen para agendar?`

    const url = buildWhatsAppUrl(phone, msg)
    if (url) window.open(url, '_blank')
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* PARTE DE SELECCIÓN */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">1. Elige la categoría</h3>
            <div className="flex flex-wrap gap-2">
              {catalogs.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoryId(c.id)}
                  className={`rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    categoryId === c.id
                      ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">2. Selecciona el tratamiento</h3>
            <div className="grid gap-2">
              {category.services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceId(s.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all text-left ${
                    serviceId === s.id
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        serviceId === s.id ? 'border-red-500' : 'border-white/20'
                      }`}
                    >
                      {serviceId === s.id && <div className="h-2.5 w-2.5 rounded-full bg-red-500" />}
                    </div>
                    <span className={`font-bold ${serviceId === s.id ? 'text-white' : 'text-white/80'}`}>
                      {s.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">3. Tipo de vehículo</h3>
            <div className="grid grid-cols-3 gap-3">
              {vehicles.map((v) => {
                const Icon = v.icon
                const isSelected = vehicleId === v.id
                return (
                  <button
                    key={v.id}
                    onClick={() => setVehicleId(v.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-red-500 bg-red-500/10 text-white shadow-[0_4px_20px_rgba(220,38,38,0.2)]'
                        : 'border-white/5 bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                    <span className="text-xs font-bold tracking-wider">{v.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {service.addons && service.addons.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">4. Complementos (Opcional)</h3>
              <div className="grid gap-2">
                {service.addons.map((a, idx) => {
                  const isActive = activeAddonIndices.includes(idx)
                  return (
                    <button
                      key={idx}
                      onClick={() => handleToggleAddon(idx)}
                      className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                        isActive
                          ? 'border-red-500/50 bg-red-500/5 text-white'
                          : 'border-white/5 bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border ${
                            isActive ? 'border-red-500 bg-red-500' : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {isActive && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-sm">{a.name}</span>
                      </div>
                      <span className="font-bold text-xs bg-white/10 px-2 py-1 rounded">
                        +{formatCurrency(a.price, currency)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* PARTE DE RESULTADO / TICKET */}
        <div className="flex flex-col lg:pl-12 lg:border-l lg:border-white/5">
          <div className="sticky top-24 flex flex-col gap-6 rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 mb-6">Tu Cotización</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-white/5">
                  <div>
                    <p className="font-bold text-white text-lg">{service.name}</p>
                    <p className="text-sm text-white/50">{category.title}</p>
                  </div>
                  <p className="font-bold text-white">{formatCurrency(basePrice, currency)}</p>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Vehículo seleccionado:</span>
                  <span className="font-medium text-white">{vehicles.find(v => v.id === vehicleId)?.label}</span>
                </div>

                {activeAddonIndices.length > 0 && service.addons?.length > 0 && (
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Complementos</p>
                    {activeAddonIndices.map((idx) => {
                      const a = service.addons?.[idx]
                      if (!a) return null
                      return (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-white/80">{a.name}</span>
                          <span className="text-white/80">+{formatCurrency(a.price, currency)}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-white">Total Estimado</span>
                <span className="text-4xl font-black text-red-500">{formatCurrency(totalPrice, currency)}</span>
              </div>

              <button
                onClick={handleWhatsApp}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-8 py-5 font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-xl"
              >
                <WhatsAppIcon className="h-6 w-6 text-green-500" />
                <span className="text-lg">Solicitar Presupuesto</span>
                <div className="absolute inset-0 z-10 hidden bg-white/20 group-hover:block" />
              </button>
              
              <p className="mt-4 text-center text-xs text-white/30">
                Los precios finales pueden variar tras una valoración técnica en nuestro taller.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
