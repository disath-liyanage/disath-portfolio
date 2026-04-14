import { useState } from 'react'
import styles from './Contact.module.css'

const EMPTY_ERRORS = {
  firstName: '',
  mobile: '',
  email: '',
  contact: '',
  message: '',
  form: '',
}

const COUNTRY_CODES = [
  { value: '+94', label: 'Sri Lanka (+94)' },
  { value: '+1', label: 'United States (+1)' },
  { value: '+1', label: 'Canada (+1)' },
  { value: '+52', label: 'Mexico (+52)' },
  { value: '+54', label: 'Argentina (+54)' },
  { value: '+55', label: 'Brazil (+55)' },
  { value: '+56', label: 'Chile (+56)' },
  { value: '+57', label: 'Colombia (+57)' },
  { value: '+51', label: 'Peru (+51)' },
  { value: '+34', label: 'Spain (+34)' },
  { value: '+33', label: 'France (+33)' },
  { value: '+49', label: 'Germany (+49)' },
  { value: '+39', label: 'Italy (+39)' },
  { value: '+31', label: 'Netherlands (+31)' },
  { value: '+32', label: 'Belgium (+32)' },
  { value: '+41', label: 'Switzerland (+41)' },
  { value: '+46', label: 'Sweden (+46)' },
  { value: '+47', label: 'Norway (+47)' },
  { value: '+45', label: 'Denmark (+45)' },
  { value: '+353', label: 'Ireland (+353)' },
  { value: '+351', label: 'Portugal (+351)' },
  { value: '+48', label: 'Poland (+48)' },
  { value: '+90', label: 'Turkey (+90)' },
  { value: '+7', label: 'Russia (+7)' },
  { value: '+380', label: 'Ukraine (+380)' },
  { value: '+44', label: 'United Kingdom (+44)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+64', label: 'New Zealand (+64)' },
  { value: '+91', label: 'India (+91)' },
  { value: '+92', label: 'Pakistan (+92)' },
  { value: '+880', label: 'Bangladesh (+880)' },
  { value: '+977', label: 'Nepal (+977)' },
  { value: '+93', label: 'Afghanistan (+93)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+81', label: 'Japan (+81)' },
  { value: '+82', label: 'South Korea (+82)' },
  { value: '+66', label: 'Thailand (+66)' },
  { value: '+60', label: 'Malaysia (+60)' },
  { value: '+62', label: 'Indonesia (+62)' },
  { value: '+63', label: 'Philippines (+63)' },
  { value: '+84', label: 'Vietnam (+84)' },
  { value: '+971', label: 'UAE (+971)' },
  { value: '+966', label: 'Saudi Arabia (+966)' },
  { value: '+974', label: 'Qatar (+974)' },
  { value: '+965', label: 'Kuwait (+965)' },
  { value: '+968', label: 'Oman (+968)' },
  { value: '+973', label: 'Bahrain (+973)' },
  { value: '+20', label: 'Egypt (+20)' },
  { value: '+27', label: 'South Africa (+27)' },
  { value: '+234', label: 'Nigeria (+234)' },
  { value: '+254', label: 'Kenya (+254)' },
  { value: '+212', label: 'Morocco (+212)' },
  { value: '+65', label: 'Singapore (+65)' },
].sort((a, b) => a.label.localeCompare(b.label))

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidMobile(value) {
  return /^\d{6,15}$/.test(value)
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [countryCode, setCountryCode] = useState('+94')

  function handleFormChange(event) {
    const form = event.currentTarget
    const formData = new FormData(form)
    const firstName = String(formData.get('firstName') || '').trim()
    const mobileRaw = String(formData.get('mobile') || '').trim()
    const mobile = mobileRaw.replace(/[^\d]/g, '')
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    setErrors((previous) => {
      const next = { ...previous }

      if (next.firstName && firstName) {
        next.firstName = ''
      }

      if (next.message && message) {
        next.message = ''
      }

      if (next.contact && (mobile || email)) {
        next.contact = ''
      }

      if (next.mobile) {
        if (!mobile && email) {
          next.mobile = ''
        } else if (mobile && isValidMobile(mobile)) {
          next.mobile = ''
        }
      }

      if (next.email) {
        if (!email && mobile) {
          next.email = ''
        } else if (email && isValidEmail(email)) {
          next.email = ''
        }
      }

      return next
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const firstName = String(formData.get('firstName') || '').trim()
    const lastName = String(formData.get('lastName') || '').trim()
    const selectedCountryCode = String(formData.get('countryCode') || '+94').trim()
    const mobileRaw = String(formData.get('mobile') || '').trim()
    const mobile = mobileRaw.replace(/[^\d]/g, '')
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    const nextErrors = { ...EMPTY_ERRORS }

    if (!firstName) {
      nextErrors.firstName = 'Please enter your first name.'
    }

    if (!mobile && !email) {
      nextErrors.contact = 'Please provide at least one contact method: mobile number or email.'
      nextErrors.mobile = 'Please enter your mobile number or provide an email address.'
      nextErrors.email = 'Please enter your email address or provide a mobile number.'
    }

    if (mobile && !isValidMobile(mobile)) {
      nextErrors.mobile = 'Please enter a valid mobile number using digits only.'
    }

    if (email && !isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address (example@domain.com).'
    }

    if (!message) {
      nextErrors.message = 'Please enter your message.'
    }

    if (nextErrors.firstName || nextErrors.mobile || nextErrors.email || nextErrors.contact || nextErrors.message) {
      setErrors(nextErrors)
      setStatus('idle')
      return
    }

    setErrors(EMPTY_ERRORS)
    setStatus('submitting')

    const payload = new FormData()
    payload.append('firstName', firstName)
    payload.append('lastName', lastName)
    payload.append('name', `${firstName} ${lastName}`.trim())
    payload.append('countryCode', selectedCountryCode)
    payload.append('mobile', mobile)
    payload.append('phone', mobile ? `${selectedCountryCode} ${mobile}` : '')
    payload.append('email', email)
    payload.append('message', message)

    try {
      const response = await fetch('https://formspree.io/f/meepwnvv', {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        const reason =
          data?.errors?.[0]?.message ||
          data?.error ||
          'Something went wrong while sending your message. Please try again.'
        setErrors({ ...EMPTY_ERRORS, form: reason })
        throw new Error('Form submission failed')
      }

      form.reset()
      setErrors(EMPTY_ERRORS)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <form className={styles.form} onSubmit={handleSubmit} onChange={handleFormChange} noValidate>
        <div className={styles.header}>
          <h2>Contact Me</h2>
          <p>
            If you would like to collaborate, discuss opportunities, or connect, feel free to send me a message.
          </p>
        </div>

        <div className={styles.fields}>
          <div className={styles.fieldGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              aria-invalid={errors.firstName ? 'true' : 'false'}
            />
            {errors.firstName && <p className={styles.fieldError}>{errors.firstName}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="lastName">Last Name (optional)</label>
            <input id="lastName" name="lastName" type="text" />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="mobile">Mobile Number</label>
            <div className={styles.mobileRow}>
              <select
                id="countryCode"
                name="countryCode"
                value={countryCode}
                className={styles.countryCode}
                style={{ width: `calc(${Math.max(14, (COUNTRY_CODES.find((code) => code.value === countryCode)?.label.length || 14) + 1)}ch + 1.25rem)` }}
                onChange={(event) => setCountryCode(event.target.value)}
              >
                {COUNTRY_CODES.map((code) => (
                  <option key={`${code.label}-${code.value}`} value={code.value}>
                    {code.label}
                  </option>
                ))}
              </select>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                placeholder="771234567"
                className={styles.mobileInput}
                aria-invalid={errors.mobile ? 'true' : 'false'}
              />
            </div>
            {errors.mobile && <p className={styles.fieldError}>{errors.mobile}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" aria-invalid={errors.email ? 'true' : 'false'} />
            {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
          </div>

          {errors.contact && <p className={`${styles.fieldError} ${styles.contactError}`}>{errors.contact}</p>}

          <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && <p className={styles.fieldError}>{errors.message}</p>}
          </div>
        </div>

        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Submit'}
        </button>

        {status === 'success' && (
          <p className={styles.success} role="status" aria-live="polite">
            Thanks for reaching out. I will get in touch with you soon.
          </p>
        )}

        {status === 'error' && (
          <p className={styles.error} role="status" aria-live="polite">
            {errors.form || 'Something went wrong while sending your message. Please try again.'}
          </p>
        )}
      </form>
    </section>
  )
}

export default Contact
