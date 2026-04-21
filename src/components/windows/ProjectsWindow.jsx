import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import styles from './ProjectsWindow.module.css'

export default function ProjectsWindow({ onOpenWindow }) {
  return (
    <div style={{ padding: '8px' }}>
      <div className={styles.grid}>
        {projects.map(project => {
          const inner = (
            <>
              <div className={styles.cover}>
                {project.image
                  ? <img src={project.image} alt={project.name} />
                  : <div className={styles.coverPlaceholder}>
                      <img
                        src="https://win98icons.alexmeub.com/icons/png/directory_open_cool-0.png"
                        alt=""
                        width={32}
                        style={{ imageRendering: 'pixelated', opacity: 0.5 }}
                      />
                    </div>
                }
              </div>
              <div className={styles.info}>
                <p className={styles.title}>{project.name}</p>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </>
          )

          if (project.openWindow) {
            return (
              <div
                key={project.id}
                className={styles.card}
                style={{ cursor: 'pointer' }}
                onClick={() => onOpenWindow?.(project.openWindow)}
              >
                {inner}
              </div>
            )
          }
          if (project.internal) {
            return (
              <Link key={project.id} to={project.url} className={styles.card}>
                {inner}
              </Link>
            )
          }
          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              {inner}
            </a>
          )
        })}
      </div>
    </div>
  )
}
