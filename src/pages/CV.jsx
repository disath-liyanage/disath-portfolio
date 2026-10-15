"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Document, Page, pdfjs } from "react-pdf"
import { 
  HomeIcon, 
  DownloadIcon, 
  ZoomIn, 
  ZoomOut, 
  PanelLeftClose, 
  PanelLeftOpen, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react"

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function CV() {
  const navigate = useNavigate()
  
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  const scrollContainerRef = useRef(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visiblePage = Number(entry.target.id.split('-')[1])
            setPageNumber(visiblePage)
          }
        })
      },
      { threshold: 0.4 }
    )

    const pageNodes = document.querySelectorAll('.pdf-page-wrapper')
    pageNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [numPages, scale])

  const scrollToPage = (p) => {
    if (p < 1 || p > numPages) return
    const targetPage = document.getElementById(`page-${p}`)
    if (targetPage) {
      targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.5))
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5))

  const pillContainerStyle = {
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.3rem', 
    backgroundColor: 'var(--glass-bg, rgba(255, 255, 255, 0.07))', 
    border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.18))',
    backdropFilter: 'blur(12px)',
    padding: '0.3rem 0.5rem', 
    borderRadius: '9999px'
  }

  const circleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    color: 'var(--text, #fff)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  }

  return (
    <section 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100svh', 
        width: '100vw',
        backgroundColor: 'var(--bg, #08080a)',
        overflow: 'hidden'
      }}
    >
      <header 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
          backgroundColor: 'var(--surface, #111114)',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ 
              ...circleBtnStyle, 
              backgroundColor: 'var(--glass-bg)', 
              border: '1px solid var(--glass-border)' 
            }}
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-bg)'}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
          
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />
          <button
            onClick={() => navigate("/")}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text, #fff)',
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 500,
              padding: '0.5rem 0'
            }}
          >
            <HomeIcon size={16} />
            Go back to Home
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={pillContainerStyle}>
            <button 
              onClick={zoomOut} 
              style={circleBtnStyle} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', width: '45px', textAlign: 'center', userSelect: 'none' }}>
              {Math.round(scale * 100)}%
            </span>
            <button 
              onClick={zoomIn} 
              style={circleBtnStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <div style={pillContainerStyle}>
            <button 
              onClick={() => scrollToPage(pageNumber - 1)} 
              disabled={pageNumber <= 1} 
              style={{ ...circleBtnStyle, opacity: pageNumber <= 1 ? 0.3 : 1 }}
              onMouseEnter={(e) => pageNumber > 1 && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', margin: '0 0.5rem', userSelect: 'none' }}>
              {pageNumber} / {numPages || '-'}
            </span>
            <button 
              onClick={() => scrollToPage(pageNumber + 1)} 
              disabled={pageNumber >= numPages} 
              style={{ ...circleBtnStyle, opacity: pageNumber >= numPages ? 0.3 : 1 }}
              onMouseEnter={(e) => pageNumber < numPages && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

        <a
          href="/cv.pdf"
          download="Disath_Liyanage_CV.pdf"
          style={{
            ...pillContainerStyle,
            gap: '0.5rem',
            padding: '0.5rem 1.2rem',
            backgroundColor: 'var(--text, #fff)',
            color: 'var(--bg, #000)',
            textDecoration: 'none'
          }}
        >
          <DownloadIcon size={16} />
          <span style={{ fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>Download CV</span>
        </a>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div 
          style={{ 
            width: isSidebarOpen ? '220px' : '0px',
            minWidth: isSidebarOpen ? '220px' : '0px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'var(--surface-2, #16161b)',
            borderRight: isSidebarOpen ? '1px solid var(--border)' : 'none',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: isSidebarOpen ? '1.5rem 1rem' : '0'
          }}
        >
          <Document file="/cv.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <div 
                key={`thumb_${index + 1}`}
                onClick={() => scrollToPage(index + 1)}
                style={{
                  position: 'relative',
                  marginBottom: '1.5rem',
                  cursor: 'pointer',
                  border: pageNumber === index + 1 ? '2px solid var(--text, #fff)' : '2px solid transparent',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'border 0.2s ease',
                  opacity: pageNumber === index + 1 ? 1 : 0.5
                }}
              >
                <Page 
                  pageNumber={index + 1} 
                  scale={0.2} 
                  renderAnnotationLayer={false} 
                  renderTextLayer={false}
                />

                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: '6px', 
                    right: '6px', 
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 500,
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </Document>
        </div>

        <div 
          ref={scrollContainerRef}
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            overflowX: 'auto',
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: 'var(--bg)',
            scrollBehavior: 'smooth'
          }}
        >
          <Document 
            file="/cv.pdf" 
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div style={{ color: 'var(--text-muted)', fontFamily: 'Outfit', marginTop: '20vh' }}>
                Loading CV...
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div 
                id={`page-${index + 1}`}
                key={`page_${index + 1}`} 
                className="pdf-page-wrapper"
                style={{ 
                  marginBottom: '2rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', 
                  borderRadius: '4px', 
                  overflow: 'hidden' 
                }}
              >
                <Page 
                  pageNumber={index + 1} 
                  scale={scale} 
                  renderAnnotationLayer={true} 
                  renderTextLayer={true} 
                />
              </div>
            ))}
          </Document>
        </div>
        
      </div>
    </section>
  )
}