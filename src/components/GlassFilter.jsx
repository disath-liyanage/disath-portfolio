const BUMP_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
    <defs>
      <radialGradient id="bump" cx="50%" cy="35%" r="80%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#808080" />
        <stop offset="100%" stop-color="#000000" />
      </radialGradient>
    </defs>
    <rect width="400" height="120" rx="60" fill="url(#bump)" />
  </svg>
`
const bumpDataUri = `data:image/svg+xml;base64,${btoa(BUMP_SVG)}`

function GlassFilter() {
  return (
    <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feImage
          href={bumpDataUri}
          x="0%" y="0%" width="100%" height="100%"
          preserveAspectRatio="none"
          result="bump"
        />
        <feGaussianBlur in="bump" stdDeviation="8" result="bumpSoft" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="bumpSoft"
          scale="30"
          xChannelSelector="R"
          yChannelSelector="R"
          result="warped"
        />
        <feGaussianBlur in="warped" stdDeviation="0.4" />
      </filter>
    </svg>
  )
}

export default GlassFilter