export const SITE_URL = 'https://www.disath.dev'

export const routeSeo = {
  '/projects/erp-system': {
    file: 'projects/erp-system.html',
    title: 'Business Management System (ERP) | Disath Liyanage',
    description:
      'A configurable sales, collections, inventory, and payroll ERP system for businesses, built with React, Next.js, TypeScript, and Supabase across four editions.',
    url: `${SITE_URL}/projects/erp-system`,
    image: `${SITE_URL}/images/erp-thumbnail.png`,
    imageWidth: '4269',
    imageHeight: '2400',
    imageAlt: 'Business Management System ERP interface preview by Disath Liyanage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/projects/erp-system#webpage`,
          url: `${SITE_URL}/projects/erp-system`,
          name: 'Business Management System (ERP) | Disath Liyanage',
          description:
            'A configurable sales, collections, inventory, and payroll ERP system for businesses, built with React, Next.js, TypeScript, and Supabase across four editions.',
          inLanguage: 'en',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/erp-thumbnail.png`,
            width: 4269,
            height: 2400,
          },
          breadcrumb: { '@id': `${SITE_URL}/projects/erp-system#breadcrumb` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/projects/erp-system#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Business Management System',
              item: `${SITE_URL}/projects/erp-system`,
            },
          ],
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/projects/erp-system#software`,
          name: 'Business Management System',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: `${SITE_URL}/projects/erp-system`,
          image: `${SITE_URL}/images/erp-thumbnail.png`,
          description:
            'A configurable sales, collections, inventory, and payroll ERP system for businesses, available in Full, Lite, Manufacturing, and Cashier editions.',
          keywords: [
            'ERP system',
            'Business Management System',
            'Sales and Collections ERP',
            'Payroll management',
            'Next.js',
            'React',
            'TypeScript',
            'Supabase',
          ],
          author: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Disath Liyanage',
            url: `${SITE_URL}/`,
          },
          creator: { '@id': `${SITE_URL}/#person` },
        },
      ],
    },
    noscript: `
      <h1>Business Management System (ERP)</h1>
      <p>
        A configurable sales, collections, inventory, and payroll ERP system for businesses,
        available in Full, Lite, Manufacturing, and Cashier editions. Built by Disath Liyanage
        with React, Next.js, TypeScript, and Supabase.
      </p>
      <ul>
        <li><a href="${SITE_URL}/">Back to Portfolio</a></li>
        <li><a href="${SITE_URL}/projects/lensy">Next Project: Lensy</a></li>
        <li><a href="${SITE_URL}/cv">CV</a></li>
      </ul>
    `,
  },
  '/projects/lensy': {
    file: 'projects/lensy.html',
    title: 'Lensy — Contact Lens Wear Tracker | Disath Liyanage',
    description:
      'A native macOS and iOS SwiftUI app for tracking contact lens wear time with a menu bar timer, Siri & Shortcuts, SwiftData, and Supabase sync.',
    url: `${SITE_URL}/projects/lensy`,
    image: `${SITE_URL}/images/lensy-thumbnail.png`,
    imageWidth: '4269',
    imageHeight: '2400',
    imageAlt: 'Lensy native Apple contact lens wear tracker preview by Disath Liyanage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/projects/lensy#webpage`,
          url: `${SITE_URL}/projects/lensy`,
          name: 'Lensy — Contact Lens Wear Tracker | Disath Liyanage',
          description:
            'A native macOS and iOS SwiftUI app for tracking contact lens wear time with a menu bar timer, Siri & Shortcuts, SwiftData, and Supabase sync.',
          inLanguage: 'en',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/lensy-thumbnail.png`,
            width: 4269,
            height: 2400,
          },
          breadcrumb: { '@id': `${SITE_URL}/projects/lensy#breadcrumb` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${SITE_URL}/projects/lensy#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Lensy',
              item: `${SITE_URL}/projects/lensy`,
            },
          ],
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/projects/lensy#software`,
          name: 'Lensy',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'macOS, iOS',
          url: `${SITE_URL}/projects/lensy`,
          image: `${SITE_URL}/images/lensy-thumbnail.png`,
          description:
            'A native Apple app for tracking how long you wear your contact lenses, featuring a menu bar timer, history reports, Siri & Shortcuts, SwiftData, and Supabase sync.',
          keywords: [
            'Lensy',
            'contact lens wear tracker',
            'macOS app',
            'iOS app',
            'SwiftUI',
            'SwiftData',
            'Siri Shortcuts',
            'Supabase',
          ],
          author: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Disath Liyanage',
            url: `${SITE_URL}/`,
          },
          creator: { '@id': `${SITE_URL}/#person` },
        },
      ],
    },
    noscript: `
      <h1>Lensy — Contact Lens Wear Tracker</h1>
      <p>
        A native Apple app for tracking how long you wear your contact lenses, built with
        SwiftUI, SwiftData, Supabase, Siri, and Shortcuts by Disath Liyanage.
      </p>
      <ul>
        <li><a href="${SITE_URL}/">Back to Portfolio</a></li>
        <li><a href="${SITE_URL}/projects/erp-system">Previous Project: Business Management System</a></li>
        <li><a href="${SITE_URL}/cv">CV</a></li>
      </ul>
    `,
  },
  '/cv': {
    file: 'cv.html',
    title: 'CV | Disath Liyanage',
    description:
      'Curriculum vitae of Disath Liyanage, Computer Science undergraduate and full-stack developer. View it online or download the PDF.',
    url: `${SITE_URL}/cv`,
    image: `${SITE_URL}/hero-landscape.png`,
    imageWidth: '4269',
    imageHeight: '2400',
    imageAlt: 'Disath Liyanage, official portfolio',
  },
}