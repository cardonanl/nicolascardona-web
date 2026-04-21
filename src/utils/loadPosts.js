import { marked } from 'marked'

const rawFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) return { data: {}, content: raw }
  const yamlBlock = match[1]
  const content = match[2]
  const data = {}
  for (const line of yamlBlock.split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '')
    data[key] = value
  }
  return { data, content }
}

export const posts = Object.entries(rawFiles).map(([, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  return {
    ...data,
    content: marked(content),
  }
})

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug) ?? null
}
