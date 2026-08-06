import type { Localized } from './types'

/**
 * Impressum and privacy notice.
 *
 * Kept out of `cv.ts` so the CV content stays readable — this is legal prose,
 * not CV content, and it changes for entirely different reasons.
 *
 * IMPORTANT: `owner.address` below is a placeholder. § 5 DDG requires a
 * ladungsfähige Anschrift (an address where legal mail can be served); a
 * P.O. box is not sufficient. The Impressum is not legally valid until it is
 * filled in. See README.md.
 */

export interface LegalBlock {
  heading?: string
  paragraphs?: string[]
  list?: string[]
}

export interface LegalDocument {
  title: string
  updated: string
  blocks: LegalBlock[]
}

export interface LegalContent {
  imprint: LegalDocument
  privacy: LegalDocument
}

/** The one place to put the real postal address. */
export const owner = {
  name: 'Sebastian Böhm',
  address: ['TODO: Straße und Hausnummer', 'TODO: PLZ und Ort', 'Deutschland'],
  email: 'sboe0705@icloud.com',
}

/** Shown as the "last updated" date on both documents. */
const UPDATED = '2026-08-06'

const addressLines = [owner.name, ...owner.address].join('\n')

export const legal: Localized<LegalContent> = {
  de: {
    imprint: {
      title: 'Impressum',
      updated: `Stand: ${UPDATED}`,
      blocks: [
        {
          heading: 'Angaben gemäß § 5 DDG',
          paragraphs: [addressLines],
        },
        {
          heading: 'Kontakt',
          paragraphs: [`E-Mail: ${owner.email}`],
        },
        {
          heading: 'Verantwortlich für den Inhalt',
          paragraphs: [`${owner.name}, Anschrift wie oben.`],
        },
        {
          heading: 'Art des Angebots',
          paragraphs: [
            'Diese Seite ist eine private Selbstdarstellung zu beruflichen Zwecken. Es werden keine Waren oder Dienstleistungen angeboten und keine Verträge geschlossen.',
          ],
        },
        {
          heading: 'Haftung für Inhalte',
          paragraphs: [
            'Die Inhalte dieser Seite wurden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich, nach §§ 8 bis 10 DDG jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.',
          ],
        },
        {
          heading: 'Haftung für Links',
          paragraphs: [
            'Diese Seite verweist auf externe Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.',
          ],
        },
        {
          heading: 'Urheberrecht',
          paragraphs: [
            'Die auf dieser Seite veröffentlichten Inhalte unterliegen dem deutschen Urheberrecht. Das Porträtfoto ist urheberrechtlich geschützt und darf nicht ohne vorherige Zustimmung verwendet werden.',
          ],
        },
      ],
    },

    privacy: {
      title: 'Datenschutzerklärung',
      updated: `Stand: ${UPDATED}`,
      blocks: [
        {
          heading: 'Verantwortlicher',
          paragraphs: [
            'Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:',
            `${addressLines}\nE-Mail: ${owner.email}`,
          ],
        },
        {
          heading: 'Grundsatz',
          paragraphs: [
            'Diese Website ist bewusst datensparsam gebaut. Sie setzt keine Cookies, bindet keine externen Schriftarten, Skripte oder Medien ein und verwendet weder Analyse- noch Tracking-Werkzeuge. Es gibt kein Kontaktformular und keine Benutzerkonten.',
          ],
        },
        {
          heading: 'Hosting und Server-Logfiles',
          paragraphs: [
            'Die Seite wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
            'Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Zugriffsdaten, insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Datei, den Browsertyp und gegebenenfalls die zuvor besuchte Seite. Diese Verarbeitung ist für die Auslieferung der Website und deren technische Sicherheit erforderlich.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im sicheren und zuverlässigen Betrieb der Website. Ich selbst habe keinen Zugriff auf diese Logfiles.',
            'Die Verarbeitung kann eine Übermittlung in die USA umfassen. GitHub ist unter dem EU-US Data Privacy Framework zertifiziert. Einzelheiten zur Datenverarbeitung durch GitHub finden sich in der Datenschutzerklärung von GitHub.',
          ],
        },
        {
          heading: 'Lokale Speicherung der Sprachwahl',
          paragraphs: [
            'Wenn Sie zwischen Deutsch und Englisch wechseln, wird diese Auswahl im Local Storage Ihres Browsers unter dem Schlüssel „cv.lang“ gespeichert, damit die Seite beim nächsten Besuch in Ihrer Sprache erscheint.',
            'Gespeichert wird ausschließlich der Wert „de“ oder „en“. Diese Information verbleibt auf Ihrem Gerät, wird nicht an mich oder Dritte übertragen und erlaubt keine Wiedererkennung. Es handelt sich um eine rein funktionale Speicherung für einen von Ihnen ausdrücklich gewünschten Dienst (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können den Eintrag jederzeit über die Einstellungen Ihres Browsers löschen.',
          ],
        },
        {
          heading: 'Schriftarten',
          paragraphs: [
            'Die verwendete Schriftart Archivo wird von diesem Server ausgeliefert und nicht von Google Fonts oder einem anderen Drittanbieter nachgeladen. Beim Aufruf der Seite entsteht dadurch keine Verbindung zu externen Servern.',
          ],
        },
        {
          heading: 'Kontaktaufnahme per E-Mail',
          paragraphs: [
            'Wenn Sie mich per E-Mail kontaktieren, verarbeite ich die von Ihnen übermittelten Daten, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, bei Anbahnung eines Vertrags- oder Beschäftigungsverhältnisses Art. 6 Abs. 1 lit. b DSGVO.',
            'Ihre Nachricht wird gelöscht, sobald sie zur Erreichung des Zwecks nicht mehr erforderlich ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
          ],
        },
        {
          heading: 'Externe Links',
          paragraphs: [
            'Diese Seite verlinkt auf externe Angebote, unter anderem GitHub und LinkedIn. Beim Anklicken eines solchen Links verlassen Sie diese Website; für die dortige Datenverarbeitung ist der jeweilige Anbieter verantwortlich. Ein Aufruf dieser Anbieter findet erst statt, wenn Sie den Link aktiv anklicken.',
          ],
        },
        {
          heading: 'Ihre Rechte',
          paragraphs: [
            'Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf:',
          ],
          list: [
            'Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO)',
            'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
            'Löschung (Art. 17 DSGVO)',
            'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
            'Datenübertragbarkeit (Art. 20 DSGVO)',
            'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
          ],
        },
        {
          heading: 'Beschwerderecht',
          paragraphs: [
            'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren (Art. 77 DSGVO). Zuständig ist in der Regel die Aufsichtsbehörde Ihres Wohnsitzes oder die des Verantwortlichen.',
          ],
        },
        {
          heading: 'Automatisierte Entscheidungsfindung',
          paragraphs: [
            'Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.',
          ],
        },
      ],
    },
  },

  en: {
    imprint: {
      title: 'Legal notice',
      updated: `Last updated: ${UPDATED}`,
      blocks: [
        {
          paragraphs: [
            'This is a translation for convenience. The German version is the legally binding one.',
          ],
        },
        {
          heading: 'Information pursuant to § 5 DDG',
          paragraphs: [addressLines],
        },
        {
          heading: 'Contact',
          paragraphs: [`Email: ${owner.email}`],
        },
        {
          heading: 'Responsible for the content',
          paragraphs: [`${owner.name}, address as above.`],
        },
        {
          heading: 'Nature of this site',
          paragraphs: [
            'This is a private personal page for professional purposes. No goods or services are offered and no contracts are concluded here.',
          ],
        },
        {
          heading: 'Liability for content',
          paragraphs: [
            'The content of this site has been compiled with care, but no guarantee is given as to its accuracy, completeness or timeliness. As a service provider I am responsible for my own content under § 7 (1) DDG and general law, but under §§ 8 to 10 DDG I am not obliged to monitor transmitted or stored third-party information.',
          ],
        },
        {
          heading: 'Liability for links',
          paragraphs: [
            'This site links to external websites over whose content I have no influence. The respective provider is always responsible for that content. No legal violations were apparent at the time of linking. Should I become aware of any, the links concerned will be removed promptly.',
          ],
        },
        {
          heading: 'Copyright',
          paragraphs: [
            'The content published on this site is subject to German copyright law. The portrait photograph is protected and may not be used without prior consent.',
          ],
        },
      ],
    },

    privacy: {
      title: 'Privacy notice',
      updated: `Last updated: ${UPDATED}`,
      blocks: [
        {
          paragraphs: [
            'This is a translation for convenience. The German version is the legally binding one.',
          ],
        },
        {
          heading: 'Controller',
          paragraphs: [
            'The controller for the processing of personal data on this website within the meaning of the GDPR is:',
            `${addressLines}\nEmail: ${owner.email}`,
          ],
        },
        {
          heading: 'Principle',
          paragraphs: [
            'This website is deliberately data-minimal. It sets no cookies, embeds no external fonts, scripts or media, and uses neither analytics nor tracking. There is no contact form and there are no user accounts.',
          ],
        },
        {
          heading: 'Hosting and server logs',
          paragraphs: [
            'The site is served via GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
            'When you open the page, GitHub processes technically necessary access data, in particular your IP address, the date and time of access, the file requested, your browser type and, where applicable, the referring page. This processing is necessary to deliver the website and keep it technically secure.',
            'The legal basis is Art. 6 (1) (f) GDPR; the legitimate interest lies in the secure and reliable operation of the site. I have no access to these log files myself.',
            'Processing may involve a transfer to the USA. GitHub is certified under the EU-US Data Privacy Framework. Details can be found in GitHub’s own privacy statement.',
          ],
        },
        {
          heading: 'Local storage of the language preference',
          paragraphs: [
            'When you switch between German and English, that choice is stored in your browser’s local storage under the key “cv.lang”, so the page appears in your language on your next visit.',
            'Only the value “de” or “en” is stored. It stays on your device, is never transmitted to me or to third parties, and does not allow you to be recognised. This is purely functional storage for a service you explicitly requested (§ 25 (2) no. 2 TDDDG). You can delete it at any time through your browser settings.',
          ],
        },
        {
          heading: 'Fonts',
          paragraphs: [
            'The Archivo typeface is served from this site’s own server and is not loaded from Google Fonts or any other third party. Opening the page therefore creates no connection to external servers.',
          ],
        },
        {
          heading: 'Contact by email',
          paragraphs: [
            'If you contact me by email, I process the data you send in order to answer your enquiry. The legal basis is Art. 6 (1) (f) GDPR, or Art. 6 (1) (b) GDPR where a contractual or employment relationship is being initiated.',
            'Your message is deleted once it is no longer needed for that purpose and no statutory retention obligations apply.',
          ],
        },
        {
          heading: 'External links',
          paragraphs: [
            'This site links to external services, including GitHub and LinkedIn. Following such a link takes you away from this website; the respective provider is then responsible for any data processing. Those providers are only contacted once you actively click the link.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: ['Subject to the statutory conditions, you have the right to:'],
          list: [
            'access to the data held about you (Art. 15 GDPR)',
            'rectification of inaccurate data (Art. 16 GDPR)',
            'erasure (Art. 17 GDPR)',
            'restriction of processing (Art. 18 GDPR)',
            'data portability (Art. 20 GDPR)',
            'object to processing (Art. 21 GDPR)',
          ],
        },
        {
          heading: 'Right to complain',
          paragraphs: [
            'You have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data (Art. 77 GDPR). This is usually the authority where you live or where the controller is based.',
          ],
        },
        {
          heading: 'Automated decision-making',
          paragraphs: ['No automated decision-making, including profiling, takes place.'],
        },
      ],
    },
  },
}
