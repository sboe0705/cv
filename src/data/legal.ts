import type { Localized } from './types'

/**
 * Impressum with an integrated privacy section.
 *
 * Kept out of `cv.ts` so the CV content stays readable — this is legal prose,
 * and it changes for entirely different reasons.
 *
 * On the single document: the GDPR does not require a separate privacy page.
 * Art. 12(1) asks for the information to be "easily accessible", which a
 * clearly headed section satisfies. What it does NOT allow is replacing it
 * with a link to GitHub's statement: the controller here is the site owner,
 * not GitHub, so the Art. 13 duties (purpose, legal basis, rights, complaint
 * right) have to be met on this page. GitHub's statement is linked as
 * supplementary detail about the host's own processing.
 *
 * IMPORTANT: `owner.address` is a placeholder. § 5 DDG requires a
 * ladungsfähige Anschrift (an address where legal mail can be served); a
 * P.O. box is not sufficient. The Impressum is not valid until it is filled
 * in. See README.md.
 */

export interface LegalLink {
  label: string
  href: string
}

export interface LegalBlock {
  heading?: string
  paragraphs?: string[]
  list?: string[]
  links?: LegalLink[]
}

export interface LegalDocument {
  title: string
  updated: string
  blocks: LegalBlock[]
}

/** The one place to put the real postal address. */
export const owner = {
  name: 'Sebastian Böhm',
  address: ['TODO: Straße und Hausnummer', 'TODO: PLZ und Ort', 'Deutschland'],
  email: 'sboe0705@icloud.com',
}

const UPDATED = '2026-08-06'

const GITHUB_PRIVACY =
  'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement'

const addressLines = [owner.name, ...owner.address].join('\n')

