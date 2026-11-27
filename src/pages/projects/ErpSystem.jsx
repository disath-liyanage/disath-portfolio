import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import GlassFilter from '../../components/GlassFilter'
import MorphFilter from '../../components/MorphFilter'
import Footer from '../../components/Footer'
import { usePageSeo } from '../../seo/usePageSeo'
import '../../components/Projects.css'

const dashboard = '/images/erp-system/general/dashboard.webp'
const dashboard_shot = (caption, src = dashboard, desc = '') => ({ src, caption, desc })

const dashboard_light = '/images/erp-system/general/dashboard-light.webp'

const notifications = '/images/erp-system/general/notifications.webp'
const notifications_shot = (caption, src = notifications, desc = '') => ({ src, caption, desc })

const expenses = '/images/erp-system/general/expenses.webp'
const expenses_shot = (caption, src = expenses, desc = '') => ({ src, caption, desc })

const reports = '/images/erp-system/general/reports.webp'
const reports_shot = (caption, src = reports, desc = '') => ({ src, caption, desc })

const salary = '/images/erp-system/general/salary.webp'
const salary_shot = (caption, src = salary, desc = '') => ({ src, caption, desc })

const workers = '/images/erp-system/general/workers.webp'
const workers_shot = (caption, src = workers, desc = '') => ({ src, caption, desc })

const users = '/images/erp-system/general/users.webp'
const users_shot = (caption, src = users, desc = '') => ({ src, caption, desc })


const inv_approved = '/images/erp-system/invoices/approved.webp'
const inv_approved_shot = (caption, src = inv_approved, desc = '') => ({ src, caption, desc })

const inv_editnapproved = '/images/erp-system/invoices/edit-&-approve.webp'
const inv_editnapproved_shot = (caption, src = inv_editnapproved, desc = '') => ({ src, caption, desc })

const inv_pending = '/images/erp-system/invoices/pending.webp'
const inv_pending_shot = (caption, src = inv_pending, desc = '') => ({ src, caption, desc })

const inv_rejected = '/images/erp-system/invoices/rejected.webp'
const inv_rejected_shot = (caption, src = inv_rejected, desc = '') => ({ src, caption, desc })

const inv_gallery = '/images/erp-system/invoices/gallery.webp'
const inv_gallery_shot = (caption, src = inv_gallery, desc = '') => ({ src, caption, desc })


const collections = '/images/erp-system/collections/table.webp'
const collections_shot = (caption, src = collections, desc = '') => ({ src, caption, desc })

const collection_session = '/images/erp-system/collections/session.webp'
const collection_session_shot = (caption, src = collection_session, desc = '') => ({ src, caption, desc })

const collection_session_expenses = '/images/erp-system/collections/expenses.webp'
const collection_session_expenses_shot = (caption, src = collection_session_expenses, desc = '') => ({ src, caption, desc })


const grn = '/images/erp-system/grn/table.webp'
const grn_shot = (caption, src = grn, desc = '') => ({ src, caption, desc })

const grn_details = '/images/erp-system/grn/details.webp'
const grn_details_shot = (caption, src = grn_details, desc = '') => ({ src, caption, desc })


const products = '/images/erp-system/products/table.webp'
const products_shot = (caption, src = products, desc = '') => ({ src, caption, desc })

const product_details = '/images/erp-system/products/details.webp'
const product_details_shot = (caption, src = product_details, desc = '') => ({ src, caption, desc })


const customers = '/images/erp-system/customers/table.webp'
const customers_shot = (caption, src = customers, desc = '') => ({ src, caption, desc })

const customer_details = '/images/erp-system/customers/details.webp'
const cusomer_details_shot = (caption, src = customer_details, desc = '') => ({ src, caption, desc })


const attendance = '/images/erp-system/attendance/attendance.webp'
const attendance_shot = (caption, src = attendance, desc = '') => ({ src, caption, desc })

const advanceloan = '/images/erp-system/attendance/advancenloans.webp'
const advanceloan_shot = (caption, src = advanceloan, desc = '') => ({ src, caption, desc })

const stats = [
  { value: '4', label: 'Editions' },
  { value: '15+', label: 'Users Combined' },
  { value: '50+', label: 'Invoices per day' },
  { value: '6+ mo', label: 'In production' },
]

