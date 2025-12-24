export function formatCurrency(amount, currency) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return null

  const locale = currency?.locale || 'es-CO'
  const code = currency?.code || 'COP'

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    // Fallback si el locale/currency no es válido en el entorno
    return `$${Math.round(amount).toLocaleString()}`
  }
}

export function normalizeWhatsAppPhone(phone) {
  if (typeof phone !== 'string') return ''
  return phone.replace(/\D/g, '')
}

export function buildWhatsAppUrl(phone, message) {
  const digits = normalizeWhatsAppPhone(phone)
  // Regla simple para evitar links rotos por placeholders (ej. +57XXXXXXXXXX => "57")
  if (digits.length < 10) return null

  const base = `https://wa.me/${digits}`
  const text = typeof message === 'string' && message.trim() ? message.trim() : ''
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

