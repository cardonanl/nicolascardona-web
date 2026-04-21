import { Link } from 'react-router-dom'
import { posts } from '../../utils/loadPosts'
import styles from './ArticlesWindow.module.css'

export default function ArticlesWindow() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ padding: '8px' }}>
      <div className={styles.grid}>
        {sorted.map(post => (
          <Link
            key={post.slug}
            to={`/single-post/${post.slug}`}
            className={styles.card}
          >
            <div className={styles.cover}>
              {post.image
                ? <img src={post.image} alt={post.title} />
                : <div className={styles.coverPlaceholder}>
                    <img
                      src="https://win98icons.alexmeub.com/icons/png/notepad-0.png"
                      alt=""
                      width={32}
                      style={{ imageRendering: 'pixelated', opacity: 0.4 }}
                    />
                  </div>
              }
            </div>
            <div className={styles.info}>
              <p className={styles.title}>{post.title}</p>
              <p className={styles.date}>{post.date}</p>
              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
            </div>
          </Link>
        ))}
      </div>
      <div className="status-bar" style={{ marginTop: 8 }}>
        <p className="status-bar-field">{sorted.length} object(s)</p>
      </div>
    </div>
  )
}
