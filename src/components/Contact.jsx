import styles from './Contact.module.css'

function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2>Contact</h2>
      <p>
        If you would like to collaborate, discuss opportunities, or connect,
        send me a message.
      </p>
      <form
        className={styles.form}
        action="https://formspree.io/f/meepwnvv"
        method="POST"
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required />

        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Contact
