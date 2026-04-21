import { useParams, Link } from 'react-router-dom'
import { getPostBySlug } from '../utils/loadPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#008080',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 16px 60px',
    }}>
      {/* Back button */}
      <div style={{ width: '100%', maxWidth: 760, marginBottom: 12 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ fontSize: 13 }}>← Volver al escritorio</button>
        </Link>
      </div>

      {/* Article window */}
      <div className="window" style={{ width: '100%', maxWidth: 760 }}>
        <div className="title-bar">
          <div className="title-bar-text">
            {post ? post.title : 'Post no encontrado'}
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <Link to="/"><button aria-label="Close" /></Link>
          </div>
        </div>
        <div className="window-body" style={{ padding: '20px 28px' }}>
          {!post ? (
            <p>No se encontró el artículo <code>{slug}</code>.</p>
          ) : (
            <>
              <h1 style={{ fontSize: 22, margin: '0 0 6px' }}>{post.title}</h1>
              <p style={{ fontSize: 13, color: '#808080', margin: '0 0 24px' }}>{post.date}</p>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
