import type {
  CvData,
  EntryContent,
  Lang,
  ResolvedEntry,
  TimelineEntry,
  UiStrings,
} from './types'

/**
 * All CV content, in every supported language.
 *
 * This is the single place to edit the site's content — no copy lives in the
 * components. Entries are stored oldest-first; the timeline reverses them for
 * display (see `useTimeline`).
 */
export const cv: CvData = {
  meta: {
    name: 'Sebastian Böhm',
    defaultLang: 'de',
    openByDefault: 'msg',
    filterChips: [
      'Java',
      'CI/CD',
      'AWS',
      'DevOps',
      'OSGi',
      'SQL',
      'Scrum / Kanban',
      'J2EE / EJB3',
    ],
  },

  ui: {
    de: {
      kinds: {
        work: 'Anstellung',
        study: 'Studium & Praxis',
        edu: 'Schule',
        cert: 'Zertifikat',
      },
      nav: {
        profile: 'Profil',
        timeline: 'Werdegang',
        skills: 'Skills',
        contact: 'Kontakt',
      },
      kicker: 'Software-Entwicklung · Stuttgart',
      h1: 'Sebastian Böhm',
      lead: 'Software-Entwickler und Consultant mit rund zwanzig Jahren Java-Erfahrung — von Mobilfunk-Prototypen bei Bell Labs über Kassensysteme im Handel bis zu Continuous Integration und AWS-Betrieb für eine Versicherungsplattform.',
      ctaMail: 'E-Mail schreiben',
      ctaPdf: 'Als PDF',
      photoNote: 'Sebastian Böhm, Region Stuttgart.',
      photoAlt: 'Porträtfoto von Sebastian Böhm',
      aboutTitle: 'Über mich',
      about: 'Angefangen habe ich 2005 im dualen Studium bei Alcatel-Lucent, mit Praxisphasen in der Mobilfunkentwicklung und bei Bell Labs. Seither bewege ich mich zwischen Anwendungsentwicklung und der Technik darunter: Middleware und Datenbankschichten, Kassen- und Backoffice-Systeme im Handel, heute Continuous Integration, Architektur-Umbauten und Cloud-Betrieb für eine Versicherungsplattform. Was sich durch alle Stationen zieht: Java, enge Abstimmung mit Fachbereich und Kunden, und die Neigung, Dinge betriebsfähig zu machen statt nur fertig.',
      ai: {
        kicker: 'Arbeitsweise heute',
        title: 'KI als tägliches Werkzeug',
        body: 'Ich arbeite intensiv mit KI-Assistenz — beruflich wie privat. Nicht als Ersatz für Verständnis, sondern um schneller an die Stellen zu kommen, an denen Verständnis nötig ist.',
        points: [
          'Fehlersuche und Korrektur in fremdem, unbekanntem Programmcode',
          'Erstellung von Skripten und kleinen Werkzeugen für den Arbeitsalltag',
          'Hobby-Projekte in der Freizeit — von der Idee bis zum lauffähigen Stand',
        ],
        note: 'Auch diese Seite ist mit KI-Unterstützung entstanden — Inhalte und Entscheidungen von mir.',
      },
      timelineTitle: 'Werdegang',
      timelineSub: 'Station anklicken — Details klappen auf, jeweils eine gleichzeitig.',
      filterAll: 'Alle Stationen',
      filterLabel: 'Nach Technologie filtern',
      skillsTitle: 'Skills & Technologien',
      skillGroups: [
        {
          name: 'Sprachen & Plattform',
          items: ['Java', 'Java EE', 'JavaScript', 'Go', 'Bash', 'SQL'],
        },
        {
          name: 'Frameworks',
          items: ['JBoss', 'RichFaces', 'JPA / Hibernate', 'OSGi', 'GWT'],
        },
        {
          name: 'Build & Betrieb',
          items: [
            'Maven',
            'Continuous Integration',
            'Docker',
            'Kubernetes',
            'Helm',
            'AWS',
            'DevOps',
            'OIDC',
            'Selenium',
          ],
        },
        {
          name: 'Arbeitsweise',
          items: [
            'Scrum',
            'Kanban',
            'Anforderungsanalyse',
            'Modellgetriebene Entwicklung',
            'Komponentenverantwortung',
          ],
        },
      ],
      hobbiesTitle: 'Abseits der Arbeit',
      hobbies: ['Joggen', 'Bogenschießen', 'Brettspiele', 'Programmieren', 'Brotbacken'],
      hobbyLink: {
        label: 'Schedoughler',
        href: 'https://sboe0705.github.io/schedoughler/',
      },
      languagesTitle: 'Sprachen',
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        {
          name: 'Englisch',
          level: 'Fließend — internationale Projekte in UK, USA, Australien',
        },
        { name: 'Französisch', level: 'Anfänger — seit einem Jahr in der Freizeit' },
        { name: 'Spanisch', level: 'Anfänger — seit einem halben Jahr in der Freizeit' },
      ],
      heroFacts: [
        { k: 'Standort', v: 'Region Stuttgart' },
        { k: 'Schwerpunkt', v: 'Java, Build & Betrieb' },
        { k: 'Erfahrung', v: 'seit 2005' },
      ],
      footerTitle: 'Lass uns sprechen.',
      contacts: [
        {
          k: 'E-Mail',
          v: 'sboe0705@icloud.com',
          href: 'mailto:sboe0705@icloud.com',
        },
        {
          k: 'LinkedIn',
          // The href keeps the percent-encoded "ö" (%C3%B6); the displayed
          // value spells it out, since nobody wants to read an escape.
          v: 'linkedin.com/in/sebastian-böhm-60a288234',
          href: 'https://www.linkedin.com/in/sebastian-b%C3%B6hm-60a288234/',
        },
        {
          k: 'GitHub',
          v: 'github.com/sboe0705',
          href: 'https://github.com/sboe0705',
        },
      ],
      legal: {
        imprintLabel: 'Impressum',
        imprintHref: '#impressum',
        privacyLabel: 'Datenschutz',
        privacyHref: '#datenschutz',
        copyright: 'Sebastian Böhm',
      },
    },

    en: {
      kinds: {
        work: 'Employment',
        study: 'Degree & practice',
        edu: 'School',
        cert: 'Certification',
      },
      nav: {
        profile: 'Profile',
        timeline: 'Career',
        skills: 'Skills',
        contact: 'Contact',
      },
      kicker: 'Software engineering · Stuttgart',
      h1: 'Sebastian Böhm',
      lead: 'Software engineer and consultant with some twenty years of Java experience — from mobile-network prototypes at Bell Labs and retail point-of-sale systems to continuous integration and AWS operations for an insurance platform.',
      ctaMail: 'Write an email',
      ctaPdf: 'Get the PDF',
      photoNote: 'Sebastian Böhm, Stuttgart region.',
      photoAlt: 'Portrait photograph of Sebastian Böhm',
      aboutTitle: 'About me',
      about: 'I started in 2005 on a cooperative degree at Alcatel-Lucent, with practical terms in mobile-network engineering and at Bell Labs. Since then I have moved between application development and the plumbing underneath: middleware and persistence layers, point-of-sale and back-office systems in retail, and today continuous integration, architectural refactoring and cloud operations for an insurance platform. The constants across all of it: Java, close alignment with the business and the client, and a preference for making things operable rather than merely finished.',
      ai: {
        kicker: 'How I work today',
        title: 'AI as an everyday tool',
        body: 'I work with AI assistance intensively, at work and in my own time — not as a substitute for understanding, but to get faster to the places where understanding is needed.',
        points: [
          'Finding and fixing defects in unfamiliar, third-party code',
          'Writing scripts and small tools for everyday work',
          'Hobby projects in my own time — from the idea to something that runs',
        ],
        note: 'This page was built with AI assistance too — content and decisions are mine.',
      },
      timelineTitle: 'Career',
      timelineSub: 'Click an entry — details expand, one at a time.',
      filterAll: 'All entries',
      filterLabel: 'Filter by technology',
      skillsTitle: 'Skills & technologies',
      skillGroups: [
        {
          name: 'Languages & platform',
          items: ['Java', 'Java EE', 'JavaScript', 'Go', 'Bash', 'SQL'],
        },
        {
          name: 'Frameworks',
          items: ['JBoss', 'RichFaces', 'JPA / Hibernate', 'OSGi', 'GWT'],
        },
        {
          name: 'Build & operations',
          items: [
            'Maven',
            'Continuous integration',
            'Docker',
            'Kubernetes',
            'Helm',
            'AWS',
            'DevOps',
            'OIDC',
            'Selenium',
          ],
        },
        {
          name: 'Ways of working',
          items: [
            'Scrum',
            'Kanban',
            'Requirements analysis',
            'Model-driven development',
            'Component ownership',
          ],
        },
      ],
      hobbiesTitle: 'Away from work',
      hobbies: ['Running', 'Archery', 'Board games', 'Programming', 'Bread baking'],
      hobbyLink: {
        label: 'Schedoughler',
        href: 'https://sboe0705.github.io/schedoughler/',
      },
      languagesTitle: 'Languages',
      languages: [
        { name: 'German', level: 'Native speaker' },
        {
          name: 'English',
          level: 'Fluent — international projects in the UK, USA and Australia',
        },
        { name: 'French', level: 'Beginner — learning in my own time for a year' },
        { name: 'Spanish', level: 'Beginner — learning in my own time for six months' },
      ],
      heroFacts: [
        { k: 'Location', v: 'Stuttgart region' },
        { k: 'Focus', v: 'Java, build & operations' },
        { k: 'Experience', v: 'since 2005' },
      ],
      footerTitle: 'Let’s talk.',
      contacts: [
        {
          k: 'Email',
          v: 'sboe0705@icloud.com',
          href: 'mailto:sboe0705@icloud.com',
        },
        {
          k: 'LinkedIn',
          // The href keeps the percent-encoded "ö" (%C3%B6); the displayed
          // value spells it out, since nobody wants to read an escape.
          v: 'linkedin.com/in/sebastian-böhm-60a288234',
          href: 'https://www.linkedin.com/in/sebastian-b%C3%B6hm-60a288234/',
        },
        {
          k: 'GitHub',
          v: 'github.com/sboe0705',
          href: 'https://github.com/sboe0705',
        },
      ],
      legal: {
        imprintLabel: 'Imprint',
        imprintHref: '#impressum',
        privacyLabel: 'Privacy',
        privacyHref: '#datenschutz',
        copyright: 'Sebastian Böhm',
      },
    },
  },

  entries: [
    {
      id: 'abi',
      year: '2004',
      kind: 'edu',
      org: 'Gymnasium Maria Königin',
      tech: [],
      content: {
        de: {
          period: 'bis Juni 2004',
          role: 'Allgemeine Hochschulreife (Abitur)',
          place: 'Lennestadt',
          summary:
            'Schulabschluss mit naturwissenschaftlich-mathematischem Schwerpunkt — die Grundlage für das anschließende duale Studium der Informationstechnik.',
          bullets: [],
          credentials: '',
        },
        en: {
          period: 'until June 2004',
          role: 'German university-entrance qualification (Abitur)',
          place: 'Lennestadt, Germany',
          summary:
            'Secondary school diploma with a maths and science focus — the basis for the cooperative degree in information technology that followed.',
          bullets: [],
          credentials: '',
        },
      },
    },

    {
      id: 'alu',
      year: '2005',
      kind: 'study',
      org: 'Alcatel-Lucent Deutschland AG',
      tech: ['C', 'C++', 'Java', 'Linux', 'Netzwerktechnik', 'Datenbanken'],
      content: {
        de: {
          period: 'Okt 2005 – Sep 2008',
          role: 'Duales Studium Informationstechnik — Diplom-Ingenieur (BA)',
          place: 'Stuttgart',
          summary:
            'Dreijähriges duales Studium an der Staatlichen Studienakademie Stuttgart, mit Praxisphasen in vier Entwicklungsbereichen des Konzerns — darunter Bell Labs Deutschland und ein Einsatz in den USA.',
          bullets: [
            'Alcatel University: Messenger mit zusätzlicher Bildübertragung (NetPaint)',
            'Mobile Access Division: Applikation zum Auslesen von Daten aus dem Ethernet-Interface einer Mobilfunk-Basisstation',
            'Bell Labs, Intelligent IP Infrastructure: Software-Tool zur Darstellung und Bewertung von Mobilfunk-Backhaul-Netzen',
            'Alcatel-Lucent USA, Proof-of-Concept Lab: Push-to-Talk-over-Cellular-Recorder für den IMS Application Server A5350',
            'Diplomarbeit: Traffic Shaping und Scheduling für konkurrierende Datenströme aus XEN-basierten virtuellen Maschinen zur Umsetzung von QoS-Anforderungen',
          ],
          credentials:
            'Abschlüsse: Ingenieurassistent (BA) 2007 · Diplom-Ingenieur (BA) Informationstechnik 2008 · BSc (Hons) Engineering (Information Technology), The Open University, 2008',
        },
        en: {
          period: 'Oct 2005 – Sep 2008',
          role: 'Cooperative degree in information technology — Dipl.-Ing. (BA)',
          place: 'Stuttgart, Germany',
          summary:
            'Three-year cooperative degree at the Stuttgart state academy, with practical terms in four of the company’s engineering units — including Bell Labs Germany and an assignment in the USA.',
          bullets: [
            'Alcatel University: a messenger with additional image transfer (NetPaint)',
            'Mobile Access Division: an application reading data from the Ethernet interface of a mobile base station',
            'Bell Labs, Intelligent IP Infrastructure: a tool to visualise and assess mobile backhaul networks',
            'Alcatel-Lucent USA, Proof-of-Concept Lab: a Push-to-Talk-over-Cellular recorder for the A5350 IMS application server',
            'Diploma thesis: traffic shaping and scheduling for competing data streams from XEN-based virtual machines to meet QoS requirements',
          ],
          credentials:
            'Awards: Engineering assistant (BA) 2007 · Dipl.-Ing. (BA) in information technology 2008 · BSc (Hons) Engineering (Information Technology), The Open University, 2008',
        },
      },
    },

    {
      id: 'acc',
      year: '2008',
      kind: 'work',
      org: 'Accelsis Technologies GmbH',
      tech: ['Java', 'J2EE / EJB3', 'Hibernate', 'GWT', 'Magnolia CMS', 'Maven', 'JUnit'],
      content: {
        de: {
          period: 'Okt 2008 – Nov 2010',
          role: 'Software-Ingenieur & IT-Consultant',
          place: 'München',
          summary:
            'Java/J2EE-Consultant in Kundenprojekten von Behörde bis Industrie — von Middleware und Datenbankschichten bis zu kompletten CMS-Plattformen.',
          bullets: [
            'Behörde: Client-Server-Anwendung zur Verwaltung landwirtschaftlicher Antragsdaten — EJB3-Middleware, Framework für komplexe fachliche Berechnungen, Performance-Optimierung der Datenbank-Zugriffsschicht',
            'Stadtportal-Relaunch: Datenbankschema und Hibernate-Zugriffsschicht, Oberfläche mit GWT/Ext-GWT, Volltext- und Stadtplansuche',
            'Internationale Unternehmens-Website auf Magnolia: Server-Setup, Templates und Taglibs, Build mit Maven, Schulung des Kunden',
            'Migration und Erweiterung einer Website: Captcha-Integration, LDAP-Anbindung der Benutzerverwaltung, Kompatibilitäts-Checks',
          ],
          credentials: '',
        },
        en: {
          period: 'Oct 2008 – Nov 2010',
          role: 'Software engineer & IT consultant',
          place: 'Munich, Germany',
          summary:
            'Java/J2EE consultant on client projects from public administration to industry — from middleware and persistence layers to complete CMS platforms.',
          bullets: [
            'Public authority: a client-server application managing agricultural application data — EJB3 middleware, a framework for complex domain calculations, performance work on the persistence layer',
            'City portal relaunch: database schema and Hibernate layer, UI in GWT/Ext-GWT, full-text and map search',
            'International corporate website on Magnolia: server setup, templates and taglibs, Maven build, client training',
            'Website migration and extension: captcha integration, LDAP-backed user management, compatibility checks',
          ],
          credentials: '',
        },
      },
    },

    {
      id: 'geb',
      year: '2010',
      kind: 'work',
      org: 'GEBIT Solutions',
      tech: [
        'Java',
        'JBoss',
        'JSF / RichFaces',
        'JPA',
        'OSGi',
        'SQL',
        'Selenium',
        'Scrum / Kanban',
      ],
      content: {
        de: {
          period: 'Dez 2010 – Dez 2016',
          role: 'Software Consultant',
          place: 'Stuttgart',
          summary:
            'Modellgetriebene Entwicklung für den Handel: Kassen- und Backoffice-Systeme, Terminal-Anbindungen und Anforderungsarbeit im internationalen Umfeld (Österreich, Großbritannien, Australien, USA).',
          bullets: [
            'Anbindung internationaler Kartenterminals über JNI und Sockets sowie Middleware-Lösungen wie Pepper und OpenEPS',
            'Modellgetriebene Entwicklung von Kassen-Workflows',
            'Beratung und Entwicklung eines Systems zum Druck von Preisetiketten — Anforderungen und Ideen eng mit Fachbereich und Produktmanagement, unterstützt durch Scrum und Kanban',
            'Ab 2014 Mitentwicklung eines Kassensystems mit Schwerpunkt Backoffice: Komponentenverantwortung, Kundenabstimmung und Betreuung externer Mitarbeiter',
          ],
          credentials: '',
        },
        en: {
          period: 'Dec 2010 – Dec 2016',
          role: 'Software consultant',
          place: 'Stuttgart, Germany',
          summary:
            'Model-driven development for retail: point-of-sale and back-office systems, terminal integrations and requirements work in an international setting (Austria, UK, Australia, USA).',
          bullets: [
            'Integration of international card terminals via JNI and sockets, plus middleware such as Pepper and OpenEPS',
            'Model-driven development of point-of-sale workflows',
            'Consulting and development of a price-label printing system — requirements and ideas shaped closely with the business and product management, supported by Scrum and Kanban',
            'From 2014, co-development of a POS system focused on the back office: component ownership, client alignment and guidance of external staff',
          ],
          credentials: '',
        },
      },
    },

    {
      id: 'msg',
      year: '2017',
      kind: 'work',
      org: 'msg life',
      tech: ['Java', 'CI/CD', 'OIDC', 'AWS', 'DevOps', 'Maven'],
      content: {
        de: {
          period: 'seit 2017',
          role: 'Software-Entwicklung, Technik',
          place: 'Bestandssoftware für Lebensversicherungen',
          summary:
            'Technische Querschnittsthemen einer Bestandsführungs-Plattform für Lebensversicherungen — von Continuous Integration über Architektur-Umbauten bis zum Betrieb in der Cloud.',
          bullets: [
            'Etablierung von Continuous Integration und Management der Build-Artefakte',
            'Aufteilung monolithischer Anwendungen in eigenständige Komponenten',
            'Implementierung von Single Sign-on mit OpenID Connect (OIDC)',
            'Integration von Komponenten sowie Support für Kundenprojekte und Entwicklerteams',
            'DevOps-Aufgaben inklusive Deployment auf AWS',
          ],
          credentials: '',
        },
        en: {
          period: 'since 2017',
          role: 'Software engineering, technology team',
          place: 'Policy administration software for life insurance',
          summary:
            'Cross-cutting technical work on a policy administration platform for life insurers — from continuous integration through architectural refactoring to cloud operations.',
          bullets: [
            'Establishing continuous integration and managing build artefacts',
            'Splitting monolithic applications into independent components',
            'Implementing single sign-on with OpenID Connect (OIDC)',
            'Integrating components and supporting client projects and development teams',
            'DevOps work including deployment on AWS',
          ],
          credentials: '',
        },
      },
    },
  ],
}

/** The UI strings for one language. */
export function uiFor(lang: Lang): UiStrings {
  return cv.ui[lang]
}

/**
 * Flatten a timeline entry to a single language.
 *
 * This is the seam other consumers of the content should use — it keeps the
 * `Localized<T>` shape an implementation detail of the data module.
 */
export function resolveEntry(entry: TimelineEntry, lang: Lang): ResolvedEntry {
  const content: EntryContent = entry.content[lang]
  return {
    id: entry.id,
    year: entry.year,
    kind: entry.kind,
    org: entry.org,
    tech: entry.tech,
    ...content,
    kindLabel: cv.ui[lang].kinds[entry.kind],
  }
}

/** All entries in display order (newest first), flattened to one language. */
export function resolveEntries(lang: Lang, entries: TimelineEntry[] = cv.entries): ResolvedEntry[] {
  return entries
    .slice()
    .reverse()
    .map((entry) => resolveEntry(entry, lang))
}

/** The entries whose `tech` contains `chip`; all of them when `chip` is null. */
export function filterByTech(chip: string | null, entries: TimelineEntry[] = cv.entries) {
  return chip === null ? entries : entries.filter((entry) => entry.tech.includes(chip))
}
