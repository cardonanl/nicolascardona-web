import { Link } from 'react-router-dom'
import { posts } from '../../utils/loadPosts'
import styles from './ArticlesWindow.module.css'

export default function ArticlesWindow() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ padding: '6px 8px' }}>
      <div className={styles.substackBanner}>
        Para más artículos visita mi{' '}
        <a href="https://substack.com/@cardonanl" target="_blank" rel="noopener noreferrer">
          Substack ↗
        </a>
      </div>

      <ul className={styles.list}>
        {sorted.map(post => (
          <li key={post.slug} className={styles.item}>
            <img
              src="https://win98icons.alexmeub.com/icons/png/notepad-0.png"
              alt=""
              width={16}
              height={16}
              style={{ imageRendering: 'pixelated', flexShrink: 0, marginTop: 2 }}
            />
            <div className={styles.info}>
              <Link to={`/single-post/${post.slug}`} className={styles.title}>
                {post.title}
              </Link>
              <span className={styles.date}>{post.date}</span>
              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
            </div>
          </li>
        ))}
      </ul>

      <div className="status-bar" style={{ marginTop: 8 }}>
        <p className="status-bar-field">{sorted.length} object(s)</p>
      </div>
    </div>
  )
}