const roles = ['Admins', 'Managers', 'Sales reps', 'Cashiers', 'Custom Roles']

const tech = [
  { name: 'Next.js 14', tag: 'Framework', mark: 'N', icon: 'nextdotjs', role: 'App routing and server rendering' },
  { name: 'TypeScript', tag: 'Language', mark: 'TS', icon: 'typescript', role: 'Type-safe code end to end' },
  { name: 'Tailwind CSS', tag: 'Styling', mark: 'TW', icon: 'tailwindcss', role: 'Responsive, consistent UI' },
  { name: 'Supabase', tag: 'Backend', mark: 'SB', icon: 'supabase', role: 'Database, auth and backend' },
  { name: 'Turborepo', tag: 'Monorepo', mark: 'TR', icon: 'turborepo', role: 'Shared core reused across the other client variants' },
  { name: 'pnpm', tag: 'Packages', mark: 'PN', icon: 'pnpm', role: 'Workspaces for the monorepo' },
]

const sections = [
    {
    title: 'Dashboard',
    groups: [
      {
        text: 'Managers see performance at a glance without opening a report.',
        bullets: [
          'Bar graph of the last 30 days of sales, so the trend is visible straight away',
          'Top 5 customers and top 5 products',
          "Animated progress bars showing each sales rep's sales against their target",
          "Cards for today's orders, today's collections and low stock",
        ],
      },
      {
        heading: 'Light and dark themes',
        bullets: ['Every page works in both themes, switchable by the user'],
        shots: [
          dashboard_shot('Dark theme', dashboard),
          dashboard_shot('Light theme', dashboard_light),
        ],
      },
    ],
  },
  {
    title: 'Invoices',
    groups: [
      {
        heading: 'Requesting an Invoice',
        bullets: [
          'Sales reps request invoices for their customers',
          'Managers and admins are notified as soon as a request comes in',
        ],
        shots: [
          inv_pending_shot('Invoice requested by a sales rep', inv_pending, 'The request as it arrives from the field, before anyone has reviewed it.'),
        ],
      },
      {
        heading: 'Edit & Accept',
        bullets: [
          'Managers and admins approve, reject, or edit the added products and then approve',
          'Reps can add out-of-stock items to a request, but managers cannot approve those lines as they stand',
        ],
      },
      {
        heading: 'Send to supplier',
        text: 'Instead of blocking the invoice, the manager can send the shortage to a supplier.',
        bullets: [
          'If there is some stock but the rep requested more, the short amount goes to the selected supplier and the invoice keeps only the quantity actually in stock',
          'If none of the requested quantity is in stock, the whole amount goes to the selected supplier and the item is removed from the invoice',
          'Out-of-stock quantities are highlighted in a separate colour so managers and admins spot them immediately',
        ],
        shots: [
          inv_editnapproved_shot('Editing & Accepting an Invoice', inv_editnapproved, 'Products can be edited before approving. The send to supplier button is visible here.'),
        ],
      },
      {
        heading: 'Rejected Invoices',
        bullets: ['Rejected requests are kept, and the sales rep is notified'],
        shots: [inv_rejected_shot('Rejected Invoice', inv_rejected)],
      },
      {
        heading: 'Approved Invoices',
        bullets: [
          'The outstanding table, discount and free quantity columns only appear when they are needed, so a simple invoice stays clean',
        ],
        shots: [
          inv_approved_shot('Approved Invoice', inv_approved, 'Outstanding, discount and free quantity columns only show up when there is a need for them.'),
        ],
      },
      {
        heading: 'Product Gallery & Cart',
        text: 'Built for reps in front of a customer.',
        bullets: [
          'A gallery button on the invoice page opens the gallery while items are being added, with the items already on the invoice loaded into the cart',
          'Managers and admins upload the product photos',
          'Reps browse the gallery, add quantities, then check out the cart',
          'Checkout returns to the invoice page, where the customer is selected and items can still be edited or removed',
        ],
        shots: [inv_gallery_shot('Product Gallery', inv_gallery)],
      },
    ],
  },
  {
    title: 'Collections',
    groups: [
      {
        heading: 'Sales Rep Collections',
        bullets: [
          'Only sales reps and managers can add collection entries',
          'In the field, reps record every collection, cash or cheque, and their expenses on the go',
        ],
        shots: [collections_shot('Recording Collections in the field', collections)],
      },
      {
        heading: 'Approving Collections',
        bullets: [
          'Back at the office, the rep hands the cash in hand to the manager',
          'The manager opens approve collection, which shows the cheque amount, cash collected, total expenses and the cash in hand right now',
          'Once it matches, the manager approves it',
        ],
      },
      {
        heading: 'Driver Collections',
        bullets: [
          'Driver entries are made by the manager, who selects the worker and the collection session',
          "The session holds every collection and expense the driver recorded, so the manager can cross-check the driver's cash in hand against it",
        ],
        shots: [collection_session_shot('Driver Collection Session', collection_session), collection_session_expenses_shot('Driver Session Expenses Section', collection_session_expenses)],
      },
      {
        heading: 'Collection Commission',
        bullets: [
          'Either way, the worker earns a collection commission that is calculated automatically into the salary slip',
        ],
      },
    ],
  },
  {
    title: 'Goods Received Notes (GRN)',
    groups: [
      {
        bullets: [
          'Only admins and managers can add received notes',
          'Sales reps can view the added received notes',
        ],
        shots: [grn_shot('All Received Notes', grn), grn_details_shot('Received Note Details', grn_details)],
      },
    ],
  },
  {
    title: 'Products',
    groups: [
      {
        text: 'Products are created and edited by managers and admins only. Sales reps can view them.',
        bullets: [
          'The product page shows the details, including stock and selling price',
          '4 tables sit under the details: received quantities with the supplier, invoiced items with invoice number, quantity, price and date, cancelled or returned invoices, and stock adjustments',
        ],
        shots: [products_shot('Product list', products), product_details_shot('Product Details page', product_details)],
      },
    ],
  },
  {
    title: 'Customers',
    groups: [
      {
        bullets: [
          'Every customer is assigned to a sales rep, who earns the sales commission on each invoice for that customer',
          'A credit limit can be set per customer',
          'Reps can request a new customer and add up to 5 invoices while the customer is still pending',
        ],
        shots: [customers_shot('Customer list', customers), cusomer_details_shot('Customer Details page', customer_details)],
      },
    ],
  },
  {
    title: 'Notifications',
    groups: [
      {
        bullets: [
          'Managers and admins are notified of invoice requests and customer requests from sales reps, and of cheque deposit dates',
          'Sales reps are notified when their requested invoice or customer is approved or rejected',
        ],
        shots: [notifications_shot('Notifications', notifications)],
      },
    ],
  },
  {
    title: 'Attendance',
    groups: [
      {
        heading: 'Attendance Calendar',
        bullets: [
          'Managers log attendance for each user',
          'A calendar of the current month shows cheque deposit dates on their day, with holidays, Saturdays and Sundays highlighted',
        ],
        shots: [attendance_shot('Attendance Calendar', attendance)],
      },
      {
        heading: 'Advances & Loans',
        bullets: [
          'Select a user, an amount, and whether it is a loan or an advance',
          'Loans are spread over a number of months chosen by the manager',
          'A table at the bottom lists who received advances or loans this month, with the total',
        ],
        shots: [advanceloan_shot('Advances & Loans', advanceloan)],
      },
    ],
  },
  {
    title: 'Expenses',
    groups: [
      {
        bullets: [
          "Managers record each day's expenses against a worker or against the company",
          'Expenses are tied to a user and a category, which feeds the expense and profit reports',
        ],
        shots: [expenses_shot('Expenses', expenses)],
      },
    ],
  },
  {
    title: 'Reports',
    grid: true,
    groups: [
      {
        heading: 'Sales',
        bullets: [
          'Date wise, invoice wise, route wise, department wise, sales rep wise and customer wise',
          'Fast moving products',
        ],
      },
      {
        heading: 'Customers',
        bullets: ['Outstandings by customer, route, sales rep and department'],
      },
      {
        heading: 'Stock',
        bullets: [
          'Stock adjustment reports',
          'Stock amount by department, category or unit',
          'Returned and cancelled stock details',
        ],
      },
      {
        heading: 'Profit',
        bullets: [
          'Profit summary for a day, a month or any date range',
          'Invoice wise profit with selling price, cost, discount given, free quantity issued, and the profit with its percentage',
        ],
      },
      {
        heading: 'Expenses',
        bullets: ['User wise and date range expenses'],
        shots: [reports_shot('All the Types of Reports', reports)],
      },
      {
        heading: 'Salary',
        bullets: [
          'Salary reports and salary slips, generated automatically for every worker',
          'Basic salary + sales commission + collection commission',
          'Target incentives and attendance incentives',
          'EPF/ETF compliance',
        ],
        shots: [salary_shot('Salary Slip', salary)],
      },
    ],
  },
  {
    title: 'Admin tools',
    groups: [
      {
        heading: 'Database backups',
        bullets: ['Backups of the database from inside the system'],
      },
      {
        heading: 'Workers and users',
        bullets: [
          'Workers are declared with a name, ID card and basic salary',
          'A sales rep user is linked to a worker, with a preferred name and phone number',
          'Managers and admins only need a name, username and password, with no worker assigned',
          'Role-based access across the whole system',
        ],
        shots: [workers_shot('Workers', workers), users_shot('Users', users)],
      },
    ],
  },
]

const svgProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const ChevronIcon = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...svgProps}>
    <polyline points={dir === 'right' ? '9 5 16 12 9 19' : '15 5 8 12 15 19'} />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...svgProps}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...svgProps}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...svgProps}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...svgProps}>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const ArrowIcon = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...svgProps}>
    <line x1={dir === 'right' ? 4 : 20} y1="12" x2={dir === 'right' ? 19 : 5} y2="12" />
    <polyline points={dir === 'right' ? '13 6 19 12 13 18' : '11 6 5 12 11 18'} />
  </svg>
)

export const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...svgProps}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22 6 12 13 2 6" />
  </svg>
)

function TechIcon({ icon, mark }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="proj-tech_icon">
      {icon && !failed ? (
        <img
          className="proj-tech_logo"
          src={`https://cdn.simpleicons.org/${icon}/ffffff`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="proj-tech_mark">{mark}</span>
      )}
    </span>
  )
}

const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

const preloaded = new Set()
const thumbSrc = (src) => src.replace(/\.webp$/, '-thumb.webp')
const preloadImage = (src) => {
  if (!src || preloaded.has(src)) return
  preloaded.add(src)
  const img = new Image()
  img.decoding = 'async'
  img.src = src
}

export function useScrollReveal(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll('[data-reveal]'))
    if (!targets.length) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    targets.forEach((el) => {
      const items = []
      Array.from(el.children).forEach((child) => {
        if (child.matches('.proj-sec_title, .proj-group_title, .proj-sec_text, .shots, .proj-variants_item, .proj-next_group')) {
          items.push(child)
        } else if (child.matches('.proj-sec_list')) {
          items.push(...Array.from(child.children))
        } else if (child.matches('.proj-groups-grid')) {
          items.push(...Array.from(child.children))
        }
      })
      items.forEach((item, idx) => {
        item.classList.add('proj-reveal-item')
        item.style.setProperty('--reveal-i', String(Math.min(idx, 6)))
      })
    })

    if (reduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}

