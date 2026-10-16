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
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  
  const [scale, setScale] = useState(window.innerWidth < 768 ? 0.6 : 1.0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)
  
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4)) 

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
    width: '36px',
    height: '36px',
    backgroundColor: 'var(--glass-bg, rgba(255, 255, 255, 0.07))',
    border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.18))',
    borderRadius: '50%',
    color: 'var(--text, #fff)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  const transparentCircleBtnStyle = {
    ...circleBtnStyle,
    backgroundColor: 'transparent',
    border: 'none',
  }

  const ZoomControls = () => (
    <div style={pillContainerStyle}>
      <button 
        onClick={zoomOut} 
        style={transparentCircleBtnStyle} 
        onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
        onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <ZoomOut size={16} />
      </button>
      <span style={{ fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', width: '45px', textAlign: 'center', userSelect: 'none' }}>
        {Math.round(scale * 100)}%
      </span>
      <button 
        onClick={zoomIn} 
        style={transparentCircleBtnStyle}
        onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
        onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <ZoomIn size={16} />
      </button>
    </div>
  )

  const PaginationControls = () => (
    <div style={pillContainerStyle}>
      <button 
        onClick={() => scrollToPage(pageNumber - 1)} 
        disabled={pageNumber <= 1} 
        style={{ ...transparentCircleBtnStyle, opacity: pageNumber <= 1 ? 0.3 : 1 }}
      >
        <ChevronLeft size={16} />
      </button>
      <span style={{ fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', margin: '0 0.5rem', userSelect: 'none' }}>
        {pageNumber} / {numPages || '-'}
      </span>
      <button 
        onClick={() => scrollToPage(pageNumber + 1)} 
        disabled={pageNumber >= numPages} 
        style={{ ...transparentCircleBtnStyle, opacity: pageNumber >= numPages ? 0.3 : 1 }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )

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
          position: 'relative',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem',
          borderBottom: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
          backgroundColor: 'var(--surface, #111114)',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem', zIndex: 2 }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={circleBtnStyle}
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
          
          {!isMobile && <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />}
          
          <button
            onClick={() => navigate("/")}
            style={isMobile ? { ...circleBtnStyle } : {
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
            {!isMobile && "Go back to Home"}
          </button>
        </div>

        <div 
          style={{ 
            position: 'absolute',
            top: '50%',
            left: isMobile ? '50%' : `calc(50% + ${isSidebarOpen ? 110 : 0}px)`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            zIndex: 1
          }}
        >
          <ZoomControls />
          {!isMobile && <PaginationControls />}
        </div>

        <div style={{ zIndex: 2 }}>
          <a
            href="/cv.pdf"
            download="Disath_Liyanage_CV.pdf"
            style={{
              ...pillContainerStyle,
              gap: '0.5rem',
              padding: isMobile ? '0' : '0.5rem 1.2rem',
              backgroundColor: 'var(--text, #fff)',
              color: 'var(--bg, #000)',
              textDecoration: 'none',
              justifyContent: 'center',
              width: isMobile ? '36px' : 'auto',
              height: isMobile ? '36px' : 'auto',
              borderRadius: isMobile ? '50%' : '9999px',
            }}
          >
            <DownloadIcon size={16} />
            {!isMobile && <span style={{ fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>Download CV</span>}
          </a>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {isMobile && isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(3px)',
              zIndex: 40,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}

        <div 
          style={{ 
            position: isMobile ? 'absolute' : 'relative',
            height: '100%',
            zIndex: isMobile ? 50 : 1,
            width: isMobile ? '240px' : (isSidebarOpen ? '220px' : '0px'),
            minWidth: isMobile ? '240px' : (isSidebarOpen ? '220px' : '0px'),
            transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'var(--surface-2, #16161b)',
            borderRight: '1px solid var(--border)',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: (isSidebarOpen || isMobile) ? '1.5rem 1rem' : '0'
          }}
        >
          {(isSidebarOpen || isMobile) && (
            <Document file="/cv.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <div 
                  key={`thumb_${index + 1}`}
                  onClick={() => {
                    scrollToPage(index + 1);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
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
                    scale={0.22} 
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
          )}
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
            padding: isMobile ? '1rem 1rem 5rem 1rem' : '2rem',
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
        
        {isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            backgroundColor: 'rgba(8, 8, 10, 0.6)',
            padding: '4px',
            borderRadius: '9999px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)'
          }}>
            <PaginationControls />
          </div>
        )}

      </div>
    </section>
  )
}