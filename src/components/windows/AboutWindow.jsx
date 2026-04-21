import styles from './AboutWindow.module.css'

const SKILLS = [
  'Python', 'Looker Studio', 'SQL', 'Google Analytics',
  'Excel / Spreadsheet', 'R', 'BigQuery', 'Power BI',
  'Relaciones públicas', 'Asuntos públicos',
  'Comunicaciones corporativas', 'Marketing electoral',
]

const LINKS = [
  { label: 'Twitter / X', href: 'https://twitter.com/cardonanl', icon: 'https://win98icons.alexmeub.com/icons/png/world-3.png' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicol%C3%A1s-cardona-londo%C3%B1o-2a1321149/', icon: 'https://win98icons.alexmeub.com/icons/png/world-3.png' },
  { label: 'GitHub', href: 'https://github.com/cardonanl', icon: 'https://win98icons.alexmeub.com/icons/png/world-3.png' },
]

export default function AboutWindow() {
  return (
    <div style={{ padding: '12px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 12 }}>
        <img
          src="/images/Profile1.png"
          alt="Nicolas Cardona"
          style={{ width: 100, height: 100, objectFit: 'cover', border: '2px solid #808080', flexShrink: 0 }}
        />
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>Nicolás Cardona</h3>
          <p style={{ margin: '0 0 10px', fontSize: 13 }}>
            Hola! Soy Nicolás Cardona. Soy politólogo, analista y científico de datos colombiano
            con más de 6 años de experiencia. He colaborado con diversos clientes a nivel mundial,
            integrando los asuntos públicos con diseño de productos, sistemas de datos e información
            estadística. Siempre disponible para una conversación o un café.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#555', fontStyle: 'italic' }}>
            I am a Colombian political scientist, analyst, and data scientist with over six years of
            experience. I have collaborated with diverse clients worldwide, integrating public affairs
            with product design, data systems, and statistical information.
          </p>
        </div>
      </div>

      <hr style={{ margin: '10px 0' }} />

      {/* Contact */}
      <div style={{ marginBottom: 10 }}>
        <p style={{ margin: '0 0 6px', fontWeight: 'bold', fontSize: 13 }}>Ponerse en contacto</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <hr style={{ margin: '10px 0' }} />

      {/* Skillset */}
      <div>
        <p style={{ margin: '0 0 6px', fontWeight: 'bold', fontSize: 13 }}>Skillset</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {SKILLS.map(skill => (
            <span key={skill} className={styles.skill}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
