import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Disath Liyanage. All rights reserved.</p>
      <div className={styles.links}>
        <a
          href="https://github.com/disath-liyanage"
          target="_blank"
          rel="noreferrer"
          aria-label="Disath Liyanage GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.31-.54-1.55.12-3.23 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.68.25 2.92.12 3.23.77.84 1.24 1.92 1.24 3.23 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/disath-liyanage"
          target="_blank"
          rel="noreferrer"
          aria-label="Disath Liyanage LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.98 3.5a2.49 2.49 0 1 0 0 4.98 2.49 2.49 0 0 0 0-4.98zM2.5 9h5v12h-5zM9.5 9h4.79v1.71h.07c.67-1.27 2.32-2.61 4.77-2.61 5.1 0 6.04 3.36 6.04 7.72V21h-5v-4.67c0-1.11-.02-2.53-1.55-2.53-1.56 0-1.8 1.21-1.8 2.45V21h-5z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