function ShotImage({ src, alt, eager }) {
  return (
    <img
      ref={(el) => {
        if (el?.complete && el.naturalWidth > 0) {
          el.classList.add('is-loaded')
        }
      }}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      draggable="false"
      onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
    />
  )
}

function Lightbox({ shots, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [panning, setPanning] = useState(false)
  const stageRef = useRef(null)
  const imgRef = useRef(null)
  const activeThumb = useRef(null)
  const wheelTimer = useRef(0)
  const drag = useRef({ active: false, moved: false, onImg: false, x: 0, y: 0, px: 0, py: 0 })

  const last = shots.length - 1
  const multi = shots.length > 1
  const current = shots[index]

  const step = (dir) => setIndex((i) => Math.max(0, Math.min(last, i + dir)))

  const clampPan = (x, y, z) => {
    const stage = stageRef.current
    const img = imgRef.current
    if (!stage || !img) return { x, y }
    const maxX = Math.max(0, (img.offsetWidth * z - stage.clientWidth) / 2)
    const maxY = Math.max(0, (img.offsetHeight * z - stage.clientHeight) / 2)
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    }
  }

  const applyZoom = (next) => {
    const z = Math.min(MAX_ZOOM, Math.max(1, next))
    setZoom(z)
    setPan((p) => (z === 1 ? { x: 0, y: 0 } : clampPan(p.x, p.y, z)))
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(last, i + 1))
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(wheelTimer.current)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [last, onClose])

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    activeThumb.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
    preloadImage(shots[index - 1]?.src)
    preloadImage(shots[index + 1]?.src)
  }, [index, shots])

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return
    drag.current = {
      active: true,
      moved: false,
      onImg: e.target.tagName === 'IMG',
      x: e.clientX,
      y: e.clientY,
      px: pan.x,
      py: pan.y,
    }
    if (zoom > 1) {
      e.currentTarget.setPointerCapture(e.pointerId)
      setPanning(true)
    }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) + Math.abs(dy) > 5) d.moved = true
    if (zoom > 1) setPan(clampPan(d.px + dx, d.py + dy, zoom))
  }

  const onPointerUp = (e) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    setPanning(false)
    if (zoom === 1) {
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
    }
  }

  const onWheel = (e) => {
    if (zoom <= 1) return
    setPanning(true)
    clearTimeout(wheelTimer.current)
    wheelTimer.current = setTimeout(() => setPanning(false), 100)
    setPan((p) => clampPan(p.x - e.deltaX, p.y - e.deltaY, zoom))
  }

  const onStageClick = (e) => {
    const d = drag.current
    if (e.target.closest('button')) return
    if (d.moved) {
      d.moved = false
      return
    }
    if (d.onImg) {
      applyZoom(zoom > 1 ? 1 : 2)
      return
    }
    onClose()
  }

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption}>
      <div className="lightbox_tools">
        <button
          type="button"
          className="frost_btn"
          onClick={() => applyZoom(zoom - ZOOM_STEP)}
          disabled={zoom <= 1}
          aria-label="Zoom out"
        >
          <MinusIcon />
        </button>
        <button
          type="button"
          className="frost_btn lightbox_zoomval"
          onClick={() => applyZoom(1)}
          aria-label="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          className="frost_btn"
          onClick={() => applyZoom(zoom + ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
        >
          <PlusIcon />
        </button>
        <button type="button" className="frost_btn" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      </div>

      <div
        className="lightbox_stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClick={onStageClick}
      >
        <div className="lightbox_track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {shots.map((t, i) => {
            const isActive = i === index
            return (
              <div key={t.caption} className={`lightbox_slide ${isActive ? 'is-active' : ''}`}>
                <img
                  ref={isActive ? imgRef : null}
                  className="lightbox_img"
                  src={t.src}
                  alt={t.caption}
                  draggable="false"
                  style={
                    isActive
                      ? {
                          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                          transition: panning ? 'none' : 'transform 0.25s ease',
                          cursor: zoom > 1 ? 'zoom-out' : 'zoom-in',
                        }
                      : undefined
                  }
                />
              </div>
            )
          })}
        </div>

        {multi && (
          <>
            <button
              type="button"
              className="frost_btn lightbox_nav lightbox_nav-prev"
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label="Previous photo"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              type="button"
              className="frost_btn lightbox_nav lightbox_nav-next"
              onClick={() => step(1)}
              disabled={index === last}
              aria-label="Next photo"
            >
              <ChevronIcon dir="right" />
            </button>
          </>
        )}
      </div>

      <div className="lightbox_footer">
        <div className="lightbox_info" key={index}>
          <strong>{current.caption}</strong>
          {current.desc && <span>{current.desc}</span>}
        </div>

        {multi && (
          <div className="lightbox_thumbs">
            {shots.map((t, i) => (
              <button
                key={t.caption}
                ref={i === index ? activeThumb : null}
                type="button"
                className={`lightbox_thumb ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}: ${t.caption}`}
                aria-current={i === index}
              >
                <img src={t.thumb || thumbSrc(t.src)} alt="" draggable="false" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

const SLIDE_MS = 500
export function ShotSlider({ shots, size = [3024, 1724], eager = false }) {
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const thumbRef = useRef(null)
  const scrub = useRef(false)
  const anim = useRef(0)
  const frame = useRef(0)
  const activeRef = useRef(0)
  const [m, setM] = useState({ scrollable: false, canPrev: false, canNext: false, active: 0 })
  const [scrubbing, setScrubbing] = useState(false)
  const [openAt, setOpenAt] = useState(null)
  const closeLightbox = useCallback(() => {
    setOpenAt(null)
    if (document.activeElement?.classList?.contains('shots_open')) {
      document.activeElement.blur()
    }
  }, [])

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const scrollable = max > 4

    const thumb = thumbRef.current
    if (thumb) {
      thumb.style.width = `${scrollable ? (el.clientWidth / el.scrollWidth) * 100 : 100}%`
      thumb.style.left = `${scrollable ? (el.scrollLeft / el.scrollWidth) * 100 : 0}%`
    }

    let active = activeRef.current
    if (!anim.current) {
      const items = Array.from(el.children)
      if (scrollable && el.scrollLeft >= max - 4) {
        active = items.length - 1
      } else {
        let best = Infinity
        items.forEach((it, i) => {
          const d = Math.abs(it.offsetLeft - el.scrollLeft)
          if (d < best) {
            best = d
            active = i
          }
        })
      }
      activeRef.current = active
    }

    const canPrev = scrollable && el.scrollLeft > 4
    const canNext = scrollable && el.scrollLeft < max - 4
    setM((p) =>
      p.scrollable === scrollable &&
      p.canPrev === canPrev &&
      p.canNext === canNext &&
      p.active === active
        ? p
        : { scrollable, canPrev, canNext, active }
    )
  }, [])

  const onScroll = () => {
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      update()
    })
  }

  const stopAnim = useCallback(() => {
    if (!anim.current) return
    cancelAnimationFrame(anim.current)
    anim.current = 0
    const el = trackRef.current
    if (el) {
      el.style.scrollSnapType = ''
      el.style.scrollBehavior = ''
    }
  }, [])

  const animateTo = (target) => {
    const el = trackRef.current
    if (!el) return
    stopAnim()
    const to = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, target))
    const from = el.scrollLeft
    const dist = to - from
    if (Math.abs(dist) < 1) return
    const start = performance.now()
    el.style.scrollSnapType = 'none'
    el.style.scrollBehavior = 'auto'
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const run = (now) => {
      const t = Math.min(1, (now - start) / SLIDE_MS)
      el.scrollLeft = from + dist * ease(t)
      if (t < 1) {
        anim.current = requestAnimationFrame(run)
      } else {
        anim.current = 0
        el.style.scrollSnapType = ''
        el.style.scrollBehavior = ''
        update()
      }
    }
    anim.current = requestAnimationFrame(run)
  }

  useEffect(() => {
    update()
    const el = trackRef.current
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    if (ro && el) {
      ro.observe(el)
      Array.from(el.children).forEach((c) => ro.observe(c))
    }
    window.addEventListener('resize', update)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', update)
      cancelAnimationFrame(anim.current)
      cancelAnimationFrame(frame.current)
    }
  }, [update])

  const single = shots.length === 1
  const nav = !single && m.scrollable

  const [fw, fh] = size
  const frameRatio = `${fw} / ${fh}`
  const btnTop = `calc(min(560px, 85cqw) * ${(fh / fw / 2).toFixed(4)})`

  useEffect(() => {
    update()
  }, [nav, update])

  const go = (dir) => {
    const el = trackRef.current
    if (!el) return
    const target = Math.max(0, Math.min(el.children.length - 1, activeRef.current + dir))
    activeRef.current = target
    setM((p) => (p.active === target ? p : { ...p, active: target }))
    animateTo(el.children[target].offsetLeft)
  }

  const scrubTo = (clientX) => {
    const bar = barRef.current
    const el = trackRef.current
    if (!bar || !el) return
    const rect = bar.getBoundingClientRect()
    const ratio = (clientX - rect.left) / rect.width
    const max = el.scrollWidth - el.clientWidth
    el.scrollLeft = Math.max(0, Math.min(max, ratio * el.scrollWidth - el.clientWidth / 2))
  }

  const onBarDown = (e) => {
    const el = trackRef.current
    if (!el) return
    e.preventDefault()
    stopAnim()
    e.currentTarget.setPointerCapture(e.pointerId)
    scrub.current = true
    setScrubbing(true)
    el.style.scrollSnapType = 'none'
    el.style.scrollBehavior = 'auto'
    scrubTo(e.clientX)
  }

  const onBarMove = (e) => {
    if (scrub.current) scrubTo(e.clientX)
  }

  const onBarUp = () => {
    if (!scrub.current) return
    scrub.current = false
    setScrubbing(false)
    const el = trackRef.current
    if (el) {
      el.style.scrollSnapType = ''
      el.style.scrollBehavior = ''
    }
  }

  return (
    <div className={`shots ${single ? 'shots-single' : ''}`}>
      <div className="shots_stage">
        {nav && (
          <button
            type="button"
            className="frost_btn shots_btn shots_btn-prev"
            style={{ top: btnTop }}
            onClick={() => go(-1)}
            disabled={!m.canPrev}
            aria-label="Previous photo"
          >
            <ChevronIcon dir="left" />
          </button>
        )}

        <div
          className="shots_track"
          ref={trackRef}
          onScroll={onScroll}
          onWheel={stopAnim}
          onTouchStart={stopAnim}
          onPointerDown={stopAnim}
        >
          {shots.map((s, i) => (
            <figure
              className={`shots_item ${i === m.active ? 'is-active' : ''}`}
              key={s.caption}
            >
              <button
                type="button"
                className="shots_open"
                style={{ aspectRatio: frameRatio }}
                onMouseEnter={() => preloadImage(s.src)}
                onFocus={() => preloadImage(s.src)}
                onClick={(e) => {
                  e.currentTarget.blur()
                  preloadImage(s.src)
                  setOpenAt(i)
                }}
                aria-label={`Enlarge: ${s.caption}`}
              >
                <ShotImage src={s.thumb || thumbSrc(s.src)} alt={s.caption} eager={eager && i < 2} />
                <span className="frost_btn shots_expand" aria-hidden="true">
                  <ExpandIcon />
                </span>
              </button>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>

        {nav && (
          <button
            type="button"
            className="frost_btn shots_btn shots_btn-next"
            style={{ top: btnTop }}
            onClick={() => go(1)}
            disabled={!m.canNext}
            aria-label="Next photo"
          >
            <ChevronIcon dir="right" />
          </button>
        )}
      </div>

      {nav && (
        <div
          className={`shots_bar ${scrubbing ? 'is-dragging' : ''}`}
          ref={barRef}
          onPointerDown={onBarDown}
          onPointerMove={onBarMove}
          onPointerUp={onBarUp}
          onPointerCancel={onBarUp}
          aria-hidden="true"
        >
          <span className="shots_bar_thumb" ref={thumbRef} />
        </div>
      )}

      {openAt !== null && (
        <Lightbox shots={shots} startIndex={openAt} onClose={closeLightbox} />
      )}
    </div>
  )
}

function Group({ g, eager = false, reveal = false }) {
  return (
    <div className="proj-group" data-reveal={reveal ? '' : undefined}>
      {g.heading && <h3 className="proj-group_title">{g.heading}</h3>}
      {g.text && <p className="proj-sec_text">{g.text}</p>}
      {g.bullets && (
        <ul className="proj-sec_list">
          {g.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {g.shots && <ShotSlider shots={g.shots} eager={eager} />}
    </div>
  )
}

export default function ErpSystem() {
  const navigate = useNavigate()
  const pageRef = useRef(null)
  useScrollReveal(pageRef)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  usePageSeo('/projects/erp-system')

  const scrollToHomeSection = (id, focusField = null) => (e) => {
    e.preventDefault()
    navigate('/', { state: { scrollTo: id, focusField } })
  }

  return (
    <>
      <GlassFilter />
      <MorphFilter />

      <main className="proj-page" ref={pageRef}>
        <Link to="/#projects" className="proj-page_back" onClick={scrollToHomeSection('projects')}>
          <ArrowIcon dir="left" /> Back to All projects
        </Link>

        <header className="proj-page_header">
          <h1>Business Management System</h1>
          <p className="proj-page_tagline">
            A configurable Sales, Collections & Payroll ERP System for businesses.
          </p>
          <p className="proj-page_meta">Full-stack developer</p>

          <div className="proj-stats">
            {stats.map((s) => (
              <div key={s.label} className="proj-stat">
                <span className="proj-stat_value">{s.value}</span>
                <span className="proj-stat_label">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="proj-sec">
          <h2 className="proj-sec_title">Overview</h2>
          <p className="proj-sec_text">
            A business management platform that runs the whole sales cycle: invoice requests and approvals, out-of-stock handling through supplier orders, customer collections with cheque reminders, automatic payroll with commissions and incentives, expenses & profit tracking, a product photo gallery for use in front of customers, and configurable reports. It ships in four editions, so each business gets only what it needs, and access is controlled by roles that can be customised per system.
          </p>
          <div className="proj-roles">
            <span className="proj-roles_label">Built for</span>
            {roles.map((r) => (
              <span key={r} className="proj-roles_chip">{r}</span>
            ))}
          </div>
        </section>

        <section className="proj-sec">
          <h2 className="proj-sec_title">Tech stack</h2>
          <div className="proj-tech">
            {tech.map((t) => (
              <div key={t.name} className="proj-tech_item">
                <div className="proj-tech_top">
                  <TechIcon icon={t.icon} mark={t.mark} />
                  <span className="proj-tech_tag">{t.tag}</span>
                </div>
                <div className="proj-tech_body">
                  <span className="proj-tech_name">{t.name}</span>
                  <p className="proj-tech_role">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {sections.map((s, si) => (
          <section key={s.title} className="proj-sec" data-reveal="">
            <h2 className="proj-sec_title">{s.title}</h2>
            <div className={s.grid ? 'proj-groups proj-groups-grid' : 'proj-groups'}>
              {s.groups.map((g, i) => (
                <Group key={g.heading || i} g={g} eager={si === 0} reveal={!s.grid} />
              ))}
            </div>
          </section>
        ))}

        <section className="proj-sec" data-reveal="">
          <h2 className="proj-sec_title">Editions</h2>
          <div className="proj-groups proj-groups-grid">
            <div className="proj-group">
              <h3 className="proj-group_title">Full edition</h3>
              <ul className="proj-sec_list">
                <li>Sales-rep invoice requests, approvals and supplier orders</li>
                <li>Customer collections with cheque reminders, payroll and attendance</li>
                <li>Expenses, profit tracking and configurable reports</li>
                <li>Built for admins, managers, sales reps and cashiers</li>
              </ul>
            </div>
            <div className="proj-group">
              <h3 className="proj-group_title">Lite edition</h3>
              <ul className="proj-sec_list">
                <li>Managers and admins only</li>
                <li>No sales-rep invoice requests</li>
                <li>No payroll and no attendance</li>
              </ul>
            </div>
            <div className="proj-group">
              <h3 className="proj-group_title">Manufacturing edition</h3>
              <ul className="proj-sec_list">
                <li>Keeps the full sales-rep workflow for companies that manufacture and distribute</li>
                <li>Tracks distributed items, finished goods and the raw materials used to produce them</li>
                <li>Records suppliers for distributed items and raw materials, with all three invoiceable to the same customer</li>
              </ul>
            </div>
            <div className="proj-group">
              <h3 className="proj-group_title">Cashier edition</h3>
              <ul className="proj-sec_list">
                <li>Built around managers and cashiers</li>
                <li>Cashiers submit collection session requests with the bank and cheque number</li>
                <li>Managers accept or reject each collection session request</li>
              </ul>
            </div>
          </div>
        </section>

        <nav className="proj-next" aria-label="Next project" data-reveal="">
          <div className="proj-next_group">
            <span className="proj-next_label">Interested?</span>
            <Link to="/#contact" className="proj-next_btn proj-next_btn-contact" onClick={scrollToHomeSection('contact', 'firstName')}>
              <MailIcon /> Get in touch
            </Link>
          </div>
          <div className="proj-next_group">
            <span className="proj-next_label">Next project</span>
            <Link to="/projects/lensy" className="proj-next_btn">
              Lensy <ArrowIcon dir="right" />
            </Link>
          </div>
        </nav>
      </main>

      <Footer />
    </>
  )
}