import { useState } from 'react'
import styles from './Contact.module.css'

const EMPTY_ERRORS = {
  name: '',
  email: '',
  message: '',
  form: '',
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState(EMPTY_ERRORS)

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    const nextErrors = { ...EMPTY_ERRORS }

    if (!name) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!email) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address (example@domain.com).'
    }

    if (!message) {
      nextErrors.message = 'Please enter your message.'
    }

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setErrors(nextErrors)
      setStatus('idle')
      return
    }

    setErrors(EMPTY_ERRORS)
    setStatus('submitting')

    const payload = new FormData()
    payload.append('name', name)
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
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.header}>
          <h2>Contact Me</h2>
          <p>
            If you would like to collaborate, discuss opportunities, or connect, feel free to send me a message.
          </p>
        </div>

        <div className={styles.fields}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
          </div>

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
