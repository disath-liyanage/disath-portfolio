import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main>
      <h1>Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <Link to="/">Go back home</Link>
    </main>
  )
}

export default NotFound
