import { getPostBySlug } from '../../utils/loadPosts'

export default function BlogPostWindow({ slug }) {
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div style={{ padding: '12px', fontSize: 12 }}>
        <p>Post not found: <code>{slug}</code></p>
      </div>
    )
  }

  return (
    <div style={{ padding: '8px 12px', fontSize: 13 }}>
      <h2 style={{ fontSize: 15, margin: '0 0 4px' }}>{post.title}</h2>
      <p style={{ fontSize: 11, color: '#808080', margin: '0 0 12px' }}>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