export const legal: Localized<LegalDocument> = {
  de: {
    title: 'Impressum & Datenschutz',
    updated: `Stand: ${UPDATED}`,
    blocks: [
      {
        heading: 'Angaben gemäß § 5 DDG',
        paragraphs: [addressLines, `E-Mail: ${owner.email}`],
      },
      {
        heading: 'Verantwortlich für den Inhalt',
        paragraphs: [
          `${owner.name}, Anschrift wie oben. Diese Seite ist eine private Selbstdarstellung zu beruflichen Zwecken; es werden keine Waren oder Dienstleistungen angeboten.`,
        ],
      },
      {
        heading: 'Haftung für Inhalte und Links',
        paragraphs: [
          'Die Inhalte wurden mit Sorgfalt erstellt; für Richtigkeit, Vollständigkeit und Aktualität kann keine Gewähr übernommen werden. Für eigene Inhalte bin ich nach § 7 Abs. 1 DDG verantwortlich, nach §§ 8 bis 10 DDG jedoch nicht verpflichtet, fremde Informationen zu überwachen.',
          'Für die Inhalte verlinkter externer Seiten ist stets deren Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.',
        ],
      },
      {
        heading: 'Urheberrecht',
        paragraphs: [
          'Die Inhalte dieser Seite unterliegen dem deutschen Urheberrecht. Das Porträtfoto ist geschützt und darf nicht ohne vorherige Zustimmung verwendet werden.',
        ],
      },

      {
        heading: 'Datenschutz',
        paragraphs: [
          'Verantwortlicher im Sinne der DSGVO ist der oben genannte Betreiber.',
          'Diese Seite setzt keine Cookies, bindet keine externen Schriftarten, Skripte oder Medien ein und verwendet weder Analyse- noch Tracking-Werkzeuge. Es gibt kein Kontaktformular und keine Benutzerkonten. Die Schriftart Archivo wird von diesem Server ausgeliefert, nicht von Google Fonts.',
        ],
      },
      {
        heading: 'Hosting und Zugriffsdaten',
        paragraphs: [
          'Die Seite wird über GitHub Pages bereitgestellt (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Beim Aufruf verarbeitet GitHub technisch notwendige Zugriffsdaten — insbesondere IP-Adresse, Zeitpunkt, angeforderte Datei und Browsertyp.',
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt im sicheren Betrieb der Seite. Die Verarbeitung kann eine Übermittlung in die USA umfassen; GitHub ist unter dem EU-US Data Privacy Framework zertifiziert. Auf diese Logfiles habe ich selbst keinen Zugriff.',
        ],
        links: [{ label: 'Datenschutzerklärung von GitHub', href: GITHUB_PRIVACY }],
      },
      {
        heading: 'Sprachwahl und E-Mail-Kontakt',
        paragraphs: [
          'Ihre Sprachauswahl wird im Local Storage Ihres Browsers unter „cv.lang“ gespeichert — ausschließlich der Wert „de“ oder „en“. Er verbleibt auf Ihrem Gerät, wird nicht übertragen und erlaubt keine Wiedererkennung; es handelt sich um eine funktional erforderliche Speicherung (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können sie jederzeit im Browser löschen.',
          'Wenn Sie mich per E-Mail kontaktieren, verarbeite ich Ihre Angaben zur Beantwortung der Anfrage (Art. 6 Abs. 1 lit. f DSGVO, bei Vertrags- oder Beschäftigungsanbahnung Art. 6 Abs. 1 lit. b DSGVO) und lösche sie, sobald sie nicht mehr erforderlich sind.',
        ],
      },
      {
        heading: 'Ihre Rechte',
        paragraphs: [
          'Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie das Recht, der Verarbeitung zu widersprechen (Art. 21). Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.',
          'Unabhängig davon können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.',
        ],
      },
    ],
  },

  en: {
    title: 'Legal notice & privacy',
    updated: `Last updated: ${UPDATED}`,
    blocks: [
      {
        paragraphs: [
          'This is a translation for convenience. The German version is the legally binding one.',
        ],
      },
      {
        heading: 'Information pursuant to § 5 DDG',
        paragraphs: [addressLines, `Email: ${owner.email}`],
      },
      {
        heading: 'Responsible for the content',
        paragraphs: [
          `${owner.name}, address as above. This is a private personal page for professional purposes; no goods or services are offered.`,
        ],
      },
      {
        heading: 'Liability for content and links',
        paragraphs: [
          'The content has been compiled with care, but no guarantee is given as to its accuracy, completeness or timeliness. I am responsible for my own content under § 7 (1) DDG, but under §§ 8 to 10 DDG I am not obliged to monitor third-party information.',
          'The respective provider is always responsible for the content of linked external sites. No legal violations were apparent at the time of linking.',
        ],
      },
      {
        heading: 'Copyright',
        paragraphs: [
          'The content of this site is subject to German copyright law. The portrait photograph is protected and may not be used without prior consent.',
        ],
      },

      {
        heading: 'Privacy',
        paragraphs: [
          'The controller within the meaning of the GDPR is the operator named above.',
          'This site sets no cookies, embeds no external fonts, scripts or media, and uses neither analytics nor tracking. There is no contact form and there are no user accounts. The Archivo typeface is served from this site’s own server, not from Google Fonts.',
        ],
      },
      {
        heading: 'Hosting and access data',
        paragraphs: [
          'The site is served via GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). When you open the page, GitHub processes technically necessary access data — in particular your IP address, the time of access, the file requested and your browser type.',
          'The legal basis is Art. 6 (1) (f) GDPR; the legitimate interest lies in the secure operation of the site. Processing may involve a transfer to the USA; GitHub is certified under the EU-US Data Privacy Framework. I have no access to these log files myself.',
        ],
        links: [{ label: 'GitHub’s privacy statement', href: GITHUB_PRIVACY }],
      },
      {
        heading: 'Language preference and email contact',
        paragraphs: [
          'Your language choice is stored in your browser’s local storage under “cv.lang” — only the value “de” or “en”. It stays on your device, is never transmitted and does not allow you to be recognised; it is functionally necessary storage (§ 25 (2) no. 2 TDDDG). You can delete it in your browser at any time.',
          'If you contact me by email, I process your details in order to answer the enquiry (Art. 6 (1) (f) GDPR, or Art. 6 (1) (b) where a contractual or employment relationship is being initiated) and delete them once they are no longer needed.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Subject to the statutory conditions you have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and the right to object (Art. 21). Please use the email address above.',
          'You may also lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). No automated decision-making, including profiling, takes place.',
        ],
      },
    ],
  },
}
