import { useEffect } from 'react'
import { routeSeo } from './routes'

function setMetaContent(selector, value) {
  const el = document.querySelector(selector)
  if (!el) return null
  const prev = el.getAttribute('content')
  el.setAttribute('content', value)
  return () => {
    if (prev !== null) el.setAttribute('content', prev)
  }
}

function setLinkHref(selector, value) {
  const el = document.querySelector(selector)
  if (!el) return null
  const prev = el.getAttribute('href')
  el.setAttribute('href', value)
  return () => {
    if (prev !== null) el.setAttribute('href', prev)
  }
}

export function usePageSeo(routePath) {
  useEffect(() => {
    const seo = routeSeo[routePath]
    if (!seo) return

    const prevTitle = document.title
    document.title = seo.title

    const restorers = [
      setMetaContent('meta[name="description"]', seo.description),
      setLinkHref('link[rel="canonical"]', seo.url),
      setMetaContent('meta[property="og:title"]', seo.title),
      setMetaContent('meta[property="og:description"]', seo.description),
      setMetaContent('meta[property="og:url"]', seo.url),
      setMetaContent('meta[property="og:image"]', seo.image),
      setMetaContent('meta[property="og:image:secure_url"]', seo.image),
      setMetaContent('meta[property="og:image:width"]', seo.imageWidth),
      setMetaContent('meta[property="og:image:height"]', seo.imageHeight),
      setMetaContent('meta[property="og:image:alt"]', seo.imageAlt),
      setMetaContent('meta[name="twitter:title"]', seo.title),
      setMetaContent('meta[name="twitter:description"]', seo.description),
      setMetaContent('meta[name="twitter:image"]', seo.image),
      setMetaContent('meta[name="twitter:image:alt"]', seo.imageAlt),
    ].filter(Boolean)

    return () => {
      document.title = prevTitle
      restorers.forEach((restore) => restore())
    }
  }, [routePath])
}