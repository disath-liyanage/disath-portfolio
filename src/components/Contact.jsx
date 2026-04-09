import { useState } from 'react'
import styles from './Contact.module.css'

function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/meepwnvv', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <h2>Contact</h2>
          <p>
            If you would like to collaborate, discuss opportunities, or connect,
            send me a message.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required />

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
              Something went wrong while sending your message. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
